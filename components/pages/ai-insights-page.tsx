"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, Lightbulb, TrendingUp, AlertTriangle, Target, Zap, Star, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const aiInsights = [
  {
    id: 1,
    type: 'opportunity',
    title: 'Optimize Google Ads Budget Allocation',
    description: 'AI detected that reallocating 15% of budget from Campaign A to Campaign B could increase ROI by 34%',
    impact: 'High',
    confidence: 92,
    potentialGain: '+$12,400/month',
    category: 'Budget Optimization',
    icon: Target,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/20'
  },
  {
    id: 2,
    type: 'warning',
    title: 'Declining Facebook Campaign Performance',
    description: 'CTR has dropped 23% over the past 7 days. Consider refreshing ad creatives or adjusting targeting',
    impact: 'Medium',
    confidence: 87,
    potentialLoss: '-$8,200/month',
    category: 'Performance Alert',
    icon: AlertTriangle,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/20'
  },
  {
    id: 3,
    type: 'insight',
    title: 'Audience Segment Discovery',
    description: 'New high-value audience segment identified: "Tech Professionals 25-34" showing 45% higher conversion rates',
    impact: 'High',
    confidence: 95,
    potentialGain: '+$18,600/month',
    category: 'Audience Analysis',
    icon: Lightbulb,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20'
  },
  {
    id: 4,
    type: 'trend',
    title: 'Seasonal Pattern Detected',
    description: 'Historical data shows 67% increase in conversions during weekends. Consider increasing weekend ad spend',
    impact: 'Medium',
    confidence: 89,
    potentialGain: '+$6,800/month',
    category: 'Timing Optimization',
    icon: TrendingUp,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20'
  }
]

const predictiveModels = [
  {
    name: 'Customer Lifetime Value',
    accuracy: 94,
    prediction: '$2,847',
    trend: '+12%',
    description: 'Predicted CLV for new customers acquired this month'
  },
  {
    name: 'Churn Probability',
    accuracy: 91,
    prediction: '8.3%',
    trend: '-2.1%',
    description: 'Likelihood of customer churn in next 30 days'
  },
  {
    name: 'Conversion Rate Forecast',
    accuracy: 88,
    prediction: '4.2%',
    trend: '+0.8%',
    description: 'Expected conversion rate for next week'
  },
  {
    name: 'Revenue Projection',
    accuracy: 92,
    prediction: '$847K',
    trend: '+15%',
    description: 'Projected monthly revenue based on current trends'
  }
]

const automationSuggestions = [
  {
    title: 'Auto-pause Low Performing Ads',
    description: 'Automatically pause ads with CTR below 1.5% after 1000 impressions',
    savings: '$3,200/month',
    effort: 'Low'
  },
  {
    title: 'Dynamic Bid Adjustments',
    description: 'Adjust bids based on time of day, device, and location performance',
    savings: '$5,800/month',
    effort: 'Medium'
  },
  {
    title: 'Smart Budget Reallocation',
    description: 'Automatically shift budget to best-performing campaigns daily',
    savings: '$8,400/month',
    effort: 'Low'
  }
]

export function AIInsightsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [selectedInsight, setSelectedInsight] = useState<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
      case 'Medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
      case 'Low': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
      default: return 'bg-gray-100 text-gray-700'
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI-Powered Insights
          </h1>
          <p className="text-muted-foreground mt-2">
            Machine learning recommendations and predictive analytics
          </p>
        </div>
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Brain className="h-6 w-6 text-blue-600" />
          </motion.div>
          <span className="text-sm text-muted-foreground">AI Engine Active</span>
        </div>
      </div>

      {/* AI Insights Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {aiInsights.map((insight, index) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => setSelectedInsight(selectedInsight === insight.id ? null : insight.id)}
            className="cursor-pointer"
          >
            <Card className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
              selectedInsight === insight.id ? 'ring-2 ring-blue-500' : ''
            }`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${insight.bgColor}`}>
                      <insight.icon className={`h-5 w-5 ${insight.color}`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{insight.title}</CardTitle>
                      <Badge variant="outline" className="mt-1">
                        {insight.category}
                      </Badge>
                    </div>
                  </div>
                  <Badge className={getImpactColor(insight.impact)}>
                    {insight.impact} Impact
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{insight.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">AI Confidence</span>
                    <span className="text-sm font-medium">{insight.confidence}%</span>
                  </div>
                  <Progress value={insight.confidence} className="h-2" />
                  
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-muted-foreground">Potential Impact</span>
                    <span className={`text-sm font-medium ${
                      insight.potentialGain ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {insight.potentialGain || insight.potentialLoss}
                    </span>
                  </div>
                </div>

                {selectedInsight === insight.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t"
                  >
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        Apply Recommendation
                      </Button>
                      <Button size="sm" variant="outline">
                        Learn More
                      </Button>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Predictive Models */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Predictive Models
          </CardTitle>
          <CardDescription>AI-powered forecasts and predictions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {predictiveModels.map((model, index) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="text-center p-4 bg-muted/50 rounded-lg"
              >
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {model.prediction}
                </div>
                <div className="text-sm font-medium mb-2">{model.name}</div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-green-600 bg-green-100">
                    {model.trend}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {model.accuracy}% accuracy
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">{model.description}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Automation Suggestions */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Automation Opportunities
          </CardTitle>
          <CardDescription>AI-recommended automation to save time and improve performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {automationSuggestions.map((suggestion, index) => (
              <motion.div
                key={suggestion.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium">{suggestion.title}</h3>
                    <Badge variant="outline" className={
                      suggestion.effort === 'Low' ? 'text-green-600 bg-green-100' :
                      suggestion.effort === 'Medium' ? 'text-yellow-600 bg-yellow-100' :
                      'text-red-600 bg-red-100'
                    }>
                      {suggestion.effort} Effort
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{suggestion.description}</p>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium text-green-600">
                      Potential savings: {suggestion.savings}
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Set Up
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Performance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Model Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-2">94.2%</div>
            <p className="text-sm text-muted-foreground">Average across all AI models</p>
            <Progress value={94.2} className="mt-3" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Recommendations Applied</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">127</div>
            <p className="text-sm text-muted-foreground">This month</p>
            <Badge variant="secondary" className="mt-3 text-green-600 bg-green-100">
              +23% vs last month
            </Badge>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">ROI from AI</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600 mb-2">847%</div>
            <p className="text-sm text-muted-foreground">Return on AI investment</p>
            <Badge variant="secondary" className="mt-3 text-purple-600 bg-purple-100">
              Industry leading
            </Badge>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}