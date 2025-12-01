import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

const assessmentQuestions = [
  { id: "q1", question: "How have you been feeling emotionally over the past week?", category: "emotional" },
  { id: "q2", question: "Describe your current stress levels and what's contributing to them.", category: "mental" },
  { id: "q3", question: "How would you rate your overall sense of purpose and meaning in life?", category: "spiritual" },
  { id: "q4", question: "Tell us about your sleep patterns and quality of rest.", category: "physical" },
  { id: "q5", question: "How are you managing your work-life balance?", category: "mental" },
  { id: "q6", question: "Describe any physical health concerns you're experiencing.", category: "physical" },
  { id: "q7", question: "How connected do you feel to your community and relationships?", category: "social" },
  { id: "q8", question: "What are your current goals and aspirations?", category: "spiritual" },
  { id: "q9", question: "How do you typically cope with difficult emotions?", category: "emotional" },
  { id: "q10", question: "Is there anything else you'd like us to know about your current wellbeing?", category: "general" },
];

export default function Assessment() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [showCrisisResources, setShowCrisisResources] = useState(false);

  const runDiagnostic = trpc.diagnostic.runDiagnostic.useMutation({
    onSuccess: (data) => {
      if (data.hasCrisis) {
        setShowCrisisResources(true);
      } else {
        navigate("/results");
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if all questions are answered
    const unanswered = assessmentQuestions.filter(q => !responses[q.id]);
    if (unanswered.length > 0) {
      alert("Please answer all questions before submitting.");
      return;
    }

    runDiagnostic.mutate({ responses });
  };

  if (showCrisisResources) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full border-red-200 dark:border-red-900">
          <CardHeader>
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-6 w-6" />
              <CardTitle>Immediate Support Available</CardTitle>
            </div>
            <CardDescription>
              Based on your responses, we want to ensure you have immediate access to support resources.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
                <h3 className="font-semibold mb-2">988 Suicide & Crisis Lifeline</h3>
                <p className="text-sm text-muted-foreground mb-2">24/7 free and confidential support</p>
                <Button variant="default" className="w-full" asChild>
                  <a href="tel:988">Call 988</a>
                </Button>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <h3 className="font-semibold mb-2">Crisis Text Line</h3>
                <p className="text-sm text-muted-foreground mb-2">Text HOME to 741741</p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="sms:741741?body=HOME">Send Text</a>
                </Button>
              </div>

              <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                <h3 className="font-semibold mb-2">Emergency Services</h3>
                <p className="text-sm text-muted-foreground mb-2">For immediate danger</p>
                <Button variant="outline" className="w-full" asChild>
                  <a href="tel:911">Call 911</a>
                </Button>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-4">
                You can also continue to your assessment results and connect with a coach.
              </p>
              <Button variant="outline" className="w-full" onClick={() => navigate("/results")}>
                Continue to Results
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="container max-w-3xl py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Wellness Assessment</h1>
          <p className="text-muted-foreground mt-2">
            Take a few minutes to help us understand your current wellbeing. Your responses are confidential and will help us provide personalized support.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {assessmentQuestions.map((q, index) => (
            <Card key={q.id}>
              <CardHeader>
                <CardTitle className="text-lg">
                  Question {index + 1} of {assessmentQuestions.length}
                </CardTitle>
                <CardDescription>{q.question}</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={responses[q.id] || ""}
                  onChange={(e) => setResponses({ ...responses, [q.id]: e.target.value })}
                  placeholder="Share your thoughts here..."
                  className="min-h-[120px]"
                  required
                />
              </CardContent>
            </Card>
          ))}

          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => navigate("/dashboard")}
            >
              Save for Later
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={runDiagnostic.isPending}
            >
              {runDiagnostic.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Submit Assessment
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
