"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle, Link2 } from "lucide-react"

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      title: "AI-Powered Content Creation",
      description: "Generate engaging LinkedIn posts in seconds with our advanced AI technology.",
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      title: "Professional Templates",
      description: "Choose from 160+ proven templates designed to maximize engagement.",
      image: "/placeholder.svg?height=600&width=800",
    },
    {
      title: "Performance Analytics",
      description: "Track your content performance and optimize your LinkedIn strategy.",
      image: "/placeholder.svg?height=600&width=800",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"}`}
      >
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-gradient-to-r from-[#0A66C2] to-[#00a0dc] p-1.5 shadow-md mr-2">
              <Link2 className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#0A66C2] to-[#00a0dc] bg-clip-text text-transparent">
              LinkType
            </span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium text-gray-700 hover:text-[#0077B5] transition-colors">
              Features
            </Link>
            <Link
              href="#templates"
              className="text-sm font-medium text-gray-700 hover:text-[#0077B5] transition-colors"
            >
              Templates
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-gray-700 hover:text-[#0077B5] transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm" className="border-[#0077B5] text-[#0077B5] hover:bg-[#0077B5]/10">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-[#0077B5] hover:bg-[#0073b1]">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 pt-16">
        <section className="w-full py-20 md:py-28 lg:py-32 overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <motion.div
                className="flex flex-col justify-center space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-2">
                  <motion.span
                    className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-[#0077B5]/10 text-[#0077B5]"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    LinkedIn Content Made Easy
                  </motion.span>
                  <motion.h1
                    className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-gradient-to-r from-[#0077B5] to-[#00a0dc] bg-clip-text text-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    Create Engaging LinkedIn Posts in Minutes
                  </motion.h1>
                  <motion.p
                    className="max-w-[600px] text-gray-600 md:text-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    Our AI-powered platform helps you create professional, engaging LinkedIn content that drives
                    engagement and grows your network.
                  </motion.p>
                </div>
                <motion.div
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <Link href="/signup">
                    <Button
                      size="lg"
                      className="gap-1.5 bg-[#0077B5] hover:bg-[#0073b1] shadow-lg hover:shadow-xl transition-all"
                    >
                      Get Started Free
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#demo">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-[#0077B5] text-[#0077B5] hover:bg-[#0077B5]/10"
                    >
                      Watch Demo
                    </Button>
                  </Link>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2 text-sm text-gray-500 mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>No credit card required</span>
                  <span className="mx-2">•</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Free 14-day trial</span>
                </motion.div>
              </motion.div>
              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className="relative w-full max-w-[600px] aspect-video rounded-xl overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0077B5]/20 to-[#00a0dc]/20 z-10 rounded-xl"></div>
                  <img
                    src="/Use Linktype.png"
                    alt="Dashboard preview"
                    className="object-cover w-full h-full rounded-xl"
                  />
                  <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent z-20"></div>
                  <motion.div
                    className="absolute bottom-2 left-2 right-2 z-30 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <div>
                      <div className="font-medium text-gray-900 text-sm">Mr Beast</div>
                      <div className="text-xs text-gray-500">Marketing Director • Just now</div>
                    </div>
                    <p className="mt-1 text-xs text-gray-700">
                      I've been using AI to transform our content strategy, and the results have been incredible.
                      Engagement is up 247% and our conversion rate has doubled...
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="w-full py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container px-4 md:px-6 text-center">
            <motion.div
              className="max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-[#0077B5]/10 text-[#0077B5] mb-4">
                Trusted by professionals
              </span>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Join <span className="text-[#0077B5]">10,000+</span> professionals growing their LinkedIn presence
              </h2>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-70">
              {["Company 1", "Company 2", "Company 3", "Company 4", "Company 5"].map((company, i) => (
                <motion.div
                  key={i}
                  className="h-8 w-32 bg-gray-200 rounded"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                ></motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-24 md:py-32 overflow-hidden">
          <div className="container px-4 md:px-6">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-[#0077B5]/10 text-[#0077B5] mb-4">
                Features
              </span>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Everything you need to <span className="text-[#0077B5]">dominate</span> on LinkedIn
              </h2>
              <p className="text-xl text-gray-600">
                Powerful tools designed to help you create content that stands out and drives results
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    className={`p-6 rounded-xl transition-all cursor-pointer ${activeFeature === i ? "bg-[#0077B5]/10 shadow-md" : "hover:bg-gray-50"}`}
                    onClick={() => setActiveFeature(i)}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileHover={{ x: 5 }}
                  >
                    <h3
                      className={`text-xl font-bold mb-2 ${activeFeature === i ? "text-[#0077B5]" : "text-gray-900"}`}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="relative rounded-xl overflow-hidden shadow-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#0077B5]/20 to-[#00a0dc]/20 z-10 rounded-xl"></div>
                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    className="w-full aspect-video"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeFeature === i ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ display: activeFeature === i ? "block" : "none" }}
                  >
                    <img
                      src={feature.image || "/placeholder.svg"}
                      alt={feature.title}
                      className="object-cover w-full h-full"
                    />
                  </motion.div>
                ))}
                <div className="absolute bottom-0 left-0 right-0 flex justify-center p-4">
                  <div className="flex gap-2">
                    {features.map((_, i) => (
                      <button
                        key={i}
                        className={`w-3 h-3 rounded-full transition-all ${activeFeature === i ? "bg-white w-6" : "bg-white/50"}`}
                        onClick={() => setActiveFeature(i)}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section
          id="templates"
          className="w-full py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white overflow-hidden"
        >
          <div className="container px-4 md:px-6">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-[#0077B5]/10 text-[#0077B5] mb-4">
                Templates
              </span>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                <span className="text-[#0077B5]">160+</span> proven templates for any scenario
              </h2>
              <p className="text-xl text-gray-600">Find the perfect template for your content goals and audience</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Storytelling",
                  description: "Engage your audience with compelling narratives",
                  count: "24 templates",
                  icon: "📝",
                },
                {
                  title: "Case Studies",
                  description: "Showcase your success stories and results",
                  count: "18 templates",
                  icon: "📊",
                },
                {
                  title: "Thought Leadership",
                  description: "Establish yourself as an industry expert",
                  count: "22 templates",
                  icon: "💡",
                },
                {
                  title: "How-to Guides",
                  description: "Share valuable knowledge and actionable advice",
                  count: "26 templates",
                  icon: "📚",
                },
                {
                  title: "Personal Branding",
                  description: "Build your professional identity and reputation",
                  count: "20 templates",
                  icon: "👤",
                },
                {
                  title: "Engagement Posts",
                  description: "Start conversations and boost interactions",
                  count: "15 templates",
                  icon: "🔄",
                },
              ].map((category, i) => (
                <motion.div
                  key={i}
                  className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="p-6">
                    <div className="text-3xl mb-4">{category.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900">{category.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{category.description}</p>
                    <div className="mt-4 flex items-center text-sm text-[#0077B5]">{category.count}</div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0077B5] to-[#00a0dc] transform scale-x-0 transition-transform group-hover:scale-x-100"></div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Link href="/templates">
                <Button className="bg-[#0077B5] hover:bg-[#0073b1]">
                  View All Templates
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="w-full py-24 md:py-32 bg-[#0077B5] text-white overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white">
                  AI-Powered
                </span>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Create content that converts in seconds
                </h2>
                <p className="text-xl text-white/80">
                  Our advanced AI understands what works on LinkedIn and helps you create content that drives engagement
                  and results.
                </p>
                <div className="space-y-4">
                  {[
                    "Generate high-quality posts with a single click",
                    "Improve your writing with AI-powered suggestions",
                    "Optimize your content for maximum engagement",
                    "Save hours of time on content creation",
                  ].map((feature, i) => (
                    <motion.div
                      key={i}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                      <CheckCircle className="h-5 w-5 text-white" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <Link href="/signup">
                    <Button size="lg" className="bg-white text-[#0077B5] hover:bg-white/90">
                      Try It Free
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="absolute -inset-4 bg-[#0073b1] rounded-xl -z-10"></div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-2xl">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">AI Post Generator</h3>
                      <span className="px-2 py-1 text-xs bg-white/20 rounded-full">Pro</span>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-white/80">What would you like to write about?</label>
                      <div className="bg-white/5 border border-white/20 rounded-lg p-3 text-sm">
                        The importance of data-driven decision making in modern marketing strategies
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <label className="text-sm text-white/80">Tone</label>
                        <label className="text-sm text-white/80">Length</label>
                      </div>
                      <div className="flex gap-2">
                        <select className="flex-1 bg-white/5 border border-white/20 rounded-lg p-2 text-sm">
                          <option>Professional</option>
                          <option>Conversational</option>
                          <option>Authoritative</option>
                        </select>
                        <select className="flex-1 bg-white/5 border border-white/20 rounded-lg p-2 text-sm">
                          <option>Short</option>
                          <option>Medium</option>
                          <option>Long</option>
                        </select>
                      </div>
                    </div>
                    <Button className="w-full bg-white text-[#0077B5] hover:bg-white/90">Generate Post</Button>
                    <div className="bg-white/5 border border-white/20 rounded-lg p-4 text-sm">
                      <div className="animate-pulse space-y-2">
                        <div className="h-4 bg-white/20 rounded w-3/4"></div>
                        <div className="h-4 bg-white/20 rounded"></div>
                        <div className="h-4 bg-white/20 rounded w-5/6"></div>
                        <div className="h-4 bg-white/20 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-24 md:py-32 overflow-hidden">
          <div className="container px-4 md:px-6">
            <motion.div
              className="text-center max-w-3xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-[#0077B5]/10 text-[#0077B5] mb-4">
                Pricing
              </span>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Simple, transparent pricing
              </h2>
              <p className="text-xl text-gray-600">Choose the plan that works for you</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "Free",
                  price: "$0",
                  description: "Perfect for getting started",
                  features: ["5 posts per month", "10 basic templates", "Basic formatting tools", "Community support"],
                },
                {
                  title: "Pro",
                  price: "$19",
                  period: "/month",
                  description: "For serious content creators",
                  features: [
                    "Unlimited posts",
                    "Access to all 160+ templates",
                    "AI-powered suggestions",
                    "Content calendar",
                    "Basic analytics",
                    "Email support",
                  ],
                  highlighted: true,
                },
                {
                  title: "Team",
                  price: "$49",
                  period: "/month",
                  description: "For teams and businesses",
                  features: [
                    "Everything in Pro",
                    "5 team members",
                    "Collaboration tools",
                    "Advanced analytics",
                    "Custom templates",
                    "Priority support",
                  ],
                },
              ].map((plan, i) => (
                <motion.div
                  key={i}
                  className={`flex flex-col rounded-xl ${
                    plan.highlighted
                      ? "border-2 border-[#0077B5] shadow-xl relative"
                      : "border border-gray-200 shadow-sm"
                  } bg-white overflow-hidden`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  {plan.highlighted && (
                    <div className="absolute top-0 left-0 right-0 bg-[#0077B5] text-white text-center text-sm py-1 font-medium">
                      Most Popular
                    </div>
                  )}
                  <div className={`p-6 ${plan.highlighted ? "pt-8" : ""}`}>
                    <h3 className="text-2xl font-bold text-gray-900">{plan.title}</h3>
                    <div className="mt-4 flex items-baseline">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      {plan.period && <span className="ml-1 text-gray-500">{plan.period}</span>}
                    </div>
                    <p className="mt-2 text-sm text-gray-500">{plan.description}</p>

                    <div className="mt-6">
                      <Button
                        className={`w-full ${
                          plan.highlighted ? "bg-[#0077B5] hover:bg-[#0073b1]" : "bg-gray-900 hover:bg-gray-800"
                        }`}
                      >
                        {plan.title === "Free" ? "Sign Up Free" : "Get Started"}
                      </Button>
                    </div>
                  </div>

                  <div className="p-6 bg-gray-50 flex-1">
                    <p className="font-medium text-sm text-gray-700 mb-4">What's included:</p>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="mr-2 h-4 w-4 text-[#0077B5]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <p className="text-gray-600 mb-4">Have questions about our plans?</p>
              <Link href="/contact">
                <Button variant="outline" className="border-[#0077B5] text-[#0077B5] hover:bg-[#0077B5]/10">
                  Contact Sales
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="w-full py-24 md:py-32 bg-gray-50 overflow-hidden">
          <div className="container px-4 md:px-6">
            <motion.div
              className="max-w-3xl mx-auto text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-[#0077B5]/10 text-[#0077B5] mb-4">
                Testimonials
              </span>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Loved by LinkedIn professionals
              </h2>
              <p className="text-xl text-gray-600">See what our users are saying about LinkType</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "LinkType has completely transformed how I create content for LinkedIn. I've seen a 300% increase in engagement since I started using it.",
                  author: "Sarah Johnson",
                  role: "Marketing Director",
                  image: "/placeholder.svg?height=100&width=100",
                },
                {
                  quote:
                    "As a consultant, my LinkedIn presence is crucial. LinkType has helped me establish thought leadership in my industry with minimal effort.",
                  author: "Emma Rodriguez",
                  role: "Business Consultant",
                  image: "/placeholder.svg?height=100&width=100",
                },
              ].map((testimonial, i) => (
                <motion.div
                  key={i}
                  className="bg-white p-6 rounded-xl shadow-md"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="flex items-center mb-4">
                    <div className="text-[#0077B5] text-4xl">"</div>
                  </div>
                  <p className="text-gray-700 mb-6">{testimonial.quote}</p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.author}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-24 md:py-32 bg-[#0077B5] text-white overflow-hidden">
          <div className="container px-4 md:px-6 text-center">
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
                Ready to transform your LinkedIn presence?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Join thousands of professionals creating engaging content that drives results
              </p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link href="/signup">
                  <Button size="lg" className="bg-white text-[#0077B5] hover:bg-white/90 shadow-lg">
                    Get Started Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#demo">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Watch Demo
                  </Button>
                </Link>
              </motion.div>
              <p className="mt-4 text-sm text-white/70">No credit card required • Free 14-day trial</p>
            </motion.div>
          </div>
        </section>
      </main>
      <footer className="border-t py-12 md:py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="rounded-md bg-gradient-to-r from-[#0A66C2] to-[#00a0dc] p-1.5 shadow-md mr-2">
                  <Link2 className="h-4 w-4 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-[#0A66C2] to-[#00a0dc] bg-clip-text text-transparent">
                  LinkType
                </span>
              </div>
              <p className="text-gray-600 mb-4 max-w-xs">
                Create engaging LinkedIn content that drives results with our AI-powered platform.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-[#0077B5]">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#0077B5]">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#0077B5]">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#0077B5]">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#0077B5]">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#0077B5]">
                    Templates
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#0077B5]">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#0077B5]">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#0077B5]">
                    Enterprise
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#0077B5]">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#0077B5]">
                    Guides
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#0077B5]">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#0077B5]">
                    Webinars
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#0077B5]">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#0077B5]">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#0077B5]">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#0077B5]">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#0077B5]">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-[#0077B5]">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
            © 2025 LinkType. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

