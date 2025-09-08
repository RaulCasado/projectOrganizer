import { useState } from 'react';
import type { ReactNode } from 'react';

interface TabConfig {
  id: string;
  label: string;
  component: ReactNode;
}

export function useProjectTabs(defaultTab: string = 'overview') {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const tabs: TabConfig[] = [
    { id: 'overview', label: '📋 Overview', component: null },
    { id: 'mvp', label: '🎯 MVP', component: null },
    { id: 'tasks', label: '✅ Tasks', component: null },
    { id: 'ideas', label: '💡 Ideas', component: null },
    { id: 'resources', label: '🔗 Resources', component: null },
    { id: 'sketches', label: '📐 Sketches', component: null },
    { id: 'blog', label: '📝 Blog', component: null },
  ];

  const getActiveTabComponent = (components: Record<string, ReactNode>) => {
    return components[activeTab];
  };

  const isTabActive = (tabId: string) => activeTab === tabId;

  return {
    activeTab,
    setActiveTab,
    tabs,
    getActiveTabComponent,
    isTabActive,
  };
}
