import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import * as db from "./db";
import { invokeLLM } from "./_core/llm";

// ============================================================================
// DIAGNOSTIC ROUTER
// ============================================================================

const diagnosticRouter = router({
  // Run diagnostic assessment
  runDiagnostic: protectedProcedure
    .input(z.object({
      responses: z.record(z.string(), z.string()),
      age: z.number().optional(),
      chronicConditions: z.array(z.string()).optional(),
      lifestyleFactors: z.array(z.string()).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      // Analyze responses with AI
      const analysisPrompt = `Analyze this wellness assessment and provide:
1. Primary concerns (array of strings)
2. Secondary concerns (array of strings)
3. Recommended focus areas (array of strings)
4. Wellness score (0-100)
5. Crisis flags if any (array of strings)
6. Recommended tier (basic, professional, enterprise)

Assessment responses: ${JSON.stringify(input.responses)}
Age: ${input.age || 'Not provided'}
Chronic conditions: ${input.chronicConditions?.join(', ') || 'None'}
Lifestyle factors: ${input.lifestyleFactors?.join(', ') || 'None'}

Respond in JSON format.`;

      const aiResponse = await invokeLLM({
        messages: [
          { role: "system", content: "You are an expert wellness assessment analyzer. Respond only with valid JSON." },
          { role: "user", content: analysisPrompt }
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "diagnostic_analysis",
            strict: true,
            schema: {
              type: "object",
              properties: {
                primaryConcerns: { type: "array", items: { type: "string" } },
                secondaryConcerns: { type: "array", items: { type: "string" } },
                recommendedFocusAreas: { type: "array", items: { type: "string" } },
                wellnessScore: { type: "integer" },
                flags: { type: "array", items: { type: "string" } },
                tier: { type: "string" }
              },
              required: ["primaryConcerns", "secondaryConcerns", "recommendedFocusAreas", "wellnessScore", "flags", "tier"],
              additionalProperties: false
            }
          }
        }
      });

      const content = aiResponse.choices[0]?.message?.content;
      const analysis = JSON.parse(typeof content === 'string' ? content : "{}");

      // Create diagnostic record
      const diagnosticResult = await db.createDiagnostic({
        userId: ctx.user.id,
        responses: JSON.stringify(input.responses),
        primaryConcerns: JSON.stringify(analysis.primaryConcerns),
        secondaryConcerns: JSON.stringify(analysis.secondaryConcerns),
        recommendedFocusAreas: JSON.stringify(analysis.recommendedFocusAreas),
        wellnessScore: analysis.wellnessScore,
        flags: JSON.stringify(analysis.flags),
        tier: analysis.tier
      });

      // Check for crisis flags
      const crisisKeywords = ['suicide', 'self-harm', 'harm others', 'crisis'];
      const hasCrisisFlag = analysis.flags.some((flag: string) => 
        crisisKeywords.some(keyword => flag.toLowerCase().includes(keyword))
      );

      if (hasCrisisFlag) {
        await db.createCrisisAlert({
          userId: ctx.user.id,
          severity: "critical",
          flags: JSON.stringify(analysis.flags),
          context: JSON.stringify({ responses: input.responses, analysis }),
          status: "new"
        });
      }

      return {
        ...analysis,
        userId: ctx.user.id,
        hasCrisis: hasCrisisFlag
      };
    }),

  // Get diagnostic history
  getHistory: protectedProcedure.query(async ({ ctx }) => {
    return await db.getDiagnosticsByUserId(ctx.user.id);
  }),

  // Get latest diagnostic
  getLatest: protectedProcedure.query(async ({ ctx }) => {
    return await db.getLatestDiagnostic(ctx.user.id);
  }),
});

// ============================================================================
// COACH ROUTER
// ============================================================================

const coachRouter = router({
  // Get all active coaches
  list: publicProcedure.query(async () => {
    return await db.getAllActiveCoaches();
  }),

  // Get coach by ID
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await db.getCoachById(input.id);
    }),

  // Match coaches based on diagnostic
  match: protectedProcedure
    .input(z.object({
      flags: z.array(z.string()),
      tier: z.string()
    }))
    .query(async ({ input }) => {
      const coaches = await db.getAllActiveCoaches();
      
      // Simple matching algorithm - can be enhanced with AI
      const matchedCoaches = coaches.map(coach => {
        const expertise = JSON.parse(coach.expertise || '[]');
        const matchScore = input.flags.filter(flag => 
          expertise.some((exp: string) => exp.toLowerCase().includes(flag.toLowerCase()))
        ).length / Math.max(input.flags.length, 1);

        return {
          coach,
          matchScore,
          matchReasons: [`Expertise in ${expertise.join(', ')}`]
        };
      }).sort((a, b) => b.matchScore - a.matchScore).slice(0, 3);

      return matchedCoaches;
    }),
});

