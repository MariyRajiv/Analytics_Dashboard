export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: 'metric' | 'campaign' | 'insight' | 'report';
  pageId: string;
  url?: string;
}

export const searchData: SearchResult[] = [
  // Metrics
  { id: '1', title: 'Total Revenue', description: 'Current revenue metrics and trends', category: 'metric', pageId: 'analytics' },
  { id: '2', title: 'Revenue Trends', description: 'Monthly revenue performance analysis', category: 'metric', pageId: 'analytics' },
  { id: '3', title: 'Active Users', description: 'User engagement and activity data', category: 'metric', pageId: 'audience' },
  { id: '4', title: 'Conversion Rate', description: 'Conversion performance analytics', category: 'metric', pageId: 'analytics' },
  { id: '5', title: 'Growth Rate', description: 'Business growth indicators', category: 'metric', pageId: 'analytics' },
  { id: '6', title: 'Live Users', description: 'Real-time active user count', category: 'metric', pageId: 'realtime' },
  { id: '7', title: 'Page Views', description: 'Website page view analytics', category: 'metric', pageId: 'analytics' },
  { id: '8', title: 'Sessions', description: 'User session data and trends', category: 'metric', pageId: 'analytics' },
  
  // Campaigns
  { id: '9', title: 'Summer Sale 2024', description: 'Seasonal marketing campaign performance', category: 'campaign', pageId: 'dashboard' },
  { id: '10', title: 'Brand Awareness Q4', description: 'Brand visibility campaign metrics', category: 'campaign', pageId: 'dashboard' },
  { id: '11', title: 'Product Launch', description: 'New product introduction campaign', category: 'campaign', pageId: 'dashboard' },
  { id: '12', title: 'Holiday Special', description: 'Holiday season promotional campaign', category: 'campaign', pageId: 'dashboard' },
  { id: '13', title: 'Campaign Performance', description: 'Overall campaign analytics and metrics', category: 'campaign', pageId: 'dashboard' },
  
  // Insights
  { id: '14', title: 'Google Ads Performance', description: 'AI-powered Google Ads optimization insights', category: 'insight', pageId: 'ai-insights' },
  { id: '15', title: 'Facebook Campaign Analysis', description: 'Social media campaign performance analysis', category: 'insight', pageId: 'ai-insights' },
  { id: '16', title: 'ROI Optimization', description: 'Return on investment improvement suggestions', category: 'insight', pageId: 'ai-insights' },
  { id: '17', title: 'Audience Segmentation', description: 'Customer segment analysis and recommendations', category: 'insight', pageId: 'audience' },
  { id: '18', title: 'AI Insights', description: 'Machine learning recommendations and predictions', category: 'insight', pageId: 'ai-insights' },
  { id: '19', title: 'Automation', description: 'Marketing automation and workflow optimization', category: 'insight', pageId: 'automation' },
  
  // Reports
  { id: '20', title: 'Monthly Performance Report', description: 'Comprehensive monthly analytics report', category: 'report', pageId: 'reports' },
  { id: '21', title: 'Channel Attribution Report', description: 'Multi-channel attribution analysis', category: 'report', pageId: 'reports' },
  { id: '22', title: 'Customer Journey Report', description: 'End-to-end customer journey insights', category: 'report', pageId: 'reports' },
  { id: '23', title: 'Competitive Analysis Report', description: 'Market competition and positioning analysis', category: 'report', pageId: 'reports' },
  { id: '24', title: 'Real-time Report', description: 'Live performance monitoring and alerts', category: 'report', pageId: 'realtime' },
  { id: '25', title: 'Audience Report', description: 'Demographics and behavior analysis', category: 'report', pageId: 'audience' },
];

export function searchResults(query: string): SearchResult[] {
  if (!query.trim()) return [];
  
  const lowercaseQuery = query.toLowerCase();
  return searchData.filter(item => 
    item.title.toLowerCase().includes(lowercaseQuery) ||
    item.description.toLowerCase().includes(lowercaseQuery)
  ).slice(0, 8); // Limit to 8 results
}

export function getCategoryIcon(category: SearchResult['category']): string {
  switch (category) {
    case 'metric': return '📊';
    case 'campaign': return '🚀';
    case 'insight': return '💡';
    case 'report': return '📈';
    default: return '🔍';
  }
}

export function getCategoryColor(category: SearchResult['category']): string {
  switch (category) {
    case 'metric': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
    case 'campaign': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
    case 'insight': return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
    case 'report': return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300';
    default: return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
  }
}