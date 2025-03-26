"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { PostTemplateCard } from "@/components/post-template-card"
import { RecentPostCard } from "@/components/recent-post-card"
import { LinkedInIntegration } from "@/components/linkedin-integration"
import { motion } from "framer-motion"
import { BarChart3, Users, TrendingUp, Eye, Plus } from "lucide-react"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("recent")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <DashboardShell>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <DashboardHeader heading="Dashboard" text="Create and manage your LinkedIn posts">
          <Link href="/dashboard/new-post">
            <Button className="bg-[#0077B5] hover:bg-[#0073b1] gap-1">
              <Plus className="h-4 w-4" />
              Create new post
            </Button>
          </Link>
        </DashboardHeader>
      </motion.div>

      <motion.div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-8"
        variants={container}
        initial="hidden"
        animate={isLoaded ? "show" : "hidden"}
      >
        <motion.div variants={item}>
          <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
            <div className="h-1 bg-[#0077B5]"></div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Total Posts</p>
                  <h3 className="text-3xl font-bold text-gray-900">24</h3>
                  <p className="text-xs text-green-600 mt-1 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12% from last month
                  </p>
                </div>
                <div className="bg-[#0077B5]/10 p-3 rounded-full">
                  <BarChart3 className="h-6 w-6 text-[#0077B5]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
            <div className="h-1 bg-[#00a0dc]"></div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Engagement Rate</p>
                  <h3 className="text-3xl font-bold text-gray-900">4.2%</h3>
                  <p className="text-xs text-green-600 mt-1 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +0.8% from last month
                  </p>
                </div>
                <div className="bg-[#00a0dc]/10 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-[#00a0dc]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
            <div className="h-1 bg-[#0073b1]"></div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Profile Views</p>
                  <h3 className="text-3xl font-bold text-gray-900">342</h3>
                  <p className="text-xs text-green-600 mt-1 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +18% from last month
                  </p>
                </div>
                <div className="bg-[#0073b1]/10 p-3 rounded-full">
                  <Eye className="h-6 w-6 text-[#0073b1]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
            <div className="h-1 bg-[#004182]"></div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">New Connections</p>
                  <h3 className="text-3xl font-bold text-gray-900">48</h3>
                  <p className="text-xs text-green-600 mt-1 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +6% from last month
                  </p>
                </div>
                <div className="bg-[#004182]/10 p-3 rounded-full">
                  <Users className="h-6 w-6 text-[#004182]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div className="mt-8">
        <LinkedInIntegration />
      </motion.div>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Tabs defaultValue="recent" className="space-y-4" onValueChange={handleTabChange}>
          <TabsList className="bg-gray-100 p-1">
            <TabsTrigger
              value="recent"
              className={`transition-all ${activeTab === "recent" ? "bg-white text-[#0077B5]" : "text-gray-600"}`}
            >
              Recent Posts
            </TabsTrigger>
            <TabsTrigger
              value="templates"
              className={`transition-all ${activeTab === "templates" ? "bg-white text-[#0077B5]" : "text-gray-600"}`}
            >
              Templates
            </TabsTrigger>
            <TabsTrigger
              value="scheduled"
              className={`transition-all ${activeTab === "scheduled" ? "bg-white text-[#0077B5]" : "text-gray-600"}`}
            >
              Scheduled
            </TabsTrigger>
          </TabsList>

          <TabsContent value="recent" className="space-y-4">
            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              variants={container}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0 }}
            >
              {[
                {
                  title: "How I Increased Engagement by 300%",
                  date: "2 days ago",
                  engagement: "High",
                  content:
                    "I've been experimenting with different content formats on LinkedIn for the past 3 months. Here's what I've learned...",
                },
                {
                  title: "5 Lessons From My First Year as a Founder",
                  date: "1 week ago",
                  engagement: "Medium",
                  content:
                    "One year ago, I took the leap and started my own business. Here are 5 critical lessons I've learned along the way...",
                },
                {
                  title: "The Future of AI in Marketing",
                  date: "2 weeks ago",
                  engagement: "High",
                  content:
                    "AI is transforming how we approach marketing. Here are the trends I'm seeing and how you can prepare...",
                },
                {
                  title: "Why Most LinkedIn Posts Fail",
                  date: "3 weeks ago",
                  engagement: "Low",
                  content:
                    "After analyzing hundreds of LinkedIn posts, I've identified the key reasons why most content underperforms...",
                },
                {
                  title: "My Journey From Employee to Entrepreneur",
                  date: "1 month ago",
                  engagement: "Medium",
                  content:
                    "Three years ago, I was working a 9-5 job. Today, I run my own successful business. Here's how it happened...",
                },
                {
                  title: "The One Productivity Hack That Changed Everything",
                  date: "1 month ago",
                  engagement: "High",
                  content:
                    "I tried dozens of productivity systems until I found the one that actually works for me...",
                },
              ].map((post, i) => (
                <motion.div key={i} variants={item}>
                  <RecentPostCard
                    title={post.title}
                    date={post.date}
                    engagement={post.engagement}
                    content={post.content}
                  />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              variants={container}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0 }}
            >
              {[
                {
                  title: "The AIDA Formula",
                  category: "Copywriting",
                  description:
                    "Grab attention, build interest, create desire, and prompt action with this classic formula",
                },
                {
                  title: "The PAS Framework",
                  category: "Problem Solving",
                  description: "Present the problem, agitate it, then offer your solution",
                },
                {
                  title: "Personal Story Arc",
                  category: "Storytelling",
                  description: "Share your journey with a compelling beginning, middle, and end",
                },
                {
                  title: "Expert Roundup",
                  category: "Thought Leadership",
                  description: "Compile insights from industry experts on a specific topic",
                },
                {
                  title: "How-To Guide",
                  category: "Educational",
                  description: "Break down a process into clear, actionable steps",
                },
                {
                  title: "Data-Driven Insights",
                  category: "Analytics",
                  description: "Share surprising statistics and what they mean for your industry",
                },
                {
                  title: "Contrarian View",
                  category: "Thought Leadership",
                  description: "Challenge conventional wisdom with a well-reasoned alternative perspective",
                },
                {
                  title: "Before & After",
                  category: "Case Study",
                  description: "Showcase transformation with clear before and after results",
                },
                {
                  title: "Listicle Format",
                  category: "Quick Tips",
                  description: "Present information in an easy-to-scan numbered list format",
                },
              ].map((template, i) => (
                <motion.div key={i} variants={item}>
                  <PostTemplateCard
                    title={template.title}
                    category={template.category}
                    description={template.description}
                  />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="scheduled" className="space-y-4">
            <motion.div
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              variants={container}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0 }}
            >
              {[
                {
                  title: "7 LinkedIn Growth Strategies for 2025",
                  date: "Scheduled for tomorrow, 9:00 AM",
                  engagement: "Scheduled",
                  content:
                    "After testing dozens of approaches, I've identified 7 strategies that are working exceptionally well right now...",
                },
                {
                  title: "Why I'm Changing My Content Strategy",
                  date: "Scheduled for Friday, 10:30 AM",
                  engagement: "Scheduled",
                  content:
                    "For the past year, I've been creating content that follows the conventional wisdom. But now I'm making a big change...",
                },
                {
                  title: "The Truth About Personal Branding",
                  date: "Scheduled for next Monday, 8:00 AM",
                  engagement: "Scheduled",
                  content:
                    "Everyone talks about personal branding, but few people understand what it really means. Here's my perspective...",
                },
              ].map((post, i) => (
                <motion.div key={i} variants={item}>
                  <RecentPostCard
                    title={post.title}
                    date={post.date}
                    engagement={post.engagement}
                    content={post.content}
                  />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </DashboardShell>
  )
}

