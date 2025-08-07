"use client"
import { Brain } from "lucide-react";
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Header } from '@/components/dashboard/header'
import { MetricCard } from '@/components/dashboard/metric-card'
import { RevenueChart } from '@/components/dashboard/revenue-chart'
import { ChannelChart } from '@/components/dashboard/channel-chart'
import { TrafficChart } from '@/components/dashboard/traffic-chart'
import { DataTable } from '@/components/dashboard/data-table'
import { DashboardSkeleton } from '@/components/dashboard/loading-skeleton'
import { toast } from 'sonner'
import { AnalyticsPage } from '@/components/pages/analytics-page'
import { AudiencePage } from '@/components/pages/audience-page'
import { ReportsPage } from '@/components/pages/reports-page'
import { RealtimePage } from '@/components/pages/realtime-page'
import { AIInsightsPage } from '@/components/pages/ai-insights-page'
import { AutomationPage } from '@/components/pages/automation-page'
import { SettingsPage } from '@/components/pages/settings-page'
import { 
  generateMetrics, 
  generateLineChartData, 
  generateBarChartData, 
  generateDonutChartData,
  generateTableData,
  updateMetrics,
  type MetricData,
  type ChartDataPoint,
  type TableRow
} from '@/lib/mock-data'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [metrics, setMetrics] = useState<MetricData[]>([])
  const [lineChartData, setLineChartData] = useState<ChartDataPoint[]>([])
  const [barChartData, setBarChartData] = useState<ChartDataPoint[]>([])
  const [donutChartData, setDonutChartData] = useState<ChartDataPoint[]>([])
  const [tableData, setTableData] = useState<TableRow[]>([])
  useEffect(() => {
    // Simulate loading delay
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setMetrics(generateMetrics())
      setLineChartData(generateLineChartData())
      setBarChartData(generateBarChartData())
      setDonutChartData(generateDonutChartData())
      setTableData(generateTableData())
      setIsLoading(false)
    }

    loadData()

    // Simulate real-time updates every 30 seconds
    const interval = setInterval(() => {
      if (!isLoading) {
        setMetrics(current => updateMetrics(current))
        setLineChartData(generateLineChartData())
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [isLoading])

  const handleNavigation = (pageId: string) => {
    setCurrentPage(pageId)
    toast.success(`Navigated to ${getPageName(pageId)}! 🚀`)
  }

  const getPageName = (pageId: string): string => {
    const pageNames: Record<string, string> = {
      'dashboard': 'Dashboard',
      'analytics': 'Analytics',
      'audience': 'Audience', 
      'reports': 'Reports',
      'realtime': 'Real-time',
      'ai-insights': 'AI Insights',
      'automation': 'Automation',
      'settings': 'Settings'
    }
    return pageNames[pageId] || pageId
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'analytics':
        return <AnalyticsPage />
      case 'audience':
        return <AudiencePage />
      case 'reports':
        return <ReportsPage />
      case 'realtime':
        return <RealtimePage />
      case 'ai-insights':
        return <AIInsightsPage />
      case 'automation':
        return <AutomationPage />
      case 'settings':
        return <SettingsPage />
      default:
        return renderDashboard()
    }
  }

  const renderDashboard = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 lg:space-y-8 max-w-full"
    >
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 lg:mb-8"
      >
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome back, John! 👋
        </h1>
        <p className="text-muted-foreground mt-2">
          Here's what's happening with your campaigns today.
        </p>
      </motion.div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {metrics.map((metric, index) => (
          <MetricCard
            key={metric.title}
            {...metric}
            index={index}
          />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
        <div className="xl:col-span-2">
          <RevenueChart data={lineChartData} />
        </div>
        <div>
          <TrafficChart data={donutChartData} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <ChannelChart data={barChartData} />
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-4 lg:p-6 text-white shadow-xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Brain className="h-6 w-6" />
                </motion.div>
              </div>
              <div>
                <h3 className="text-base lg:text-lg font-semibold">AI Insights</h3>
                <p className="text-blue-100 text-xs lg:text-sm">Powered by machine learning</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <p className="text-xs lg:text-sm">🚀 Your Google Ads campaign is performing 23% better than industry average</p>
              </div>
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <p className="text-xs lg:text-sm">💡 Consider increasing budget for "Summer Sale 2024" - projected 34% ROI increase</p>
              </div>
              <div className="p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <p className="text-xs lg:text-sm">⚠️ Facebook campaign CTR dropping - suggest A/B testing new creatives</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Data Table */}
      <DataTable data={tableData} />
    </motion.div>
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
        <div className="flex">
          <Sidebar onNavigate={handleNavigation} currentPage={currentPage} />
          <div className="flex-1">
            <Header />
            <main className="p-6">
              <DashboardSkeleton />
            </main>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="flex">
        <Sidebar onNavigate={handleNavigation} currentPage={currentPage} />
        
        <div className="flex-1 flex flex-col lg:ml-64">
          <Header onNavigate={handleNavigation} />
          
          <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
            {renderCurrentPage()}
          </main>
        </div>
      </div>
    </div>
  )
}