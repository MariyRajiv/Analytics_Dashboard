"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Globe, Smartphone, Monitor, MapPin, Clock } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ExportButton } from '@/components/ui/export-button'

const demographicData = [
  { age: '18-24', percentage: 15, count: 18750 },
  { age: '25-34', percentage: 35, count: 43750 },
  { age: '35-44', percentage: 28, count: 35000 },
  { age: '45-54', percentage: 15, count: 18750 },
  { age: '55+', percentage: 7, count: 8750 }
]

const deviceData = [
  { device: 'Desktop', percentage: 45, color: '#3B82F6' },
  { device: 'Mobile', percentage: 42, color: '#8B5CF6' },
  { device: 'Tablet', percentage: 13, color: '#10B981' }
]

const locationData = [
  { country: 'United States', users: 45600, percentage: 36.5 },
  { country: 'United Kingdom', users: 23400, percentage: 18.7 },
  { country: 'Canada', users: 18900, percentage: 15.1 },
  { country: 'Australia', users: 12300, percentage: 9.8 },
  { country: 'Germany', users: 9800, percentage: 7.8 },
  { country: 'France', users: 7600, percentage: 6.1 },
  { country: 'Others', users: 7400, percentage: 5.9 }
]

const interestData = [
  { interest: 'Technology', score: 92 },
  { interest: 'Business', score: 87 },
  { interest: 'Marketing', score: 84 },
  { interest: 'Design', score: 79 },
  { interest: 'Finance', score: 73 },
  { interest: 'Education', score: 68 }
]

export function AudiencePage() {
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
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
      <div>
        <div className="flex items-center justify-between">
          <div>
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Audience Insights
        </h1>
        <p className="text-muted-foreground mt-2">
          Understand your audience demographics, behavior, and preferences
        </p>
          </div>
          <ExportButton
            data={[{
              'Total Users': '125,000',
              'New Users': '23,400',
              'Returning Users': '101,600',
              'User Retention': '68.4%',
              'Generated At': new Date().toISOString()
            }]}
            elementId="audience-content"
            filename="audience-insights"
            showPDF={true}
            showCSV={true}
          />
        </div>
      </div>

      {/* Overview Cards */}
      <div id="audience-content" className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Users', value: '125,000', icon: Users, change: '+12.5%' },
          { title: 'New Users', value: '23,400', icon: Globe, change: '+8.2%' },
          { title: 'Returning Users', value: '101,600', icon: Clock, change: '+15.3%' },
          { title: 'User Retention', value: '68.4%', icon: MapPin, change: '+5.7%' }
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </CardTitle>
                <metric.icon className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <Badge variant="secondary" className="text-green-600 bg-green-100">
                  {metric.change}
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Demographics and Devices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Age Demographics */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Age Demographics</CardTitle>
            <CardDescription>User distribution by age groups</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={demographicData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="age" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                <Bar dataKey="percentage" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Device Usage */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Device Usage</CardTitle>
            <CardDescription>Traffic distribution by device type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="percentage"
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  labelLine={false}
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}%`, name]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {deviceData.map((device, index) => (
                <div key={device.device} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: device.color }}
                    />
                    <span className="text-sm">{device.device}</span>
                  </div>
                  <span className="text-sm font-medium">{device.percentage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Geographic Distribution */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Geographic Distribution</CardTitle>
          <CardDescription>User locations and regional performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {locationData.map((location, index) => (
              <motion.div
                key={location.country}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3 flex-1">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{location.country}</span>
                </div>
                <div className="flex items-center gap-4 flex-1">
                  <Progress value={location.percentage} className="flex-1" />
                  <span className="text-sm text-muted-foreground w-12">
                    {location.percentage}%
                  </span>
                  <span className="text-sm font-medium w-16 text-right">
                    {location.users.toLocaleString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interest Categories */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Audience Interests</CardTitle>
          <CardDescription>Top interest categories based on user behavior</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {interestData.map((interest, index) => (
              <motion.div
                key={interest.interest}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
              >
                <span className="font-medium">{interest.interest}</span>
                <div className="flex items-center gap-3">
                  <Progress value={interest.score} className="w-24" />
                  <span className="text-sm font-medium w-8">{interest.score}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}