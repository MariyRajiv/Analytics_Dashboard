"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Target, DollarSign, Calendar, Filter, Download } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { ExportButton } from '@/components/ui/export-button'
import { generateAnalyticsReport } from '@/lib/export-utils'

const analyticsData = [
  { month: 'Jan', sessions: 45600, pageviews: 125400, bounceRate: 28, avgDuration: 185 },
  { month: 'Feb', sessions: 52300, pageviews: 142800, bounceRate: 25, avgDuration: 198 },
  { month: 'Mar', sessions: 61200, pageviews: 168900, bounceRate: 22, avgDuration: 212 },
  { month: 'Apr', sessions: 68900, pageviews: 189200, bounceRate: 20, avgDuration: 225 },
  { month: 'May', sessions: 78400, pageviews: 215600, bounceRate: 18, avgDuration: 238 },
  { month: 'Jun', sessions: 85200, pageviews: 234800, bounceRate: 16, avgDuration: 251 }
]

const topPages = [
  { page: '/home', views: 89600, uniqueViews: 67400, avgTime: '4:32', bounceRate: '15%' },
  { page: '/services', views: 72300, uniqueViews: 58900, avgTime: '6:18', bounceRate: '12%' },
  { page: '/about', views: 54800, uniqueViews: 44100, avgTime: '3:45', bounceRate: '22%' },
  { page: '/blog/marketing-trends', views: 43400, uniqueViews: 38800, avgTime: '7:23', bounceRate: '9%' },
  { page: '/contact-us', views: 31900, uniqueViews: 28200, avgTime: '2:18', bounceRate: '28%' }
]

const conversionFunnels = [
  { stage: 'Website Visitors', count: 234800, percentage: 100, color: '#3B82F6' },
  { stage: 'Product Views', count: 164360, percentage: 70, color: '#8B5CF6' },
  { stage: 'Add to Cart', count: 70440, percentage: 30, color: '#10B981' },
  { stage: 'Checkout Started', count: 35220, percentage: 15, color: '#F59E0B' },
  { stage: 'Purchase Complete', count: 11792, percentage: 5, color: '#EF4444' }
]

export function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('6months')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

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
      id="analytics-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Advanced Analytics
          </h1>
          <p className="text-muted-foreground mt-2">
            Deep dive into your website performance and user behavior
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="3months">Last 3 months</SelectItem>
              <SelectItem value="6months">Last 6 months</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <ExportButton
              data={[generateAnalyticsReport()]}
              elementId="analytics-content"
              filename="analytics-report"
              showPDF={true}
              showCSV={true}
              variant="outline"
            />
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Sessions', value: '234.8K', change: '+18.7%', icon: Users, color: 'blue' },
          { title: 'Page Views', value: '687.2K', change: '+22.4%', icon: TrendingUp, color: 'green' },
          { title: 'Avg. Session Duration', value: '5:47', change: '+28.3%', icon: Target, color: 'purple' },
          { title: 'Bounce Rate', value: '18.6%', change: '-12.8%', icon: DollarSign, color: 'orange' }
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
                <metric.icon className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <Badge variant="secondary" className="text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300">
                  {metric.change}
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sessions Trend */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Sessions & Page Views Trend</CardTitle>
            <CardDescription>Monthly website traffic analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="sessions" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                <Area type="monotone" dataKey="pageviews" stackId="2" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>User journey from visitor to customer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conversionFunnels.map((stage, index) => (
                <div key={stage.stage} className="flex items-center gap-4">
                  <div className="w-24 text-sm font-medium">{stage.stage}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground">{stage.count.toLocaleString()}</span>
                      <span className="text-sm font-medium">{stage.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${stage.percentage}%`,
                          backgroundColor: stage.color
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Pages Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Top Performing Pages</CardTitle>
          <CardDescription>Most visited pages and their performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Page</th>
                  <th className="text-right py-3 px-4 font-medium">Views</th>
                  <th className="text-right py-3 px-4 font-medium">Unique Views</th>
                  <th className="text-right py-3 px-4 font-medium">Avg. Time</th>
                  <th className="text-right py-3 px-4 font-medium">Bounce Rate</th>
                </tr>
              </thead>
              <tbody>
                {topPages.map((page, index) => (
                  <motion.tr
                    key={page.page}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border-b hover:bg-muted/50"
                  >
                    <td className="py-3 px-4 font-medium">{page.page}</td>
                    <td className="py-3 px-4 text-right">{page.views.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">{page.uniqueViews.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right">{page.avgTime}</td>
                    <td className="py-3 px-4 text-right">
                      <Badge variant={parseFloat(page.bounceRate) < 20 ? 'default' : 'secondary'}>
                        {page.bounceRate}
                      </Badge>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}