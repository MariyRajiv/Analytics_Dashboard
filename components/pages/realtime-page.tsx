"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Activity, Users, Eye, MousePointer, Globe, Zap, TrendingUp, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ExportButton } from '@/components/ui/export-button'

const liveMetrics = {
  activeUsers: 2847,
  pageViews: 8456,
  sessionsToday: 1892,
  conversionRate: 4.7,
  topPages: [
    { page: '/live-demo', users: 534, percentage: 28.8 },
    { page: '/special-offer', users: 389, percentage: 21.2 },
    { page: '/new-features', users: 256, percentage: 16.5 },
    { page: '/webinar', users: 184, percentage: 12.7 },
    { page: '/support', users: 128, percentage: 8.9 }
  ],
  recentEvents: [
    { type: 'conversion', user: 'User #2847', action: 'Premium subscription', time: '3 seconds ago', value: '$99' },
    { type: 'signup', user: 'User #2846', action: 'Newsletter signup', time: '12 seconds ago', value: null },
    { type: 'pageview', user: 'User #2845', action: 'Viewed live demo', time: '18 seconds ago', value: null },
    { type: 'conversion', user: 'User #2844', action: 'Downloaded whitepaper', time: '32 seconds ago', value: '$0' },
    { type: 'pageview', user: 'User #2843', action: 'Viewed special offer', time: '47 seconds ago', value: null }
  ],
  trafficSources: [
    { source: 'Organic Search', users: 1139, percentage: 40.0 },
    { source: 'Social Media', users: 854, percentage: 30.0 },
    { source: 'Direct Traffic', users: 569, percentage: 20.0 },
    { source: 'Email Campaign', users: 171, percentage: 6.0 },
    { source: 'Paid Ads', users: 114, percentage: 4.0 }
  ]
}

export function RealtimePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [metrics, setMetrics] = useState({
    ...liveMetrics,
    recentEvents: [...liveMetrics.recentEvents]
  })
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      const interval = setInterval(() => {
        setMetrics(prev => ({
          ...prev,
          activeUsers: Math.max(2000, prev.activeUsers + Math.floor(Math.random() * 20 - 10)),
          pageViews: prev.pageViews + Math.floor(Math.random() * 30 + 10),
          sessionsToday: prev.sessionsToday + Math.floor(Math.random() * 8 + 2),
          conversionRate: Math.max(3.0, Math.min(6.0, prev.conversionRate + (Math.random() * 0.4 - 0.2)))
        }))
        setLastUpdate(new Date())
        
        // Update recent events with new activity
        setMetrics(prev => ({
          ...prev,
          recentEvents: [
            {
              type: Math.random() > 0.7 ? 'conversion' : Math.random() > 0.5 ? 'signup' : 'pageview',
              user: `User #${Math.floor(Math.random() * 1000) + 2800}`,
              action: Math.random() > 0.6 ? 'Premium subscription' : Math.random() > 0.4 ? 'Newsletter signup' : 'Viewed product page',
              time: 'Just now',
              value: Math.random() > 0.7 ? `$${Math.floor(Math.random() * 200) + 50}` : null
            },
            ...prev.recentEvents.slice(0, 4)
          ]
        }))
      }, 5000) // Update every 5 seconds

      return () => clearInterval(interval)
    }
  }, [isLoading])

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'conversion': return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'signup': return <Users className="h-4 w-4 text-blue-600" />
      case 'pageview': return <Eye className="h-4 w-4 text-purple-600" />
      default: return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case 'conversion': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
      case 'signup': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
      case 'pageview': return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-96 bg-gray-200 rounded"></div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Real-time Analytics
          </h1>
          <p className="text-muted-foreground mt-2">
            Live monitoring of user activity and website performance
          </p>
        </div>
        <div className="flex items-center gap-4">
          <ExportButton
            data={[{
              'Active Users': metrics.activeUsers,
              'Page Views Today': metrics.pageViews,
              'Sessions Today': metrics.sessionsToday,
              'Conversion Rate': `${metrics.conversionRate.toFixed(1)}%`,
              'Timestamp': new Date().toISOString()
            }]}
            filename="realtime-snapshot"
            showCSV={true}
            showPDF={false}
          />
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Live Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { 
            title: 'Active Users', 
            value: metrics.activeUsers.toLocaleString(), 
            icon: Users, 
            change: 'Live',
            color: 'text-green-600'
          },
          { 
            title: 'Page Views Today', 
            value: metrics.pageViews.toLocaleString(), 
            icon: Eye, 
            change: 'Live',
            color: 'text-blue-600'
          },
          { 
            title: 'Sessions Today', 
            value: metrics.sessionsToday.toLocaleString(), 
            icon: MousePointer, 
            change: 'Live',
            color: 'text-purple-600'
          },
          { 
            title: 'Conversion Rate', 
            value: `${metrics.conversionRate.toFixed(1)}%`, 
            icon: TrendingUp, 
            change: 'Live',
            color: 'text-orange-600'
          }
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600 font-medium">{metric.change}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Real-time Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Events */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Live Activity Feed
                </CardTitle>
                <CardDescription>Real-time user actions and events</CardDescription>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {metrics.recentEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                >
                  <div className="mt-0.5">
                    {getEventIcon(event.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{event.user}</span>
                      <Badge className={getEventColor(event.type)}>
                        {event.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.action}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">{event.time}</span>
                      {event.value && (
                        <span className="text-xs font-medium text-green-600">{event.value}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Pages */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Active Pages
            </CardTitle>
            <CardDescription>Most visited pages right now</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {metrics.topPages.map((page, index) => (
                <motion.div
                  key={page.page}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{page.page}</span>
                      <span className="text-sm text-muted-foreground">
                        {page.users} users
                      </span>
                    </div>
                    <Progress value={page.percentage} className="h-2" />
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Traffic Sources */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Live Traffic Sources
          </CardTitle>
          <CardDescription>Where your current visitors are coming from</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {metrics.trafficSources.map((source, index) => (
              <motion.div
                key={source.source}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="text-center p-4 bg-muted/50 rounded-lg"
              >
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {source.users}
                </div>
                <div className="text-sm font-medium mb-2">{source.source}</div>
                <div className="text-xs text-muted-foreground">
                  {source.percentage}% of traffic
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card className="border-0 shadow-lg border-l-4 border-l-yellow-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-600">
            <AlertCircle className="h-5 w-5" />
            Real-time Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <div>
                <p className="text-sm font-medium">High Traffic Alert</p>
                <p className="text-xs text-muted-foreground">
                  Current active users (1,247) are 23% above normal levels
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <div>
                <p className="text-sm font-medium">Conversion Spike</p>
                <p className="text-xs text-muted-foreground">
                  Conversion rate increased by 15% in the last hour
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}