"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FiBarChart2, FiUserCheck, FiActivity, FiCalendar } from "react-icons/fi"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { FaLinkedin } from "react-icons/fa"
import { ExternalLink, RefreshCw } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import Image from "next/image"

interface LinkedInStats {
  followers: number;
  connections: number;
  profileViews: number;
  postImpressions: number;
}

interface LinkedInPost {
  id: string;
  content: string;
  likes: number;
  comments: number;
  date: string;
}

interface LinkedInProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  pictureUrl?: string;
}

interface LinkedInData {
  profile: LinkedInProfile;
  stats: LinkedInStats;
  recentPosts: LinkedInPost[];
}

export function LinkedInIntegration() {
  const { data: session } = useSession()
  const [isLinkedInAccount, setIsLinkedInAccount] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<LinkedInData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchLinkedInData = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/linkedin/profile')
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch LinkedIn data')
      }
      
      const linkedInData = await response.json()
      setData(linkedInData)
      setIsLinkedInAccount(true)
    } catch (err) {
      console.error('Error fetching LinkedIn data:', err)
      setError(err instanceof Error ? err.message : 'Unknown error occurred')
      setIsLinkedInAccount(false)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (session) {
      fetchLinkedInData()
    } else {
      setIsLoading(false)
      setIsLinkedInAccount(false)
    }
  }, [session])

  const handleRefresh = () => {
    fetchLinkedInData()
    toast.success('LinkedIn data refreshed')
  }

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaLinkedin className="text-[#0A66C2]" /> 
            <Skeleton className="h-6 w-1/3" />
          </CardTitle>
          <CardDescription><Skeleton className="h-4 w-1/2" /></CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[200px] w-full" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaLinkedin className="text-[#0A66C2]" /> 
            LinkedIn Integration Error
          </CardTitle>
          <CardDescription>There was a problem connecting to LinkedIn</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <p className="text-center text-sm text-red-500 mb-4">
            {error}
          </p>
          <Button 
            className="bg-[#0A66C2] hover:bg-[#004182] text-white"
            onClick={fetchLinkedInData}
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (!isLinkedInAccount || !session) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FaLinkedin className="text-[#0A66C2]" /> 
            LinkedIn Integration
          </CardTitle>
          <CardDescription>Connect your LinkedIn account to view your stats and activity</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <FaLinkedin className="text-[#0A66C2] h-16 w-16 mb-4" />
          <p className="text-center text-sm text-gray-500 mb-4">
            Sign in with your LinkedIn account to view your professional stats, recent posts, and activity
          </p>
          <Button 
            className="bg-[#0A66C2] hover:bg-[#004182] text-white"
            onClick={() => window.location.href = '/api/auth/signin/linkedin'}
          >
            Connect LinkedIn Account
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full relative overflow-hidden border border-gray-200 flex-shrink-0">
            {data?.profile.pictureUrl ? (
              <Image
                src={data.profile.pictureUrl}
                alt={`${data.profile.firstName} profile`}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#0A66C2] flex items-center justify-center text-white font-medium">
                {data?.profile.firstName?.[0] || ''}
                {data?.profile.lastName?.[0] || ''}
              </div>
            )}
          </div>
          <div>
            <CardTitle className="flex items-center gap-2">
              <FaLinkedin className="text-[#0A66C2]" /> 
              LinkedIn Dashboard for {data?.profile.firstName} {data?.profile.lastName}
            </CardTitle>
            <CardDescription>View your LinkedIn stats and activity</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="stats">
          <TabsList className="mb-4">
            <TabsTrigger value="stats" className="flex items-center gap-1">
              <FiBarChart2 /> Stats
            </TabsTrigger>
            <TabsTrigger value="posts" className="flex items-center gap-1">
              <FiActivity /> Recent Posts
            </TabsTrigger>
            <TabsTrigger value="network" className="flex items-center gap-1">
              <FiUserCheck /> Network
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="stats">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border">
                <div className="text-sm text-gray-500">Profile Views</div>
                <div className="text-2xl font-bold">{data?.stats.profileViews}</div>
                <div className="text-xs text-green-500">+12% from last week</div>
              </div>
              <div className="bg-white rounded-lg p-4 border">
                <div className="text-sm text-gray-500">Post Impressions</div>
                <div className="text-2xl font-bold">{data?.stats.postImpressions}</div>
                <div className="text-xs text-green-500">+8% from last week</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="posts">
            <div className="space-y-4">
              {data?.recentPosts.map(post => (
                <div key={post.id} className="bg-white rounded-lg p-4 border">
                  <p className="text-sm text-gray-700 mb-2">{post.content}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-4">
                      <span>{post.likes} likes</span>
                      <span>{post.comments} comments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCalendar className="h-3 w-3" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="network">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4 border">
                <div className="text-sm text-gray-500">Connections</div>
                <div className="text-2xl font-bold">{data?.stats.connections}</div>
                <div className="text-xs text-green-500">+5 new this week</div>
              </div>
              <div className="bg-white rounded-lg p-4 border">
                <div className="text-sm text-gray-500">Followers</div>
                <div className="text-2xl font-bold">{data?.stats.followers}</div>
                <div className="text-xs text-green-500">+15 new this week</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          className="flex items-center gap-1"
        >
          <RefreshCw className="h-3 w-3" /> Refresh Data
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href="https://linkedin.com/in/me" target="_blank" className="flex items-center gap-1">
            Open LinkedIn <ExternalLink className="h-3 w-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
} 