// ============================================================================
// SESSION ROUTER
// ============================================================================

const sessionRouter = router({
  // Book a session
  book: protectedProcedure
    .input(z.object({
      coachId: z.number(),
      startTime: z.string(),
      duration: z.number(),
      tier: z.string(),
      focusAreas: z.array(z.string()).optional(),
      notes: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const startTime = new Date(input.startTime);
      const endTime = new Date(startTime.getTime() + input.duration * 60000);

      const sessionResult = await db.createSession({
        userId: ctx.user.id,
        coachId: input.coachId,
        startTime,
        endTime,
        duration: input.duration,
        tier: input.tier,
        status: "booked",
        focusAreas: JSON.stringify(input.focusAreas || []),
        notes: input.notes,
        sessionType: "video"
      });

      // Create notification
      await db.createNotification({
        userId: ctx.user.id,
        type: "session_booked",
        title: "Session Booked",
        message: `Your coaching session has been booked for ${startTime.toLocaleString()}`,
        isRead: false
      });

      return { success: true };
    }),

  // Get user sessions
  getUserSessions: protectedProcedure.query(async ({ ctx }) => {
    return await db.getSessionsByUserId(ctx.user.id);
  }),

  // Get session by ID
  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      return await db.getSessionById(input.id);
    }),

  // Update session status
  updateStatus: protectedProcedure
    .input(z.object({
      id: z.number(),
      status: z.enum(["pending", "booked", "completed", "cancelled"])
    }))
    .mutation(async ({ input }) => {
      await db.updateSessionStatus(input.id, input.status);
      return { success: true };
    }),
});

// ============================================================================
// PROGRESS ROUTER
// ============================================================================

const progressRouter = router({
  // Create progress record
  create: protectedProcedure
    .input(z.object({
      wellnessScore: z.number().optional(),
      emotionalState: z.record(z.string(), z.any()).optional(),
      goals: z.array(z.string()).optional(),
      achievements: z.array(z.string()).optional(),
      notes: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      await db.createProgressRecord({
        userId: ctx.user.id,
        wellnessScore: input.wellnessScore,
        emotionalState: JSON.stringify(input.emotionalState || {}),
        goals: JSON.stringify(input.goals || []),
        achievements: JSON.stringify(input.achievements || []),
        notes: input.notes
      });
      return { success: true };
    }),

  // Get progress history
  getHistory: protectedProcedure.query(async ({ ctx }) => {
    return await db.getProgressRecordsByUserId(ctx.user.id);
  }),
});

// ============================================================================
// NOTIFICATION ROUTER
// ============================================================================

const notificationRouter = router({
  // Get user notifications
  list: protectedProcedure.query(async ({ ctx }) => {
    return await db.getNotificationsByUserId(ctx.user.id);
  }),

  // Mark as read
  markAsRead: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await db.markNotificationAsRead(input.id);
      return { success: true };
    }),
});

// ============================================================================
// RESOURCE ROUTER
// ============================================================================

const resourceRouter = router({
  // Get all public resources
  list: publicProcedure.query(async () => {
    return await db.getAllPublicResources();
  }),

  // Get resources by category
  getByCategory: publicProcedure
    .input(z.object({ category: z.string() }))
    .query(async ({ input }) => {
      return await db.getResourcesByCategory(input.category);
    }),
});

// ============================================================================
// ADMIN ROUTER
// ============================================================================

const adminRouter = router({
  // Get all users
  getAllUsers: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== 'admin') {
      throw new Error('Unauthorized');
    }
    return await db.getAllUsers();
  }),

  // Get unresolved crisis alerts
  getCrisisAlerts: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.user.role !== 'admin') {
      throw new Error('Unauthorized');
    }
    return await db.getUnresolvedCrisisAlerts();
  }),

  // Acknowledge crisis alert
  acknowledgeCrisisAlert: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role !== 'admin') {
        throw new Error('Unauthorized');
      }
      await db.acknowledgeCrisisAlert(input.id, ctx.user.id);
      return { success: true };
    }),
});

// ============================================================================
// MAIN APP ROUTER
// ============================================================================

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  diagnostic: diagnosticRouter,
  coach: coachRouter,
  session: sessionRouter,
  progress: progressRouter,
  notification: notificationRouter,
  resource: resourceRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
