"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, Play, Pause, Settings, Plus, Clock, CheckCircle, AlertCircle, BarChart3, Target, DollarSign } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { toast } from "sonner"

const automationRules = [
  {
    id: 1,
    name: 'Auto-pause Low CTR Ads',
    description: 'Automatically pause ads with CTR below 1.5% after 1000 impressions',
    status: 'active',
    trigger: 'CTR < 1.5%',
    action: 'Pause Ad',
    frequency: 'Every 4 hours',
    lastRun: '2 hours ago',
    savings: '$3,200/month',
    executions: 47
  },
  {
    id: 2,
    name: 'Budget Reallocation',
    description: 'Shift budget from underperforming to high-performing campaigns',
    status: 'active',
    trigger: 'ROAS < 2.0',
    action: 'Reallocate Budget',
    frequency: 'Daily at 9 AM',
    lastRun: '6 hours ago',
    savings: '$8,400/month',
    executions: 23
  },
  {
    id: 3,
    name: 'Bid Optimization',
    description: 'Adjust bids based on time of day and device performance',
    status: 'paused',
    trigger: 'Performance variance',
    action: 'Adjust Bids',
    frequency: 'Every 2 hours',
    lastRun: '1 day ago',
    savings: '$5,800/month',
    executions: 156
  },
  {
    id: 4,
    name: 'Keyword Expansion',
    description: 'Add high-performing search terms as keywords automatically',
    status: 'active',
    trigger: 'Search term performance',
    action: 'Add Keywords',
    frequency: 'Weekly',
    lastRun: '3 days ago',
    savings: '$2,100/month',
    executions: 12
  }
]

const workflowTemplates = [
  {
    name: 'New Campaign Setup',
    description: 'Automated campaign creation with best practices',
    steps: 5,
    estimatedTime: '15 minutes',
    category: 'Campaign Management'
  },
  {
    name: 'Performance Monitoring',
    description: 'Monitor and alert on campaign performance issues',
    steps: 3,
    estimatedTime: '5 minutes',
    category: 'Monitoring'
  },
  {
    name: 'Audience Sync',
    description: 'Sync audiences across platforms automatically',
    steps: 4,
    estimatedTime: '10 minutes',
    category: 'Audience Management'
  },
  {
    name: 'Report Generation',
    description: 'Generate and send automated performance reports',
    steps: 6,
    estimatedTime: '20 minutes',
    category: 'Reporting'
  }
]

const recentActivity = [
  {
    rule: 'Auto-pause Low CTR Ads',
    action: 'Paused 3 ads with CTR below threshold',
    time: '2 hours ago',
    impact: 'Saved $127 in ad spend',
    type: 'success'
  },
  {
    rule: 'Budget Reallocation',
    action: 'Moved $500 from Campaign A to Campaign B',
    time: '6 hours ago',
    impact: 'Expected +12% ROAS improvement',
    type: 'success'
  },
  {
    rule: 'Bid Optimization',
    action: 'Failed to execute - API rate limit',
    time: '1 day ago',
    impact: 'Retry scheduled in 1 hour',
    type: 'error'
  },
  {
    rule: 'Keyword Expansion',
    action: 'Added 8 new keywords to Campaign C',
    time: '3 days ago',
    impact: 'Potential +$340/week revenue',
    type: 'success'
  }
]

