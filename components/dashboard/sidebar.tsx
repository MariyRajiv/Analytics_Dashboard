'use client';
import { toast } from "sonner";
import { useState } from 'react';
import { 
  BarChart3, 
  Users, 
  FileText, 
  Activity, 
  Brain, 
  Zap, 
  Settings,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  onNavigate: (pageId: string) => void;
  currentPage: string;
}

const navigationItems = [
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    description: 'Comprehensive analytics and performance metrics',
    current: true
  },
  {
    id: 'audience',
    label: 'Audience',
    icon: Users,
    description: 'Audience insights and demographic analysis',
    current: false
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: FileText,
    description: 'Detailed reports and data exports',
    current: false
  },
  {
    id: 'real-time',
    label: 'Real-time',
    icon: Activity,
    description: 'Live data monitoring and alerts',
    current: false
  },
  {
    id: 'ai-insights',
    label: 'AI Insights',
    icon: Brain,
    description: 'AI-powered recommendations and predictions',
    current: false
  },
  {
    id: 'automation',
    label: 'Automation',
    icon: Zap,
    description: 'Automated workflows and campaigns',
    current: false
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    description: 'Account settings and preferences',
    current: false
  }
];

export function Sidebar({ onNavigate, currentPage }: SidebarProps) {
  const handleItemClick = (itemId: string) => {
    onNavigate(itemId);
  };

  return (
    <div>
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-gray-900 px-6 pb-4 border-r border-gray-200 dark:border-gray-800">
          <div className="flex h-16 shrink-0 items-center">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ADmyBRAND
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Insights</p>
              </div>
            </div>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => handleItemClick(item.id)}
                          className={cn(
                            (item.current && currentPage === 'dashboard') || currentPage === item.id
                              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-r-2 border-blue-600'
                              : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800',
                            'group flex w-full items-center justify-between rounded-l-md py-2 pl-2 pr-3 text-sm font-medium transition-all duration-200'
                          )}
                        >
                          <div className="flex items-center">
                            <Icon
                              className={cn(
                                (item.current && currentPage === 'dashboard') || currentPage === item.id
                                  ? 'text-blue-600 dark:text-blue-400'
                                  : 'text-gray-400 dark:text-gray-500 group-hover:text-blue-500',
                                'mr-3 h-5 w-5 transition-colors duration-200'
                              )}
                            />
                            {item.label}
                            {((item.current && currentPage === 'dashboard') || currentPage === item.id) && (
                              <span className="ml-2 inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-300">
                                Current
                              </span>
                            )}
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;