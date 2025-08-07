export interface MetricData {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  icon: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  date?: string;
  revenue?: number;
  users?: number;
  conversions?: number;
}

export interface TableRow {
  id: string;
  campaign: string;
  status: 'Active' | 'Paused' | 'Completed';
  budget: number;
  spent: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  roas: number;
  date: string;
}

export const generateMetrics = (): MetricData[] => [
  {
    title: 'Total Revenue',
    value: '$847,629',
    change: 12.5,
    trend: 'up',
    icon: 'DollarSign'
  },
  {
    title: 'Active Users',
    value: '24,847',
    change: 8.2,
    trend: 'up',
    icon: 'Users'
  },
  {
    title: 'Conversion Rate',
    value: '3.42%',
    change: -2.1,
    trend: 'down',
    icon: 'TrendingUp'
  },
  {
    title: 'Growth Rate',
    value: '18.7%',
    change: 15.3,
    trend: 'up',
    icon: 'BarChart3'
  }
];

export const generateLineChartData = (): ChartDataPoint[] => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map((month, index) => ({
    name: month,
    revenue: Math.floor(Math.random() * 100000) + 50000,
    users: Math.floor(Math.random() * 5000) + 2000,
    conversions: Math.floor(Math.random() * 500) + 200,
    value: Math.floor(Math.random() * 100000) + 50000
  }));
};

export const generateBarChartData = (): ChartDataPoint[] => {
  const categories = ['Google Ads', 'Facebook', 'Instagram', 'LinkedIn', 'Twitter', 'YouTube'];
  return categories.map(category => ({
    name: category,
    value: Math.floor(Math.random() * 80000) + 20000
  }));
};

export const generateDonutChartData = (): ChartDataPoint[] => {
  const sources = [
    { name: 'Organic Search', value: 35 },
    { name: 'Paid Ads', value: 28 },
    { name: 'Social Media', value: 22 },
    { name: 'Email', value: 10 },
    { name: 'Direct', value: 5 }
  ];
  return sources;
};

export const generateTableData = (): TableRow[] => {
  const campaigns = [
    'Summer Sale 2024', 'Brand Awareness Q4', 'Product Launch', 'Holiday Special', 
    'Back to School', 'Black Friday', 'New Year Campaign', 'Spring Collection',
    'Customer Retention', 'Lead Generation', 'Mobile App Install', 'Video Campaign'
  ];
  
  const statuses: ('Active' | 'Paused' | 'Completed')[] = ['Active', 'Paused', 'Completed'];
  
  return campaigns.map((campaign, index) => ({
    id: `campaign-${index + 1}`,
    campaign,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    budget: Math.floor(Math.random() * 50000) + 10000,
    spent: Math.floor(Math.random() * 40000) + 5000,
    clicks: Math.floor(Math.random() * 10000) + 1000,
    conversions: Math.floor(Math.random() * 500) + 50,
    ctr: Math.round((Math.random() * 10 + 1) * 100) / 100,
    cpc: Math.round((Math.random() * 5 + 0.5) * 100) / 100,
    roas: Math.round((Math.random() * 5 + 2) * 100) / 100,
    date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toLocaleDateString()
  }));
};

// Simulate real-time data updates
export const updateMetrics = (currentMetrics: MetricData[]): MetricData[] => {
  return currentMetrics.map(metric => ({
    ...metric,
    change: Math.round((Math.random() * 20 - 10) * 100) / 100,
    trend: Math.random() > 0.5 ? 'up' : 'down'
  }));
};