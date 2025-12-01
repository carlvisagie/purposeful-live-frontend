import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { ArrowRight, Brain, Heart, Shield, TrendingUp, Users, Zap } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <section className="container py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Transform Your Workforce's Emotional Resilience
          </h1>
          <p className="mt-6 text-xl text-muted-foreground">
            Enterprise-grade AI-powered coaching platform that reduces healthcare costs by 15-30% while improving employee wellbeing and productivity.
          </p>
          <div className="mt-10 flex gap-4 justify-center">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button size="lg" className="gap-2">
                  Go to Dashboard <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <>
                <Button size="lg" asChild>
                  <a href={getLoginUrl()}>Get Started</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/enterprise">Learn More</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container py-16 border-y">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600">15-30%</div>
            <div className="text-sm text-muted-foreground mt-2">Healthcare Cost Reduction</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600">$4,380</div>
            <div className="text-sm text-muted-foreground mt-2">Annual Savings per Member</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600">24/7</div>
            <div className="text-sm text-muted-foreground mt-2">AI-Powered Support</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600">98%</div>
            <div className="text-sm text-muted-foreground mt-2">Employee Satisfaction</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Enterprise Features</h2>
          <p className="text-muted-foreground mt-2">Comprehensive emotional resilience platform for modern organizations</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Brain className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>AI-Powered Diagnostics</CardTitle>
              <CardDescription>
                Advanced emotional resilience assessments with real-time crisis detection
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>Expert Coach Matching</CardTitle>
              <CardDescription>
                Intelligent matching algorithm connects employees with certified coaches
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>Crisis Prevention</CardTitle>
              <CardDescription>
                Multi-layer crisis detection with immediate professional intervention
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="h-8 w-8 text-orange-600 mb-2" />
              <CardTitle>Progress Analytics</CardTitle>
              <CardDescription>
                Comprehensive tracking and reporting on employee wellbeing metrics
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-8 w-8 text-yellow-600 mb-2" />
              <CardTitle>Instant Support</CardTitle>
              <CardDescription>
                24/7 AI coaching available whenever employees need assistance
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Heart className="h-8 w-8 text-red-600 mb-2" />
              <CardTitle>Holistic Approach</CardTitle>
              <CardDescription>
                Addresses mental, emotional, spiritual, physical, and financial wellness
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* ROI Section */}
      <section className="container py-20 bg-slate-50 dark:bg-slate-900/50 rounded-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Proven ROI for Enterprises</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our platform delivers measurable results that impact your bottom line
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <Card>
              <CardHeader>
                <CardTitle>Reduced Healthcare Costs</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 15-30% reduction in overall healthcare spending</li>
                  <li>• Fewer emergency room visits</li>
                  <li>• Reduced medication costs</li>
                  <li>• Lower insurance premiums</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Increased Productivity</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 40% reduction in absenteeism</li>
                  <li>• Higher employee engagement</li>
                  <li>• Improved focus and performance</li>
                  <li>• Better team collaboration</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Organization?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join leading enterprises using Purposeful Live Coaching to build resilient, thriving teams
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/enterprise">Schedule Demo</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" asChild>
              <a href={getLoginUrl()}>Start Free Trial</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
