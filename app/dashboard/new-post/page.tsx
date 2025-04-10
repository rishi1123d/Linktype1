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
import Image from "next/image"
import { useSession } from "next-auth/react"

export default function NewPostPage() {
  const [postContent, setPostContent] = useState("")
  const [postTitle, setPostTitle] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [activeTab, setActiveTab] = useState("templates")
  const [isLoading, setIsLoading] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [aiTopic, setAiTopic] = useState("The importance of data-driven decision making in modern marketing strategies")
  const [aiTone, setAiTone] = useState("professional")
  const [aiLength, setAiLength] = useState("medium")
  const [error, setError] = useState<string | null>(null)
  const [profileImageUrl, setProfileImageUrl] = useState("/mr-beast-profile.jpg")
  const { data: session } = useSession()

  useEffect(() => {
    setIsLoading(true)
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

  const handleAIGenerate = async () => {
    try {
      setIsGenerating(true)
      setError(null)
      
      // Enhanced prompt construction based on the user's input
      const enhancedPrompt = {
        topic: aiTopic,
        tone: aiTone,
        length: aiLength,
        instructions: `
          Create an authentic and engaging LinkedIn post about ${aiTopic}. The post should:
          1. Start with a compelling hook that captures attention
          2. Share 2-3 concrete lessons learned or insights gained 
          3. Include specific details and examples to make it authentic
          4. Mention any collaboration or teamwork aspects if relevant
          5. End with a question that encourages engagement from other professionals
          6. Include appropriate hashtags (3-5 max)
          7. Keep the tone ${aiTone} but authentic
          8. Include numbers or statistics to add credibility (if relevant)
          9. Follow a clear story arc with beginning, middle, and end
          10. Sound like it was written by a real person with genuine experience
        `
      };
      
      const response = await fetch("/api/ai/generate-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enhancedPrompt),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to generate content")
      }
      
      const data = await response.json()
      setPostContent(data.content)
    } catch (err: any) {
      console.error("Error generating content:", err)
      setError(err.message || "An error occurred while generating content")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleImproveContent = async (action: string) => {
    if (!postContent.trim()) {
      setError("Please generate or write some content first")
      return
    }
    
    try {
      setIsGenerating(true)
      setError(null)
      
      const response = await fetch("/api/ai/improve-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: postContent,
          action,
          tone: aiTone,
        }),
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to improve content")
      }
      
      const data = await response.json()
      setPostContent(data.content)
    } catch (err: any) {
      console.error("Error improving content:", err)
      setError(err.message || "An error occurred while improving content")
    } finally {
      setIsGenerating(false)
    }
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
          <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2 mt-4 sm:mt-0">
            <Button variant="outline" className="gap-1 w-full sm:w-auto">
              <Save className="h-4 w-4" />
              Save Draft
            </Button>
            <Button className="bg-[#0A66C2] hover:bg-[#0952a0] gap-1 w-full sm:w-auto">
              <Send className="h-4 w-4" />
              Publish
            </Button>
          </div>
        </DashboardHeader>
      </motion.div>

      <motion.div
        className="grid gap-6 lg:grid-cols-7 md:grid-cols-12 sm:grid-cols-1 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="lg:col-span-4 md:col-span-7 sm:col-span-12 space-y-4">
          <Card className="border-0 shadow-lg overflow-hidden h-full flex flex-col">
            <div className="h-1 bg-gradient-to-r from-[#0A66C2] to-[#0A8AE6]"></div>
            <CardContent className="p-4 sm:p-6 flex-grow">
              <motion.div
                className="space-y-4 sm:space-y-6 h-full flex flex-col"
                variants={container}
                initial="hidden"
                animate={isLoading ? "show" : "hidden"}
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
                    className="border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2] w-full"
                  />
                </motion.div>

                <motion.div className="space-y-2 flex-grow flex flex-col" variants={item}>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="post-content" className="text-gray-700">
                      Post Content
                    </Label>
                    <div className="text-xs text-gray-500">{postContent.length} / 3000 characters</div>
                  </div>
                  <Textarea
                    id="post-content"
                    placeholder="Write your LinkedIn post here..."
                    className="min-h-[200px] flex-grow border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2] h-full resize-none sm:min-h-[300px]"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                  />
                </motion.div>

                <motion.div className="space-y-4" variants={item}>
                  <Label className="text-gray-700">Post Settings</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="post-category" className="text-sm text-gray-600">
                        Category
                      </Label>
                      <Select>
                        <SelectTrigger id="post-category" className="border-gray-300 w-full">
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
                        <SelectTrigger id="post-schedule" className="border-gray-300 w-full">
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
                  className="flex items-center gap-2 p-3 bg-[#0A66C2]/5 rounded-lg border border-[#0A66C2]/10"
                  variants={item}
                >
                  <Sparkles className="h-5 w-5 text-[#0A66C2] flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Pro tip:</span> Posts with a clear call-to-action at the end typically
                    receive 2.3x more engagement.
                  </p>
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3 md:col-span-5 sm:col-span-12 space-y-4">
          <Card className="border-0 shadow-lg overflow-hidden h-full flex flex-col">
            <div className="h-1 bg-gradient-to-r from-[#0A66C2] to-[#0A8AE6]"></div>
            <CardContent className="p-4 sm:p-6 flex-grow flex flex-col">
              <Tabs defaultValue="templates" className="w-full flex-grow flex flex-col" onValueChange={setActiveTab}>
                <TabsList className="bg-gray-100 p-1 w-full grid grid-cols-3">
                  <TabsTrigger
                    value="templates"
                    className={`transition-all ${activeTab === "templates" ? "bg-white text-[#0A66C2]" : "text-gray-600"}`}
                  >
                    Templates
                  </TabsTrigger>
                  <TabsTrigger
                    value="ai-assist"
                    className={`transition-all ${activeTab === "ai-assist" ? "bg-white text-[#0A66C2]" : "text-gray-600"}`}
                  >
                    AI Assist
                  </TabsTrigger>
                  <TabsTrigger
                    value="preview"
                    className={`transition-all ${activeTab === "preview" ? "bg-white text-[#0A66C2]" : "text-gray-600"}`}
                  >
                    Preview
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="templates" className="flex-grow flex flex-col mt-0 data-[state=active]:mt-4">
                  <motion.div
                    className="space-y-4 flex-grow flex flex-col"
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
                        className="border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2] w-full"
                      />
                    </div>

                    <div className="space-y-2 overflow-y-auto flex-grow pr-1 min-h-[200px]">
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
                            className={`p-4 border rounded-lg cursor-pointer hover:shadow-md transition-all ${selectedTemplate === template.title ? "border-[#0A66C2] bg-[#0A66C2]/5" : "border-gray-200"}`}
                            onClick={() => handleTemplateSelect(template.title)}
                            whileHover={{ y: -2 }}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium text-gray-900">{template.title}</h3>
                                <p className="text-xs text-[#0A66C2] mt-1">{template.category}</p>
                              </div>
                              {selectedTemplate === template.title && (
                                <div className="bg-[#0A66C2] text-white p-1 rounded-full">
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

                <TabsContent value="ai-assist" className="flex-grow flex flex-col mt-0 data-[state=active]:mt-4">
                  <motion.div
                    className="space-y-4 flex-grow flex flex-col"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    {error && (
                      <div className="p-3 text-sm bg-red-50 border border-red-200 text-red-600 rounded-md">
                        {error}
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-gray-700">What would you like to write about?</Label>
                        <Textarea
                          placeholder="E.g., The importance of data-driven decision making in modern marketing strategies"
                          className="border-gray-300 focus:border-[#0A66C2] focus:ring-[#0A66C2] min-h-[80px] resize-none"
                          value={aiTopic}
                          onChange={(e) => setAiTopic(e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-gray-700">Tone</Label>
                          <Select value={aiTone} onValueChange={(value) => setAiTone(value as any)}>
                            <SelectTrigger className="w-full border-gray-300">
                              <SelectValue placeholder="Select tone" />
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
                          <Select value={aiLength} onValueChange={(value) => setAiLength(value as any)}>
                            <SelectTrigger className="w-full border-gray-300">
                              <SelectValue placeholder="Select length" />
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
                        className="w-full bg-[#0A66C2] hover:bg-[#0952a0] gap-2"
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
                      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-left border-gray-300 hover:bg-[#0A66C2]/5 hover:border-[#0A66C2]/30 hover:text-[#0A66C2] text-sm sm:text-base py-3"
                          onClick={() => handleImproveContent('improve-readability')}
                          disabled={isGenerating || !postContent}
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-lg">✨</span>
                            <span>Improve readability</span>
                          </span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-left border-gray-300 hover:bg-[#0A66C2]/5 hover:border-[#0A66C2]/30 hover:text-[#0A66C2] text-sm sm:text-base py-3"
                          onClick={() => handleImproveContent('check-grammar')}
                          disabled={isGenerating || !postContent}
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-lg">🔍</span>
                            <span>Check for grammar issues</span>
                          </span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-left border-gray-300 hover:bg-[#0A66C2]/5 hover:border-[#0A66C2]/30 hover:text-[#0A66C2] text-sm sm:text-base py-3"
                          onClick={() => handleImproveContent('generate-hooks')}
                          disabled={isGenerating || !postContent}
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-lg">💡</span>
                            <span>Generate hook ideas</span>
                          </span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-left border-gray-300 hover:bg-[#0A66C2]/5 hover:border-[#0A66C2]/30 hover:text-[#0A66C2] text-sm sm:text-base py-3"
                          onClick={() => handleImproveContent('add-statistics')}
                          disabled={isGenerating || !postContent}
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-lg">📊</span>
                            <span>Add relevant statistics</span>
                          </span>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-left border-gray-300 hover:bg-[#0A66C2]/5 hover:border-[#0A66C2]/30 hover:text-[#0A66C2] text-sm sm:text-base py-3"
                          onClick={() => handleImproveContent('rewrite')}
                          disabled={isGenerating || !postContent}
                        >
                          <span className="flex items-center gap-2">
                            <span className="text-lg">🔄</span>
                            <span>Rewrite in a different tone</span>
                          </span>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="preview" className="flex-grow flex flex-col mt-0 data-[state=active]:mt-4">
                  <motion.div
                    className="space-y-4 flex-grow flex flex-col overflow-auto"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="border rounded-lg p-4 sm:p-6 space-y-4 bg-white shadow-sm flex-grow">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full relative overflow-hidden flex-shrink-0 border border-gray-200">
                          <Image
                            src="/1731544051828.jpeg"
                            alt="Rishi Kanaparti profile"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Rishi Kanaparti</div>
                          <div className="text-xs sm:text-sm text-gray-500 flex items-center gap-1">
                            <span>LinkedIn Professional</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Just now
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="whitespace-pre-wrap text-gray-800 overflow-y-auto max-h-[300px] sm:max-h-[400px]">
                        {postContent || "Your post preview will appear here..."}
                      </div>

                      <div className="pt-4 border-t flex space-x-6 text-sm text-gray-500">
                        <div className="flex items-center cursor-pointer hover:text-[#0A66C2] transition-colors">
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
                        <div className="flex items-center cursor-pointer hover:text-[#0A66C2] transition-colors">
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
                        <div className="flex items-center cursor-pointer hover:text-[#0A66C2] transition-colors">
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
                        <div className="flex items-center cursor-pointer hover:text-[#0A66C2] transition-colors">
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
                          className="h-5 w-5 text-[#0A66C2]"
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

