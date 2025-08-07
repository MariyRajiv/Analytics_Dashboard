"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileText, Download, Calendar, Filter, Eye, Share, Clock, TrendingUp, Plus, X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner"
import { ExportButton } from '@/components/ui/export-button'

const reportTemplates = [
  {
    id: 1,
    name: 'Monthly Performance Report',
    description: 'Comprehensive monthly analytics with key metrics and insights',
    category: 'Performance',
    lastGenerated: '2024-01-15',
    status: 'Ready',
    downloads: 234,
    type: 'Automated'
  },
  {
    id: 2,
    name: 'Campaign ROI Analysis',
    description: 'Detailed return on investment analysis for all marketing campaigns',
    category: 'ROI',
    lastGenerated: '2024-01-14',
    status: 'Processing',
    downloads: 156,
    type: 'Custom'
  },
  {
    id: 3,
    name: 'Audience Behavior Study',
    description: 'In-depth analysis of user behavior patterns and preferences',
    category: 'Audience',
    lastGenerated: '2024-01-13',
    status: 'Ready',
    downloads: 89,
    type: 'Scheduled'
  },
  {
    id: 4,
    name: 'Conversion Funnel Report',
    description: 'Step-by-step analysis of user conversion journey',
    category: 'Conversion',
    lastGenerated: '2024-01-12',
    status: 'Ready',
    downloads: 167,
    type: 'Automated'
  },
  {
    id: 5,
    name: 'Competitive Analysis',
    description: 'Market positioning and competitor performance comparison',
    category: 'Competition',
    lastGenerated: '2024-01-11',
    status: 'Draft',
    downloads: 45,
    type: 'Custom'
  },
  {
    id: 6,
    name: 'Social Media Performance',
    description: 'Cross-platform social media analytics and engagement metrics',
    category: 'Social',
    lastGenerated: '2024-01-10',
    status: 'Ready',
    downloads: 198,
    type: 'Scheduled'
  }
]

const recentReports = [
  { name: 'Q4 2023 Summary', date: '2024-01-08', size: '2.4 MB', format: 'PDF' },
  { name: 'Holiday Campaign Analysis', date: '2024-01-05', size: '1.8 MB', format: 'Excel' },
  { name: 'Year-End Performance', date: '2024-01-03', size: '3.1 MB', format: 'PDF' },
  { name: 'Customer Segmentation', date: '2024-01-01', size: '1.2 MB', format: 'CSV' }
]

export function ReportsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newReport, setNewReport] = useState({
    name: '',
    description: '',
    category: '',
    type: 'Custom',
    frequency: 'One-time'
  })
  const [filterCategory, setFilterCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const filteredReports = reportTemplates.filter(report => {
    const matchesCategory = filterCategory === 'all' || report.category.toLowerCase() === filterCategory
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
      case 'Processing': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
      case 'Draft': return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded"></div>
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Reports & Analytics
          </h1>
          <p className="text-muted-foreground mt-2">
            Generate, customize, and download comprehensive reports
          </p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Create New Report
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Report</DialogTitle>
              <DialogDescription>
                Set up a new custom report with your preferred settings
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="report-name">Report Name</Label>
                <Input
                  id="report-name"
                  placeholder="Enter report name"
                  value={newReport.name}
                  onChange={(e) => setNewReport(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="report-description">Description</Label>
                <Textarea
                  id="report-description"
                  placeholder="Describe what this report will analyze"
                  value={newReport.description}
                  onChange={(e) => setNewReport(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="report-category">Category</Label>
                  <Select value={newReport.category} onValueChange={(value) => setNewReport(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="performance">Performance</SelectItem>
                      <SelectItem value="roi">ROI</SelectItem>
                      <SelectItem value="audience">Audience</SelectItem>
                      <SelectItem value="conversion">Conversion</SelectItem>
                      <SelectItem value="competition">Competition</SelectItem>
                      <SelectItem value="social">Social</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="report-frequency">Frequency</Label>
                  <Select value={newReport.frequency} onValueChange={(value) => setNewReport(prev => ({ ...prev, frequency: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="One-time">One-time</SelectItem>
                      <SelectItem value="Daily">Daily</SelectItem>
                      <SelectItem value="Weekly">Weekly</SelectItem>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  if (!newReport.name || !newReport.category) {
                    toast.error('Please fill in all required fields')
                    return
                  }
                  toast.success(`Report "${newReport.name}" created successfully! 🎉`)
                  setIsCreateModalOpen(false)
                  setNewReport({ name: '', description: '', category: '', type: 'Custom', frequency: 'One-time' })
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Create Report
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Total Reports', value: '24', icon: FileText, change: '+3 this month' },
          { title: 'Downloads', value: '1,289', icon: Download, change: '+156 this week' },
          { title: 'Scheduled Reports', value: '8', icon: Calendar, change: '2 pending' },
          { title: 'Avg. Generation Time', value: '2.3 min', icon: Clock, change: '-0.5 min faster' }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="border-0 shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search reports..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="performance">Performance</SelectItem>
            <SelectItem value="roi">ROI</SelectItem>
            <SelectItem value="audience">Audience</SelectItem>
            <SelectItem value="conversion">Conversion</SelectItem>
            <SelectItem value="competition">Competition</SelectItem>
            <SelectItem value="social">Social</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Report Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {report.name}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {report.description}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    {report.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge className={getStatusColor(report.status)}>
                      {report.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium">{report.type}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Last Generated:</span>
                    <span className="font-medium">{report.lastGenerated}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Downloads:</span>
                    <span className="font-medium">{report.downloads}</span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <ExportButton
                      data={[{
                        Name: report.name,
                        Category: report.category,
                        Status: report.status,
                        Type: report.type,
                        'Last Generated': report.lastGenerated,
                        Downloads: report.downloads
                      }]}
                      filename={`report-${report.name.toLowerCase().replace(/\s+/g, '-')}`}
                      showCSV={true}
                      showPDF={false}
                      variant="default"
                      size="sm"
                    />
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Downloads */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Recent Downloads</CardTitle>
          <CardDescription>Your recently downloaded reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report, index) => (
              <motion.div
                key={report.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">{report.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {report.date} • {report.size} • {report.format}
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <ExportButton
                    data={[{
                      'Report Name': report.name,
                      Date: report.date,
                      Size: report.size,
                      Format: report.format
                    }]}
                    filename={`${report.name.toLowerCase().replace(/\s+/g, '-')}`}
                    showCSV={true}
                    showPDF={false}
                    variant="outline"
                    size="sm"
                  />
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}