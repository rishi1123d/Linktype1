"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Eye, Copy } from "lucide-react"

interface PostTemplateCardProps {
  title: string
  category: string
  description: string
}

export function PostTemplateCard({ title, category, description }: PostTemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-shadow h-full flex flex-col">
        <CardContent className="p-0 flex-1">
          <div className="h-1.5 bg-gradient-to-r from-[#0077B5] to-[#00a0dc]"></div>
          <div className="p-6">
            <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
            <p className="text-xs text-[#0077B5] mt-1">{category}</p>
            <p className="text-sm text-gray-600 mt-3">{description}</p>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between">
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-[#0077B5] hover:bg-[#0077B5]/5 gap-1">
            <Eye className="h-4 w-4" />
            Preview
          </Button>
          <Button size="sm" className="bg-[#0077B5] hover:bg-[#0073b1] gap-1">
            <Copy className="h-4 w-4" />
            Use
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

