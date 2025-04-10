"use client"

import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"
import { Bell, User, Settings, LogOut, CreditCard } from "lucide-react"

export function UserNav() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()
  
  // Hardcode "Rishi Kanaparti" regardless of session
  const userName = "Rishi Kanaparti"
  const userEmail = "rishi@example.com"
  const userImage = "/1731544051828.jpeg"
  const initials = "RK"

  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5 text-gray-700" />
        <span className="absolute top-1 right-1 flex h-2 w-2 items-center justify-center rounded-full bg-red-500"></span>
      </Button>

      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-9 w-9 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={userImage} alt="Rishi Kanaparti" />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        {isOpen && (
          <DropdownMenuContent className="w-56" align="end" forceMount asChild>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="font-medium text-sm">{userName}</p>
                  <p className="text-xs text-muted-foreground">{userEmail}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer flex items-center gap-2 text-red-600"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                <LogOut className="h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </motion.div>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  )
}

