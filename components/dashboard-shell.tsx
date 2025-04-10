"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { UserAuthButton } from "@/components/user-auth-button"
import { Menu, PenLine, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${isScrolled ? "bg-white shadow-sm" : "bg-white"}`}
      >
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[280px] p-0">
                <div className="flex h-16 items-center border-b px-4">
                  <div className="flex items-center gap-2">
                    <div className="rounded-md bg-gradient-to-r from-[#0A66C2] to-[#00a0dc] p-1.5 shadow-md">
                      <Link2 className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-[#0A66C2] to-[#00a0dc] bg-clip-text text-transparent">
                      LinkType
                    </span>
                  </div>
                </div>
                <DashboardNav />
              </SheetContent>
            </Sheet>
            <div className="flex items-center ml-6 md:ml-10">
              <div className="rounded-md bg-gradient-to-r from-[#0A66C2] to-[#00a0dc] p-2 shadow-md mr-3 transform hover:rotate-3 transition-transform">
                <Link2 className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#0A66C2] to-[#00a0dc] bg-clip-text text-transparent tracking-tight">
                LinkType
              </span>
            </div>
          </div>
          <UserAuthButton />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr] py-6">
        <aside className="hidden w-[200px] flex-col md:flex">
          <DashboardNav />
        </aside>
        <main className="flex w-full flex-1 flex-col">{children}</main>
      </div>
    </div>
  )
}

