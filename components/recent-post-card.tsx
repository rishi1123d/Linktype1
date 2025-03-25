"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { BarChart2, Edit } from "lucide-react"

interface RecentPostCardProps {
  title: string
  date: string
  engagement: string
  content: string
}

export function RecentPostCard({ title, date, engagement, content }: RecentPostCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const getBadgeVariant = () => {
    switch (engagement) {
      case "High":
        return "success"
      case "Medium":
        return "warning"
      case "Low":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getBadgeColor = () => {
    switch (engagement) {
      case "High":
        return "bg-green-500"
      case "Medium":
        return "bg-yellow-500"
      case "Low":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow h-full flex flex-col">
        <CardContent className="p-0 flex-1">
          <div className={`h-1.5 ${getBadgeColor()}`}></div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
              <Badge variant={getBadgeVariant() as any} className="ml-2">
                {engagement}
              </Badge>
            </div>
            <p className="text-xs text-gray-500 mb-3">{date}</p>
            <p className="text-sm text-gray-600 line-clamp-3">{content}</p>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-[#0077B5] hover:bg-[#0077B5]/5 gap-1">
            <BarChart2 className="h-4 w-4" />
            View Stats
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-300 text-gray-700 hover:text-[#0077B5] hover:border-[#0077B5] gap-1"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        </CardFooter>

        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-[#0077B5]/10 to-transparent opacity-0 pointer-events-none"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </Card>
    </motion.div>
  )
}

