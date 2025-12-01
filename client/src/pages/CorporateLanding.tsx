import { useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ROICalculator } from "@/components/ROICalculator";
import { RecentBookingsNotification } from "@/components/RecentBookingsNotification";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { LiveChatWidget } from "@/components/LiveChatWidget";
import { VideoTestimonials } from "@/components/VideoTestimonials";
import {
  TrendingUp,
  BarChart3,
  Users,
  Shield,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";


/**
 * Corporate Landing Page
 * 100% focused on enterprise buyers
 * Single path: Enterprise emotional resilience platform
 */
export default function CorporateLanding() {
  const [, setLocation] = useLocation();
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY <= window.innerHeight * 0.05 && !showExitPopup) {
        const hasShown = sessionStorage.getItem("exitPopupCorporate");
        if (!hasShown) {
          setShowExitPopup(true);
          sessionStorage.setItem("exitPopupCorporate", "true");
        }
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [showExitPopup]);

  return (
    <div className="min-h-screen bg-white">
      <ExitIntentPopup
        open={showExitPopup}
        onClose={() => setShowExitPopup(false)}
        type="corporate"
      />
      <LiveChatWidget type="corporate" routeToTeam="sales" />
      {/* HERO SECTION - Enterprise Focus */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-blue-200 text-blue-900">
              Enterprise Solution
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Reduce Healthcare Costs by 20% Through Emotional Resilience
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              The average organization spends $5,000-$20,000 per employee annually on healthcare. Emotional resilience coaching reduces that burden while improving productivity, retention, and employee satisfaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-white text-blue-900 hover:bg-blue-50 font-semibold"
                onClick={() =>
                  document
                    .getElementById("roi-calculator")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Calculate Your ROI
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RecentBookingsNotification />
        </div>
      </section>

      {/* THE PROBLEM - Cost of Emotional Instability */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The Cost of Emotional Instability in Your Organization
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unmanaged stress and emotional challenges cost organizations billions annually
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "💰",
                title: "Healthcare Costs",
                description:
                  "Stressed employees have 46% higher healthcare costs and 41% higher absenteeism rates",
              },
              {
                icon: "📉",
                title: "Productivity Loss",
                description:
                  "Depression alone costs $44 billion annually in lost productivity across US businesses",
              },
              {
                icon: "👥",
                title: "Turnover & Retention",
                description:
                  "Burnout-related turnover costs 50-200% of annual salary per employee replacement",
              },
            ].map((item, idx) => (
              <Card key={idx} className="border-l-4 border-l-red-500">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* THE SOLUTION - Enterprise Platform */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Enterprise-Grade Emotional Resilience Platform
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Proven human coaching combined with enterprise-grade security for measurable outcomes
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Features */}
            <div className="space-y-6">
              {[
                {
                  title: "Expert Human Coaches",
                  description:
                    "Certified emotional resilience coaches with 10+ years of experience.",
                },
                {
                  title: "Crisis Detection & Response",
                  description:
                    "Trained coaches identify emotional distress and provide immediate support.",
                },
                {
                  title: "Emotion Tracking & Analytics",
                  description:
                    "Real-time dashboards show team emotional health trends and risk indicators.",
                },
                {
                  title: "Customizable Programs",
                  description:
                    "Industry-specific coaching (healthcare, tech, finance stress patterns).",
                },
                {
                  title: "HIPAA & SOC 2 Compliant",
                  description:
                    "Enterprise-grade security and privacy for sensitive employee data.",
                },
                {
                  title: "Dedicated Account Management",
                  description:
                    "Personal support team ensures successful implementation and adoption.",
                },
              ].map((feature, idx) => (
                <div key={idx} className="flex gap-4">
                  <CheckCircle2 className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="space-y-6">
              <Card className="bg-white border-2 border-green-500">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    20%
                  </div>
                  <p className="text-gray-600">
                    Average reduction in healthcare costs within 12 months
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-2 border-blue-500">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    34%
                  </div>
                  <p className="text-gray-600">
                    Improvement in employee engagement scores
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-2 border-purple-500">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-purple-600 mb-2">
                    45%
                  </div>
                  <p className="text-gray-600">
                    Reduction in absenteeism and presenteeism
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white border-2 border-orange-500">
                <CardContent className="pt-6">
                  <div className="text-4xl font-bold text-orange-600 mb-2">
                    3-6 months
                  </div>
                  <p className="text-gray-600">
                    Average payback period on investment
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ROI CALCULATOR SECTION */}
      <section id="roi-calculator" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Calculate Your ROI
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See exactly how much your organization can save with emotional resilience coaching
            </p>
          </div>
          <ROICalculator />
        </div>
      </section>

      {/* IMPLEMENTATION PROCESS */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple Implementation Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">Get your team up and running in 30 days with our proven implementation framework</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Discovery & Planning",
                description: "We assess your organization's needs, identify key stakeholders, and create a customized implementation roadmap.",
                timeline: "Week 1"
              },
              {
                step: "2",
                title: "Setup & Integration",
                description: "Configure the platform, integrate with your HR systems, and set up security protocols and compliance requirements.",
                timeline: "Week 2"
              },
              {
                step: "3",
                title: "Training & Rollout",
                description: "Train coaches and administrators, launch pilot program with early adopters, gather feedback and optimize.",
                timeline: "Weeks 3-4"
              },
              {
                step: "4",
                title: "Full Deployment",
                description: "Roll out to entire organization, monitor adoption metrics, provide ongoing support and optimization.",
                timeline: "Ongoing"
              }
            ].map((phase, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  {phase.step}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{phase.title}</h3>
                <p className="text-gray-600 mb-4">{phase.description}</p>
                <p className="text-sm font-semibold text-blue-600">{phase.timeline}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO TESTIMONIALS */}
      <VideoTestimonials />

      {/* CASE STUDIES / PROOF */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Leading Organizations
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                company: "Fortune 500 Tech Company",
                result: "$2.3M saved in healthcare costs",
                metric: "1,200 employees",
              },
              {
                company: "Healthcare Network",
                result: "42% reduction in burnout",
                metric: "800 clinical staff",
              },
              {
                company: "Financial Services Firm",
                result: "38% improvement in retention",
                metric: "2,500 employees",
              },
            ].map((study, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <p className="text-sm text-gray-500 mb-2">Case Study</p>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {study.company}
                  </h3>
                  <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">
                      {study.result}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">{study.metric}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* INVESTMENT OPTIONS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Enterprise Investment Options
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible pricing scaled to your organization size
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "$2,500",
                period: "/month",
                description: "Perfect for small teams",
                features: [
                  "Up to 50 employees",
                  "Expert human coaches",
                  "Basic analytics",
                  "Email support",
                ],
              },
              {
                name: "Growth",
                price: "$5,000",
                period: "/month",
                description: "For growing organizations",
                features: [
                  "Up to 200 employees",
                  "Advanced human coaching",
                  "Real-time dashboards",
                  "Priority support",
                  "Custom modules",
                ],
                highlight: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "pricing",
                description: "For large organizations",
                features: [
                  "Unlimited employees",
                  "Dedicated account team",
                  "Custom integrations",
                  "Advanced security",
                  "SLA guarantees",
                ],
              },
            ].map((tier, idx) => (
              <Card
                key={idx}
                className={tier.highlight ? "border-2 border-blue-600 shadow-lg" : ""}
              >
                <CardHeader>
                  <CardTitle>{tier.name}</CardTitle>
                  <p className="text-sm text-gray-600 mt-2">{tier.description}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <span className="text-4xl font-bold text-gray-900">
                      {tier.price}
                    </span>
                    <span className="text-gray-600 ml-2">{tier.period}</span>
                  </div>

                  <ul className="space-y-3">
                    {tier.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={
                      tier.highlight
                        ? "w-full bg-blue-600 hover:bg-blue-700"
                        : "w-full"
                    }
                    onClick={() =>
                      window.open("https://calendly.com/carlhvisagie-rxgb", "_blank")
                    }
                  >
                    Schedule Strategy Call
                  </Button>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Common questions about our enterprise coaching platform</p>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How quickly will we see ROI?",
                answer: "Most organizations see measurable improvements within 30-60 days. The average payback period is 3-6 months, with ongoing savings of 20% on healthcare costs."
              },
              {
                question: "Is the platform HIPAA compliant?",
                answer: "Yes. Our platform meets HIPAA, SOC 2, and enterprise security standards. All data is encrypted, and we maintain audit-ready compliance documentation."
              },
              {
                question: "How many employees can use the platform?",
                answer: "The platform scales to any organization size. Pricing is based on your team size, with volume discounts available for enterprises with 500+ employees."
              },
              {
                question: "What support do we get?",
                answer: "Each organization receives a dedicated account manager, implementation support, ongoing training, and 24/7 technical support."
              },
              {
                question: "Can we integrate with our existing HR systems?",
                answer: "Yes. We integrate with major HRIS platforms (Workday, BambooHR, etc.) and can build custom integrations for your specific needs."
              },
              {
                question: "What's your data privacy policy?",
                answer: "We never sell or share employee data. All information is encrypted, stored securely, and deleted upon request. You maintain full data ownership."
              }
            ].map((faq, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FOOTER */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Organization?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get a personalized ROI analysis and implementation roadmap from our enterprise team.
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
            onClick={() => window.open("https://calendly.com/carlhvisagie-rxgb", "_blank")}
          >
            Schedule Your Strategy Call
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
