/**
 * AI Chat router - 24/7 AI coaching conversations
 */

import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import { invokeLLM } from "../_core/llm";
import {
  getUserConversations,
  getConversationWithMessages,
  createConversation,
  addMessage,
  updateConversationTitle,
  deleteConversation,
  detectCrisisLevel,
} from "../db/aiChat";

const SYSTEM_PROMPT = `You are an empathetic, professional emotional resilience coach. Your role is to:

1. **Listen actively** - Acknowledge the user's feelings without judgment
2. **Provide support** - Offer compassionate, evidence-based guidance
3. **Teach coping strategies** - Share practical techniques from CBT, DBT, and mindfulness
4. **Detect crisis** - Recognize signs of severe distress and recommend professional help
5. **Track progress** - Help users identify patterns and celebrate improvements

**Guidelines:**
- Use warm, conversational language
- Ask clarifying questions to understand context
- Validate emotions before offering solutions
- Suggest specific, actionable coping strategies
- Recognize when professional intervention is needed
- Keep responses concise (2-4 paragraphs max)
- Never diagnose medical conditions
- Always prioritize user safety

**Crisis Protocol:**
If the user expresses suicidal thoughts, self-harm intentions, or severe distress:
1. Express immediate concern and care
2. Strongly encourage contacting emergency services (988 Suicide & Crisis Lifeline)
3. Suggest reaching out to a trusted person
4. Remind them their coach will be notified for urgent follow-up

Remember: You're a supportive guide, not a replacement for professional therapy.`;

export const aiChatRouter = router({
  /**
   * Get all conversations for current user
   */
  listConversations: protectedProcedure.query(async ({ ctx }) => {
    const conversations = await getUserConversations(ctx.user.id);
    return { conversations };
  }),

  /**
   * Get a specific conversation with all messages
   */
  getConversation: protectedProcedure
    .input(z.object({ conversationId: z.number() }))
    .query(async ({ input, ctx }) => {
      const data = await getConversationWithMessages(input.conversationId);

      if (!data) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Conversation not found",
        });
      }

      // Verify user owns this conversation
      if (data.conversation.userId !== ctx.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You don't have access to this conversation",
        });
      }

      return data;
    }),

  /**
   * Create a new conversation
   */
  createConversation: protectedProcedure
    .input(
      z.object({
        title: z.string().optional(),
        clientId: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const conversationId = await createConversation({
        userId: ctx.user.id,
        clientId: input.clientId,
        title: input.title || "New Conversation",
      });

      return { conversationId };
    }),

  /**
   * Send a message and get AI response
   */
  sendMessage: protectedProcedure
    .input(
      z.object({
        conversationId: z.number(),
        message: z.string().min(1).max(5000),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Verify conversation ownership
      const data = await getConversationWithMessages(input.conversationId);
      if (!data || data.conversation.userId !== ctx.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Invalid conversation",
        });
      }

      // Detect crisis level
      const crisisFlag = detectCrisisLevel(input.message);

      // Save user message
      await addMessage({
        conversationId: input.conversationId,
        role: "user",
        content: input.message,
        crisisFlag,
      });

      // Build conversation history for context
      const conversationHistory = data.messages.map((msg) => ({
        role: msg.role as "system" | "user" | "assistant",
        content: msg.content,
      }));

      // Add system prompt if first message
      if (conversationHistory.length === 0) {
        conversationHistory.unshift({
          role: "system",
          content: SYSTEM_PROMPT,
        });
      }

      // Add current user message
      conversationHistory.push({
        role: "user",
        content: input.message,
      });

      // Get AI response
      let aiResponse: string;
      try {
        const response = await invokeLLM({
          messages: conversationHistory,
        });

        const content = response.choices[0]?.message?.content;
        aiResponse = typeof content === 'string' ? content : "I'm here to help. Could you tell me more?";
      } catch (error) {
        console.error("[AI Chat] LLM error:", error);
        aiResponse = "I'm having trouble connecting right now. Please try again in a moment, or reach out to your coach directly if this is urgent.";
      }

      // Add crisis warning if detected
      if (crisisFlag === "critical" || crisisFlag === "high") {
        aiResponse = `⚠️ **I'm concerned about what you shared.** If you're in immediate danger, please call 988 (Suicide & Crisis Lifeline) or 911 right away.\n\n${aiResponse}\n\n**Your coach has been notified and will reach out to you as soon as possible.**`;
      }

      // Save AI response
      await addMessage({
        conversationId: input.conversationId,
        role: "assistant",
        content: aiResponse,
        crisisFlag: "none",
      });

      // Auto-generate title from first exchange
      if (data.messages.length === 0 && !data.conversation.title) {
        try {
          const titleResponse = await invokeLLM({
            messages: [
              {
                role: "system",
                content: "Generate a short, empathetic title (3-6 words) for this conversation. Return ONLY the title, no quotes or punctuation.",
              },
              {
                role: "user",
                content: input.message,
              },
            ],
          });

          const titleContent = titleResponse.choices[0]?.message?.content;
          const title = typeof titleContent === 'string' ? titleContent.trim() : "New Conversation";
          await updateConversationTitle(input.conversationId, title);
        } catch (error) {
          console.error("[AI Chat] Title generation error:", error);
        }
      }

      return {
        response: aiResponse,
        crisisFlag,
      };
    }),

  /**
   * Delete a conversation
   */
  deleteConversation: protectedProcedure
    .input(z.object({ conversationId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      // Verify ownership
      const data = await getConversationWithMessages(input.conversationId);
      if (!data || data.conversation.userId !== ctx.user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Invalid conversation",
        });
      }

      await deleteConversation(input.conversationId);

      return { success: true };
    }),
});
