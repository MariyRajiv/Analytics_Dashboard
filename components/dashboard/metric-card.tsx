"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Users, BarChart3 } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string
  change: number
  trend: 'up' | 'down'
  icon: string
  index: number
}

const iconMap = {
  DollarSign,
  Users,
  TrendingUp,
  BarChart3
}

export function MetricCard({ title, value, change, trend, icon, index }: MetricCardProps) {
  const IconComponent = iconMap[icon as keyof typeof iconMap] || BarChart3
  const isPositive = trend === 'up'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="group"
    >
      <Card className="relative overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 hover:shadow-xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className={cn(
            "p-2 rounded-lg transition-colors duration-200",
            "bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
            "group-hover:bg-blue-500/20 group-hover:scale-110"
          )}>
            <IconComponent className="h-4 w-4 transition-transform duration-200" />
          </div>
        </CardHeader>
        
        <CardContent className="relative z-10">
          <div className="text-2xl font-bold tracking-tight">
            {value}
          </div>
          <div className="flex items-center space-x-1 text-xs">
            {isPositive ? (
              <TrendingUp className="h-3 w-3 text-green-500" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-500" />
            )}
            <span className={cn(
              "font-medium",
              isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            )}>
              {isPositive ? '+' : ''}{change}%
            </span>
            <span className="text-muted-foreground">from last month</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}