"use client"

import { motion } from "framer-motion"
import { Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "./theme-toggle"
import { SearchDropdown } from "./search-dropdown"
import { NotificationDropdown } from "./notification-dropdown"

interface HeaderProps {
  onNavigate?: (pageId: string) => void;
}

export function Header({ onNavigate }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
    >
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-2 lg:gap-4 flex-1 min-w-0">
          <h1 className="text-lg lg:text-xl font-semibold truncate">Analytics Dashboard</h1>
          <div className="ml-auto mr-2 lg:mr-4 flex-shrink-0">
            <SearchDropdown 
              onNavigate={onNavigate}
              onResultClick={(result) => {
                console.log('Search result clicked:', result)
              }}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
          <ThemeToggle />
          
          <NotificationDropdown />
          
          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-border/50">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/api/placeholder/32/32" alt="User" />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="hidden lg:block">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  )
}