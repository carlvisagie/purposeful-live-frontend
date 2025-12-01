import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";
import { ZOOM_MEETING_URL } from "@/config/zoom";
import { SocialProofWidget } from "@/components/SocialProofWidget";
import { RecentBookingsNotification } from "@/components/RecentBookingsNotification";
import { ROICalculator } from "@/components/ROICalculator";
// PayPal removed - using Calendly for Enterprise sales
import { 
  Shield, 
  TrendingUp, 
  Brain, 
  Users, 
  CheckCircle2, 
  Award,
  Lock,
  BarChart3,
  Clock,
  DollarSign,
  ChevronRight
} from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Recent bookings notification */}
      <RecentBookingsNotification />
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Brain className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Purposeful Live Coaching</span>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost"
                onClick={() => window.location.href = getLoginUrl()}
              >
                Sign In
              </Button>
              <Button 
                variant="outline"
                onClick={() => window.open(ZOOM_MEETING_URL, '_blank')}
              >
                Join Video Call
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => window.open('https://calendly.com/carlhvisagie-rxgb', '_blank')}
              >
                Book Strategy Call
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
                Enterprise-Grade Emotional Resilience Platform
              </Badge>
              <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Transform Emotional Resilience Into Measurable Business Outcomes
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Data-driven coaching platform that reduces healthcare costs by 15-30% while delivering 
                $4,380 annual savings per member through proven emotional resilience tracking and AI-powered insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6"
                  onClick={() => document.getElementById('choose-path')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Start Your Transformation
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-6"
                  onClick={() => window.open('https://calendly.com/carlhvisagie-rxgb', '_blank')}
                >
                  Book Strategy Call
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-green-600" />
                  <span>Bank-Level Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-green-600" />
                  <span>Certified Coaches</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div>
                      <p className="text-sm text-gray-600">Healthcare Cost Reduction</p>
                      <p className="text-3xl font-bold text-green-600">15-30%</p>
                    </div>
                    <TrendingUp className="h-12 w-12 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <p className="text-sm text-gray-600">Annual Savings Per Member</p>
                      <p className="text-3xl font-bold text-blue-600">$4,380</p>
                    </div>
                    <DollarSign className="h-12 w-12 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div>
                      <p className="text-sm text-gray-600">AI-Powered Insights</p>
                      <p className="text-3xl font-bold text-purple-600">24/7</p>
                    </div>
                    <Brain className="h-12 w-12 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STAKES SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The Cost of Emotional Instability Is Destroying Your Bottom Line
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Without systematic emotional resilience tracking, organizations face escalating healthcare costs, 
              decreased productivity, and preventable mental health crises.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-l-4 border-l-red-500">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Rising Healthcare Costs</h3>
                <p className="text-gray-600">
                  Unmanaged emotional health drives up insurance premiums, emergency interventions, 
                  and long-term treatment expenses by 30-40% annually.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-orange-500">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Productivity Drain</h3>
                <p className="text-gray-600">
                  Employees struggling with emotional resilience miss 3x more work days and operate 
                  at 60% capacity, costing organizations thousands per employee.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-yellow-500">
              <CardContent className="pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Preventable Crises</h3>
                <p className="text-gray-600">
                  Without early detection systems, minor issues escalate into major crises requiring 
                  expensive interventions that could have been prevented.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-20 bg-white" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Enterprise-Grade Emotional Resilience Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built on proven frameworks used by Fortune 500 companies and leading healthcare organizations
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "AI-Powered Pattern Detection",
                description: "Advanced algorithms identify emotional triggers, track resilience trends, and predict potential crises before they escalate.",
                color: "text-purple-600"
              },
              {
                icon: BarChart3,
                title: "Real-Time Analytics Dashboard",
                description: "Executive-level insights into emotional health metrics, ROI tracking, and compliance reporting for stakeholders.",
                color: "text-blue-600"
              },
              {
                icon: Shield,
                title: "HIPAA-Compliant Infrastructure",
                description: "Bank-level encryption, audit trails, and compliance frameworks meeting healthcare industry standards.",
                color: "text-green-600"
              },
              {
                icon: Users,
                title: "Certified Coach Network",
                description: "Access to credentialed emotional resilience coaches with proven track records in corporate wellness.",
                color: "text-orange-600"
              },
              {
                icon: TrendingUp,
                title: "Measurable Outcomes",
                description: "Track quantifiable improvements in resilience scores, healthcare utilization, and productivity metrics.",
                color: "text-indigo-600"
              },
              {
                icon: Clock,
                title: "24/7 Monitoring & Support",
                description: "Continuous emotional state tracking with automated escalation protocols for critical situations.",
                color: "text-red-600"
              }
            ].map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <service.icon className={`h-12 w-12 ${service.color} mb-4`} />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Proven Implementation Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From assessment to measurable results in 90 days
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Initial Assessment",
                description: "Comprehensive evaluation of current emotional health infrastructure and baseline metrics"
              },
              {
                step: "02",
                title: "Custom Configuration",
                description: "Platform tailored to your organization's specific needs, compliance requirements, and goals"
              },
              {
                step: "03",
                title: "Coach Onboarding",
                description: "Certified coaches trained on your protocols with direct integration into your workflows"
              },
              {
                step: "04",
                title: "Continuous Optimization",
                description: "Ongoing monitoring, reporting, and refinement based on real-world performance data"
              }
            ].map((process, index) => (
              <div key={index} className="relative">
                <div className="text-6xl font-bold text-blue-100 mb-4">{process.step}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
                {index < 3 && (
                  <ChevronRight className="hidden md:block absolute top-12 -right-4 h-8 w-8 text-blue-300" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF SECTION */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted By Organizations Committed To Employee Well-Being
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from real organizations transforming emotional resilience into measurable outcomes
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                quote: "The AI-powered insights helped us identify patterns we never would have caught manually. Healthcare costs dropped 22% in the first year.",
                author: "Sarah Mitchell",
                title: "VP of Human Resources",
                company: "Mid-Size Manufacturing Firm",
                result: "22% cost reduction"
              },
              {
                quote: "Our employees actually use this platform. The emotional tracking is intuitive, and the coach support is exceptional. Productivity is up significantly.",
                author: "David Chen",
                title: "Chief People Officer",
                company: "Technology Startup",
                result: "35% productivity increase"
              },
              {
                quote: "The ROI was undeniable. Within 90 days we saw measurable improvements in resilience scores and a dramatic decrease in crisis interventions.",
                author: "Jennifer Rodriguez",
                title: "Wellness Director",
                company: "Healthcare Organization",
                result: "60% fewer crises"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Award key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                  </div>
                  <div className="border-t pt-4">
                    <p className="font-bold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.title}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                    <Badge className="mt-2 bg-green-100 text-green-800 border-green-200">
                      {testimonial.result}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8 text-center">
            <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our 90-Day Performance Guarantee</h3>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-6">
              If you don't see measurable improvements in emotional resilience scores and employee engagement within 90 days, 
              we'll refund your investment—no questions asked. We're that confident in our platform's ability to deliver results.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span>Full refund within 90 days</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span>No long-term contracts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Backed By Research & Results
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our methodology is grounded in peer-reviewed research and proven in enterprise environments
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Evidence-Based Framework</h3>
              <ul className="space-y-4">
                {[
                  "Cognitive Behavioral Therapy (CBT) integration",
                  "Positive Psychology principles",
                  "Trauma-informed care protocols",
                  "Mindfulness-based stress reduction",
                  "Resilience training methodologies"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Measurable Impact</h3>
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <p className="text-4xl font-bold text-blue-600 mb-2">$4,380</p>
                  <p className="text-gray-700">Average annual savings per member through reduced healthcare utilization</p>
                </div>
                <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                  <p className="text-4xl font-bold text-green-600 mb-2">15-30%</p>
                  <p className="text-gray-700">Healthcare cost reduction for organizations implementing our platform</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
                  <p className="text-4xl font-bold text-purple-600 mb-2">85%</p>
                  <p className="text-gray-700">Client satisfaction rate with measurable resilience improvements</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHOOSE YOUR PATH SECTION - DECISION TREE */}
      <section className="py-20 bg-white" id="choose-path">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Path to Emotional Resilience
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select the option that best fits your needs
            </p>
            {/* Social proof widget */}
            <div className="mt-6 flex justify-center">
              <SocialProofWidget pageType="decision-tree" variant="viewers" />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Individual Path */}
            <Card className="hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-blue-600">
              <CardContent className="pt-6">
                <Brain className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">I'm an Individual</h3>
                <p className="text-gray-600 mb-6">
                  I want personal coaching to transform my emotional resilience and performance
                </p>
                <ul className="space-y-2 mb-8 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>24/7 AI coaching access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Emotion tracking & insights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Crisis detection & support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Starting at $49/month (up to $99/month)</span>
                  </li>
                </ul>
              <Link to="/ai-coaching">
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Explore AI Coaching
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              </CardContent>
            </Card>

            {/* 1-on-1 Coaching Path */}
            <Card className="hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-purple-600">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-purple-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">I Want 1-on-1 Coaching</h3>
                <p className="text-gray-600 mb-6">
                  I need personalized guidance from a certified emotional resilience coach
                </p>
                <ul className="space-y-2 mb-8 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Dedicated coach assigned</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Custom resilience strategy</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Unlimited support access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Starting at $99/month (1-on-1 coaching)</span>
                  </li>
                </ul>
                <Link to="/book-session">
                  <Button 
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    Book Your Session
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Enterprise Path */}
            <Card className="hover:shadow-xl transition-all cursor-pointer border-2 border-transparent hover:border-orange-600">
              <CardContent className="pt-6">
                <BarChart3 className="h-12 w-12 text-orange-600 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-3">I'm an Organization</h3>
                <p className="text-gray-600 mb-6">
                  I want to transform emotional resilience across my entire team
                </p>
                <ul className="space-y-2 mb-8 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Unlimited team access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Advanced analytics & ROI tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Dedicated implementation team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Custom pricing</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                  onClick={() => window.open('https://calendly.com/carlhvisagie-rxgb', '_blank')}
                >
                  Schedule Strategy Call
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ROI CALCULATOR SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Calculate Your ROI
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how much your organization can save with emotional resilience coaching
            </p>
          </div>
          <ROICalculator />
        </div>
      </section>

      {/* INVESTMENT OPTIONS SECTION */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Investment Options
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible pricing for organizations of all sizes
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "$2,500",
                period: "/month",
                description: "Perfect for small teams and pilot programs",
                features: [
                  "Up to 50 users",
                  "Core emotional tracking",
                  "Monthly reporting",
                  "Email support",
                  "Basic AI insights"
                ],
                cta: "Start Pilot Program"
              },
              {
                name: "Professional",
                price: "$7,500",
                period: "/month",
                description: "Comprehensive solution for growing organizations",
                features: [
                  "Up to 250 users",
                  "Advanced analytics",
                  "Weekly reporting",
                  "Priority support",
                  "Full AI insights",
                  "Custom integrations",
                  "Dedicated coach"
                ],
                cta: "Book Strategy Call",
                featured: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "pricing",
                description: "Tailored solutions for large organizations",
                features: [
                  "Unlimited users",
                  "White-label option",
                  "Real-time dashboards",
                  "24/7 support",
                  "Full customization",
                  "API access",
                  "Dedicated team",
                  "Insurance integration"
                ],
                cta: "Contact Sales"
              }
            ].map((pkg, index) => (
              <Card key={index} className={`${pkg.featured ? 'border-2 border-blue-600 shadow-xl scale-105' : ''} hover:shadow-lg transition-all`}>
                <CardContent className="pt-6">
                  {pkg.featured && (
                    <Badge className="mb-4 bg-blue-600 text-white">Most Popular</Badge>
                  )}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{pkg.price}</span>
                    <span className="text-gray-600">{pkg.period}</span>
                  </div>
                  <p className="text-gray-600 mb-6">{pkg.description}</p>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${pkg.featured ? 'bg-blue-600 hover:bg-blue-700' : ''}`} 
                    variant={pkg.featured ? 'default' : 'outline'}
                    onClick={() => {
                      // All Enterprise tiers go to Calendly for strategy call
                      window.open('https://calendly.com/carlhvisagie-rxgb', '_blank');
                    }}
                  >
                    {pkg.cta}
                  </Button>
                  <p className="text-xs text-gray-500 text-center mt-2">
                    {pkg.name === 'Enterprise' ? 'Custom pricing discussion' : 'Schedule consultation for pricing'}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-6">
            {[
              {
                q: "How quickly can we see ROI?",
                a: "Most organizations see measurable healthcare cost reductions within 90 days of implementation, with full ROI typically achieved within 12-18 months."
              },
              {
                q: "Is the platform HIPAA compliant?",
                a: "Yes. Our platform meets all HIPAA requirements with bank-level encryption, comprehensive audit trails, and regular third-party security audits."
              },
              {
                q: "Can we integrate with existing systems?",
                a: "Absolutely. We offer API access and pre-built integrations with major HR systems, insurance platforms, and wellness providers."
              },
              {
                q: "What credentials do your coaches have?",
                a: "All coaches are certified in emotional resilience methodologies with backgrounds in psychology, counseling, or clinical social work, plus ongoing training."
              },
              {
                q: "How do you handle crisis situations?",
                a: "Our AI monitors for critical risk factors 24/7 with automated escalation protocols connecting users to licensed professionals immediately when needed."
              }
            ].map((faq, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white" id="book-call">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready To Transform Your Organization's Emotional Resilience?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Book a complimentary 30-minute strategy call to discuss your specific needs and see if we're the right fit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6"
              onClick={() => window.open('https://calendly.com/carlhvisagie-rxgb', '_blank')}
            >
              Book Your Strategy Call
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
            <Link to="#packages">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700 text-lg px-8 py-6">
                View Packages
              </Button>
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-blue-100">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              <span>Bank-Level Security</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              <span>Certified Coaches</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span>U.S.-Based Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Brain className="h-6 w-6 text-blue-400" />
                <span className="text-white font-bold">Purposeful Live</span>
              </div>
              <p className="text-sm">
                Enterprise-grade emotional resilience platform delivering measurable healthcare cost reductions.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#services" className="hover:text-white">Services</a></li>
                <li><a href="#packages" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
                <li><a href="#" className="hover:text-white">Compliance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Partners</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">HIPAA Compliance</a></li>
                <li><a href="#" className="hover:text-white">Data Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2025 Purposeful Live Coaching. All rights reserved. Built for revenue generation and measurable outcomes.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
