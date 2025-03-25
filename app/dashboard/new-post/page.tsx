"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { motion } from "framer-motion"
import { Sparkles, Check, Clock, Save, Send, Wand2 } from "lucide-react"

export default function NewPostPage() {
  const [postContent, setPostContent] = useState("")
  const [postTitle, setPostTitle] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("templates")
  const [isLoaded, setIsLoaded] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleTemplateSelect = (templateName: string) => {
    setSelectedTemplate(templateName)
    // In a real app, we would load the template content here
    if (templateName === "The AIDA Formula") {
      setPostContent(
        "Attention: [Grab attention with a bold statement or question]\n\nInterest: [Build interest by explaining why this matters]\n\nDesire: [Create desire by showing benefits or possibilities]\n\nAction: [Prompt a specific action you want readers to take]",
      )
    } else if (templateName === "The PAS Framework") {
      setPostContent(
        "Problem: [Identify a specific problem your audience faces]\n\nAgitation: [Elaborate on why this problem is frustrating or harmful]\n\nSolution: [Present your solution and how it addresses the problem]",
      )
    }
  }

  const handleAIGenerate = () => {
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setPostContent(
        "Data-driven decision making has transformed how we approach marketing in 2025.\n\nGone are the days of relying on gut instinct alone. Today's most successful marketers are those who blend creativity with analytical rigor.\n\nIn my experience leading marketing at [Company], we've seen a 247% increase in conversion rates by implementing these three data-driven strategies:\n\n1. Customer journey mapping with behavioral analytics\n2. Predictive modeling for content personalization\n3. Real-time optimization based on engagement metrics\n\nThe results speak for themselves: higher ROI, more efficient spending, and stronger customer relationships.\n\nWhat data-driven approaches have transformed your marketing strategy? Share your experiences below! #MarketingStrategy #DataDrivenDecisions",
      )
      setIsGenerating(false)
    }, 3000)
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
        <DashboardHeader heading="Create New Post" text="Craft an engaging LinkedIn post">
          <div className="flex space-x-2">
            <Button variant="outline" className="gap-1">
              <Save className="h-4 w-4" />
              Save Draft
            </Button>
            <Button className="bg-[#0077B5] hover:bg-[#0073b1] gap-1">
              <Send className="h-4 w-4" />
              Publish
            </Button>
          </div>
        </DashboardHeader>
      </motion.div>

      <motion.div
        className="grid gap-6 md:grid-cols-7 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="md:col-span-4 space-y-6">
          <Card className="border-0 shadow-lg overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-[#0077B5] to-[#00a0dc]"></div>
            <CardContent className="p-6">
              <motion.div
                className="space-y-6"
                variants={container}
                initial="hidden"
                animate={isLoaded ? "show" : "hidden"}
              >
                <motion.div className="space-y-2" variants={item}>
                  <Label htmlFor="post-title" className="text-gray-700">
                    Post Title (for your reference only)
                  </Label>
                  <Input
                    id="post-title"
                    placeholder="E.g., 'My thoughts on industry trends'"
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    className="border-gray-300 focus:border-[#0077B5] focus:ring-[#0077B5]"
                  />
                </motion.div>

                <motion.div className="space-y-2" variants={item}>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="post-content" className="text-gray-700">
                      Post Content
                    </Label>
                    <div className="text-xs text-gray-500">{postContent.length} / 3000 characters</div>
                  </div>
                  <Textarea
                    id="post-content"
                    placeholder="Write your LinkedIn post here..."
                    className="min-h-[300px] border-gray-300 focus:border-[#0077B5] focus:ring-[#0077B5]"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                  />
                </motion.div>

                <motion.div className="space-y-4" variants={item}>
                  <Label className="text-gray-700">Post Settings</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="post-category" className="text-sm text-gray-600">
                        Category
                      </Label>
                      <Select>
                        <SelectTrigger id="post-category" className="border-gray-300">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="thought-leadership">Thought Leadership</SelectItem>
                          <SelectItem value="case-study">Case Study</SelectItem>
                          <SelectItem value="how-to">How-To Guide</SelectItem>
                          <SelectItem value="industry-news">Industry News</SelectItem>
                          <SelectItem value="personal-story">Personal Story</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="post-schedule" className="text-sm text-gray-600">
                        Schedule
                      </Label>
                      <Select>
                        <SelectTrigger id="post-schedule" className="border-gray-300">
                          <SelectValue placeholder="Publish now" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="now">Publish now</SelectItem>
                          <SelectItem value="later">Schedule for later</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-2 p-3 bg-[#0077B5]/5 rounded-lg border border-[#0077B5]/10"
                  variants={item}
                >
                  <Sparkles className="h-5 w-5 text-[#0077B5]" />
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Pro tip:</span> Posts with a clear call-to-action at the end typically
                    receive 2.3x more engagement.
                  </p>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3 space-y-6">
          <Card className="border-0 shadow-lg overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-[#0077B5] to-[#00a0dc]"></div>
            <CardContent className="p-6">
              <Tabs defaultValue="templates" onValueChange={setActiveTab}>
                <TabsList className="bg-gray-100 p-1 w-full">
                  <TabsTrigger
                    value="templates"
                    className={`transition-all ${activeTab === "templates" ? "bg-white text-[#0077B5]" : "text-gray-600"}`}
                  >
                    Templates
                  </TabsTrigger>
                  <TabsTrigger
                    value="ai-assist"
                    className={`transition-all ${activeTab === "ai-assist" ? "bg-white text-[#0077B5]" : "text-gray-600"}`}
                  >
                    AI Assist
                  </TabsTrigger>
                  <TabsTrigger
                    value="preview"
                    className={`transition-all ${activeTab === "preview" ? "bg-white text-[#0077B5]" : "text-gray-600"}`}
                  >
                    Preview
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="templates">
                  <motion.div
                    className="space-y-4 mt-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-2">
                      <Label htmlFor="template-search" className="text-gray-700">
                        Search Templates
                      </Label>
                      <Input
                        id="template-search"
                        placeholder="Search by keyword or category..."
                        className="border-gray-300 focus:border-[#0077B5] focus:ring-[#0077B5]"
                      />
                    </div>

                    <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                      <div className="grid gap-3">
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
                        ].map((template, index) => (
                          <motion.div
                            key={index}
                            className={`p-4 border rounded-lg cursor-pointer hover:shadow-md transition-all ${selectedTemplate === template.title ? "border-[#0077B5] bg-[#0077B5]/5" : "border-gray-200"}`}
                            onClick={() => handleTemplateSelect(template.title)}
                            whileHover={{ y: -2 }}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-gray-900">{template.title}</h3>
                                <p className="text-xs text-[#0077B5] mt-1">{template.category}</p>
                              </div>
                              {selectedTemplate === template.title && (
                                <div className="bg-[#0077B5] text-white p-1 rounded-full">
                                  <Check className="h-4 w-4" />
                                </div>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-2">{template.description}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="ai-assist">
                  <motion.div
                    className="space-y-6 mt-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-gray-700">What would you like to write about?</Label>
                        <Textarea
                          placeholder="E.g., 'The importance of data-driven decision making in modern marketing strategies'"
                          className="h-24 border-gray-300 focus:border-[#0077B5] focus:ring-[#0077B5]"
                          defaultValue="The importance of data-driven decision making in modern marketing strategies"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-gray-700">Tone</Label>
                          <Select defaultValue="professional">
                            <SelectTrigger className="border-gray-300">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="professional">Professional</SelectItem>
                              <SelectItem value="conversational">Conversational</SelectItem>
                              <SelectItem value="authoritative">Authoritative</SelectItem>
                              <SelectItem value="inspirational">Inspirational</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label className="text-gray-700">Length</Label>
                          <Select defaultValue="medium">
                            <SelectTrigger className="border-gray-300">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="short">Short (1-2 paragraphs)</SelectItem>
                              <SelectItem value="medium">Medium (3-4 paragraphs)</SelectItem>
                              <SelectItem value="long">Long (5+ paragraphs)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Button
                        className="w-full bg-[#0077B5] hover:bg-[#0073b1] gap-2"
                        onClick={handleAIGenerate}
                        disabled={isGenerating}
                      >
                        {isGenerating ? (
                          <>
                            <svg
                              className="animate-spin h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Generating...
                          </>
                        ) : (
                          <>
                            <Wand2 className="h-4 w-4" />
                            Generate Post
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-700">AI Writing Assistant</Label>
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left border-gray-300 hover:bg-[#0077B5]/5 hover:border-[#0077B5]/30 hover:text-[#0077B5]"
                        >
                          ✨ Improve readability
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left border-gray-300 hover:bg-[#0077B5]/5 hover:border-[#0077B5]/30 hover:text-[#0077B5]"
                        >
                          🔍 Check for grammar issues
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left border-gray-300 hover:bg-[#0077B5]/5 hover:border-[#0077B5]/30 hover:text-[#0077B5]"
                        >
                          💡 Generate hook ideas
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left border-gray-300 hover:bg-[#0077B5]/5 hover:border-[#0077B5]/30 hover:text-[#0077B5]"
                        >
                          📊 Add relevant statistics
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left border-gray-300 hover:bg-[#0077B5]/5 hover:border-[#0077B5]/30 hover:text-[#0077B5]"
                        >
                          🔄 Rewrite in a different tone
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="preview">
                  <motion.div
                    className="space-y-4 mt-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="border rounded-lg p-6 space-y-4 bg-white shadow-sm">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-[#0077B5] flex items-center justify-center text-white font-bold">
                          JD
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">John Doe</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <span>Marketing Director</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Just now
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="whitespace-pre-wrap text-gray-800">
                        {postContent || "Your post preview will appear here..."}
                      </div>

                      <div className="pt-4 border-t flex space-x-6 text-sm text-gray-500">
                        <div className="flex items-center cursor-pointer hover:text-[#0077B5] transition-colors">
                          <svg
                            className="h-5 w-5 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 23h-4.017a2 2 0 01-1.789-1.106l-3.5-7A2 2 0 017.247 10H12"
                            ></path>
                          </svg>
                          Like
                        </div>
                        <div className="flex items-center cursor-pointer hover:text-[#0077B5] transition-colors">
                          <svg
                            className="h-5 w-5 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                            ></path>
                          </svg>
                          Comment
                        </div>
                        <div className="flex items-center cursor-pointer hover:text-[#0077B5] transition-colors">
                          <svg
                            className="h-5 w-5 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            ></path>
                          </svg>
                          Repost
                        </div>
                        <div className="flex items-center cursor-pointer hover:text-[#0077B5] transition-colors">
                          <svg
                            className="h-5 w-5 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                            ></path>
                          </svg>
                          Send
                        </div>
                      </div>
                    </div>

                    <div className="text-sm text-gray-500 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="flex items-center gap-2">
                        <svg
                          className="h-5 w-5 text-[#0077B5]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        This is how your post will appear on LinkedIn. Make any necessary adjustments before
                        publishing.
                      </p>
                    </div>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </DashboardShell>
  )
}