export function AutomationPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [newAutomation, setNewAutomation] = useState({
    name: '',
    description: '',
    trigger: '',
    action: '',
    frequency: '',
    platform: ''
  })

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const toggleRule = (ruleId: number) => {
    // Toggle automation rule status
    console.log(`Toggling rule ${ruleId}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
      case 'paused': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
      case 'error': return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'error': return <AlertCircle className="h-4 w-4 text-red-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
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
            Marketing Automation
          </h1>
          <p className="text-muted-foreground mt-2">
            Automate your marketing workflows and optimize performance
          </p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Automation
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Automation</DialogTitle>
              <DialogDescription>
                Set up a new marketing automation rule to optimize your campaigns
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="automation-name">Automation Name</Label>
                <Input
                  id="automation-name"
                  placeholder="e.g., Auto-pause Low CTR Ads"
                  value={newAutomation.name}
                  onChange={(e) => setNewAutomation(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="automation-description">Description</Label>
                <Textarea
                  id="automation-description"
                  placeholder="Describe what this automation will do"
                  value={newAutomation.description}
                  onChange={(e) => setNewAutomation(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="automation-platform">Platform</Label>
                  <Select value={newAutomation.platform} onValueChange={(value) => setNewAutomation(prev => ({ ...prev, platform: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google-ads">Google Ads</SelectItem>
                      <SelectItem value="facebook-ads">Facebook Ads</SelectItem>
                      <SelectItem value="linkedin-ads">LinkedIn Ads</SelectItem>
                      <SelectItem value="all-platforms">All Platforms</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="automation-frequency">Frequency</Label>
                  <Select value={newAutomation.frequency} onValueChange={(value) => setNewAutomation(prev => ({ ...prev, frequency: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="real-time">Real-time</SelectItem>
                      <SelectItem value="hourly">Every Hour</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="automation-trigger">Trigger Condition</Label>
                  <Select value={newAutomation.trigger} onValueChange={(value) => setNewAutomation(prev => ({ ...prev, trigger: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select trigger" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low-ctr">CTR below threshold</SelectItem>
                      <SelectItem value="high-cpc">CPC above threshold</SelectItem>
                      <SelectItem value="low-roas">ROAS below target</SelectItem>
                      <SelectItem value="budget-spent">Budget percentage spent</SelectItem>
                      <SelectItem value="conversion-drop">Conversion rate drop</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="automation-action">Action to Take</Label>
                  <Select value={newAutomation.action} onValueChange={(value) => setNewAutomation(prev => ({ ...prev, action: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pause-ad">Pause Ad/Campaign</SelectItem>
                      <SelectItem value="adjust-bid">Adjust Bid</SelectItem>
                      <SelectItem value="reallocate-budget">Reallocate Budget</SelectItem>
                      <SelectItem value="send-alert">Send Alert</SelectItem>
                      <SelectItem value="increase-budget">Increase Budget</SelectItem>
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
                  if (!newAutomation.name || !newAutomation.platform || !newAutomation.trigger || !newAutomation.action) {
                    toast.error('Please fill in all required fields')
                    return
                  }
                  toast.success(`Automation "${newAutomation.name}" created successfully! 🚀`)
                  setIsCreateModalOpen(false)
                  setNewAutomation({ name: '', description: '', trigger: '', action: '', frequency: '', platform: '' })
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Create Automation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Active Rules', value: '12', icon: Zap, change: '+3 this month' },
          { title: 'Total Executions', value: '1,247', icon: Play, change: '+156 this week' },
          { title: 'Time Saved', value: '47 hrs', icon: Clock, change: 'This month' },
          { title: 'Cost Savings', value: '$19.5K', icon: BarChart3, change: '+23% vs last month' }
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

      {/* Automation Rules */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Automation Rules</CardTitle>
          <CardDescription>Manage your automated marketing rules and workflows</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {automationRules.map((rule, index) => (
              <motion.div
                key={rule.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium">{rule.name}</h3>
                    <Badge className={getStatusColor(rule.status)}>
                      {rule.status}
                    </Badge>
                    <Badge variant="outline">
                      {rule.executions} executions
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{rule.description}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-muted-foreground">
                    <div>
                      <span className="font-medium">Trigger:</span> {rule.trigger}
                    </div>
                    <div>
                      <span className="font-medium">Action:</span> {rule.action}
                    </div>
                    <div>
                      <span className="font-medium">Frequency:</span> {rule.frequency}
                    </div>
                    <div>
                      <span className="font-medium">Last Run:</span> {rule.lastRun}
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm font-medium text-green-600">
                      Savings: {rule.savings}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Switch
                    checked={rule.status === 'active'}
                    onCheckedChange={() => toggleRule(rule.id)}
                  />
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Workflow Templates and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workflow Templates */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Workflow Templates</CardTitle>
            <CardDescription>Pre-built automation workflows</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workflowTemplates.map((template, index) => (
                <motion.div
                  key={template.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{template.name}</h3>
                      <Badge variant="outline">{template.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{template.steps} steps</span>
                      <span>{template.estimatedTime}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Use Template
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest automation executions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg"
                >
                  <div className="mt-0.5">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{activity.rule}</span>
                      <span className="text-xs text-muted-foreground">{activity.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{activity.action}</p>
                    <p className="text-xs text-green-600 font-medium">{activity.impact}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Automation Performance</CardTitle>
          <CardDescription>How your automations are performing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">98.7%</div>
              <p className="text-sm text-muted-foreground mb-2">Success Rate</p>
              <Progress value={98.7} className="h-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">2.3s</div>
              <p className="text-sm text-muted-foreground mb-2">Avg. Execution Time</p>
              <Progress value={85} className="h-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">$47.2K</div>
              <p className="text-sm text-muted-foreground mb-2">Total Savings</p>
              <Progress value={92} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}