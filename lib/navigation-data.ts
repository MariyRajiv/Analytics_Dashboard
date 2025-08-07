export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  active?: boolean;
  description: string;
  features: string[];
  comingSoon?: boolean;
}

export const navigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'BarChart3',
    active: true,
    description: 'Overview of key metrics and performance indicators',
    features: [
      'Real-time metrics tracking',
      'Revenue and conversion analytics',
      'Interactive charts and visualizations',
      'Campaign performance overview'
    ]
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: 'TrendingUp',
    description: 'Deep dive into your data with advanced analytics',
    features: [
      'Advanced funnel analysis',
      'Cohort and retention analysis',
      'Custom event tracking',
      'Attribution modeling',
      'Predictive analytics'
    ]
  },
  {
    id: 'audience',
    label: 'Audience',
    icon: 'Users',
    description: 'Understand your customers and their behavior',
    features: [
      'Demographic insights',
      'Behavioral segmentation',
      'Customer lifetime value',
      'Audience overlap analysis',
      'Geographic distribution'
    ]
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: 'PieChart',
    description: 'Generate comprehensive reports and insights',
    features: [
      'Automated report generation',
      'Custom report builder',
      'Scheduled report delivery',
      'White-label reporting',
      'Export to multiple formats'
    ]
  },
  {
    id: 'realtime',
    label: 'Real-time',
    icon: 'Activity',
    description: 'Monitor live activity and real-time events',
    features: [
      'Live visitor tracking',
      'Real-time conversion monitoring',
      'Active campaign performance',
      'Live chat integration',
      'Instant alert notifications'
    ]
  },
  {
    id: 'ai-insights',
    label: 'AI Insights',
    icon: 'Brain',
    description: 'AI-powered recommendations and predictions',
    features: [
      'Automated anomaly detection',
      'Predictive modeling',
      'Smart recommendations',
      'Natural language insights',
      'Machine learning optimization'
    ]
  },
  {
    id: 'automation',
    label: 'Automation',
    icon: 'Zap',
    description: 'Automate your marketing workflows and processes',
    features: [
      'Campaign automation',
      'Trigger-based actions',
      'Workflow builder',
      'API integrations',
      'Custom automation rules'
    ]
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'Settings',
    description: 'Configure your account and platform preferences',
    features: [
      'Account management',
      'Team collaboration',
      'Data source connections',
      'Notification preferences',
      'Security settings'
    ]
  }
];

export function getNavigationItem(id: string): NavigationItem | undefined {
  return navigationItems.find(item => item.id === id);
}