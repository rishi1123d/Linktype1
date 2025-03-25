"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { LayoutDashboard, FileText, Calendar, Settings, BarChart, Users, Sparkles, BookOpen, Bell } from "lucide-react"

export function DashboardNav() {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "My Posts",
      href: "/dashboard/posts",
      icon: FileText,
    },
    {
      title: "Templates",
      href: "/dashboard/templates",
      icon: BookOpen,
    },
    {
      title: "AI Assistant",
      href: "/dashboard/ai-assistant",
      icon: Sparkles,
      new: true,
    },
    {
      title: "Calendar",
      href: "/dashboard/calendar",
      icon: Calendar,
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart,
    },
    {
      title: "Team",
      href: "/dashboard/team",
      icon: Users,
    },
    {
      title: "Notifications",
      href: "/dashboard/notifications",
      icon: Bell,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <nav className="grid items-start gap-2 py-4">
      {navItems.map((item, index) => {
        const Icon = item.icon
        const isActive = pathname === item.href

        return (
          <Link key={index} href={item.href} className="relative">
            {isActive && (
              <motion.div
                layoutId="activeNav"
                className="absolute inset-0 bg-[#0077B5]/10 rounded-md z-0"
                transition={{ duration: 0.2 }}
              />
            )}
            <div
              className={cn(
                "relative z-10 flex items-center py-2 px-3 rounded-md transition-colors",
                isActive ? "text-[#0077B5] font-medium" : "text-gray-700 hover:text-[#0077B5] hover:bg-[#0077B5]/5",
              )}
            >
              <Icon className="mr-2 h-4 w-4" />
              <span>{item.title}</span>
              {item.new && (
                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-[#0077B5] text-[10px] font-medium text-white">
                  New
                </span>
              )}
            </div>
          </Link>
        )
      })}
    </nav>
  )
}

