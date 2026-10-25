import React from 'react';
import {
  Home,
  BarChart3,
  Globe2,
  Target,
  Search,
  FileText,
  ClipboardList,
  Compass,
  X,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export type StageNavigationTab =
  | 'all'
  | 'stage1'
  | 'stage2'
  | 'stage3'
  | 'bias_audit'
  | 'dev_log'
  | 'presentation';

interface SidebarNavProps {
  activeStage: StageNavigationTab;
  setActiveStage: (stage: StageNavigationTab) => void;
  testedCount: number;
  totalCategories: number;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  productCategory: string;
  businessProfile: string;
}

interface NavItemConfig {
  id: StageNavigationTab;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeHighlight?: boolean;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeStage,
  setActiveStage,
  testedCount,
  totalCategories,
  isMobileOpen,
  setIsMobileOpen,
  productCategory,
  businessProfile
}) => {
  const navItems: NavItemConfig[] = [
    {
      id: 'all',
      label: 'Overview',
      sublabel: 'Executive Decision Summary',
      icon: Home
    },
    {
      id: 'stage1',
      label: 'Stage 1: Market Screening',
      sublabel: 'Top 7 Country Selection',
      icon: BarChart3
    },
    {
      id: 'stage2',
      label: 'Stage 2: PESTEL Analysis',
      sublabel: 'Country Risk Assessment',
      icon: Globe2
    },
    {
      id: 'stage3',
      label: 'Stage 3: Entry Mode Decision',
      sublabel: 'Strategy & Governance Mode',
      icon: Target
    },
    {
      id: 'bias_audit',
      label: 'Bias Audit',
      sublabel: '10 Product Categories Lab',
      icon: Search,
      badge: `${testedCount}/${totalCategories} Tested`,
      badgeHighlight: testedCount > 0
    },
    {
      id: 'dev_log',
      label: 'Development Log',
      sublabel: 'Model History & Milestones',
      icon: FileText
    },
    {
      id: 'presentation',
      label: 'Presentation Summary',
      sublabel: 'MBA Committee Slides & Notes',
      icon: ClipboardList,
      badge: 'MBA Ready'
    }
  ];

  const handleSelectTab = (id: StageNavigationTab) => {
    setActiveStage(id);
    setIsMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navContent = (
    <div className="flex flex-col h-full bg-[#fcfbf9] border-r border-stone-200/90 text-stone-800">
      {/* Brand Header */}
      <div className="p-5 border-b border-stone-200/90 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-900 border border-emerald-800 text-amber-400 flex items-center justify-center shadow-md shrink-0">
              <Compass className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-900 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                  Executive
                </span>
                <span className="text-[11px] font-semibold text-stone-500">Trade Intel</span>
              </div>
              <h2 className="text-base font-bold text-stone-900 tracking-tight leading-tight mt-0.5">
                Global Risk Radar
              </h2>
            </div>
          </div>
          {/* Close button on mobile */}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-100"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Active Case Context */}
        <div className="mt-3.5 p-2.5 rounded-lg bg-[#f8f7f4] border border-stone-200 text-xs">
          <div className="text-[10px] uppercase font-bold tracking-wider text-stone-600 mb-0.5">
            Active Case Study
          </div>
          <div className="font-semibold text-stone-900 truncate" title={productCategory}>
            {productCategory}
          </div>
          <div className="text-stone-600 text-[11px] truncate mt-0.5" title={businessProfile}>
            {businessProfile}
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
        <div className="px-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-stone-600">
          Navigation Menu
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeStage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => handleSelectTab(item.id)}
              className={`w-full text-left transition-all duration-150 flex items-center justify-between px-3.5 py-3 rounded-xl ${
                isActive
                  ? 'bg-emerald-900 text-white font-semibold shadow-md shadow-emerald-950/15 border-l-4 border-amber-400 pl-3'
                  : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100 font-medium'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    isActive
                      ? 'bg-emerald-800/80 text-amber-300'
                      : 'bg-stone-100 text-emerald-900 group-hover:bg-white'
                  }`}
                >
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>
                <div className="min-w-0">
                  <div
                    className={`text-[15px] leading-tight truncate ${
                      isActive ? 'text-white font-semibold' : 'text-stone-900 font-medium'
                    }`}
                  >
                    {item.label}
                  </div>
                  <div
                    className={`text-[11px] leading-tight truncate mt-0.5 ${
                      isActive ? 'text-emerald-200' : 'text-stone-500'
                    }`}
                  >
                    {item.sublabel}
                  </div>
                </div>
              </div>

              {item.badge && (
                <span
                  className={`ml-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold tracking-tight shrink-0 ${
                    isActive
                      ? 'bg-amber-400 text-emerald-950'
                      : item.badgeHighlight
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      : 'bg-stone-200 text-stone-700'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Sidebar Footer with MBA Presentation Quality Indicator */}
      <div className="p-4 border-t border-stone-200/90 bg-white">
        <div className="flex items-center gap-2 text-xs font-semibold text-stone-800">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>MBA Project Defense Edition</span>
        </div>
        <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
          High-contrast classroom projector mode active. All 3 decision stages validated.
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed on Desktop, 272px width) */}
      <aside className="hidden lg:block w-72 shrink-0 h-screen sticky top-0 z-30 shadow-sm">
        {navContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-stone-900/50 backdrop-blur-sm z-50 flex"
          onClick={() => setIsMobileOpen(false)}
        >
          <div
            className="w-80 max-w-[85vw] h-full shadow-2xl animate-in slide-in-from-left duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {navContent}
          </div>
        </div>
      )}
    </>
  );
};
