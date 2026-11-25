import React, { useState } from 'react';
import {
  Home,
  LayoutGrid,
  Gamepad2,
  Package,
  TrendingUp,
  Library,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Search,
  X,
  Menu,
} from 'lucide-react';
import { APP_DOCK, type DockItem } from '../data/dock';
import { SOCIAL_LINKS } from '../data/social';

export interface ShellSection {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

interface BansifyShellProps {
  sections: ShellSection[];
  activeSection: string;
  onSelect: (id: string) => void;
  onOpenSettings: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  userName?: string;
  userEmail?: string;
  userAvatar?: string | null;
  onAccount: () => void;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearch?: (value: string) => void;
  children: React.ReactNode;
}

const DockTile: React.FC<{ item: DockItem; active?: boolean }> = ({ item, active }) => {
  const [failed, setFailed] = useState(false);
  const Icon = item.icon;
  return (
    <span
      className={`w-[34px] h-[34px] rounded-[10px] bg-[#0494f4] overflow-hidden flex items-center justify-center ring-1 ring-black/5 dark:ring-white/10 transition group-hover:brightness-110 ${
        active ? 'outline outline-2 outline-offset-2 outline-[#0494f4]/60' : ''
      }`}
    >
      {item.logoSrc && !failed ? (
        <img src={item.logoSrc} alt="" loading="lazy" onError={() => setFailed(true)} className="w-full h-full object-cover" />
      ) : (
        <Icon className="w-1/2 h-1/2 text-white" strokeWidth={1.75} />
      )}
    </span>
  );
};

/** The website's five-card layout: panel, search pill, content, social card, dock. */
export const BansifyShell: React.FC<BansifyShellProps> = ({
  sections,
  activeSection,
  onSelect,
  onOpenSettings,
  isDark,
  onToggleTheme,
  userName,
  userEmail,
  userAvatar,
  onAccount,
  searchPlaceholder = 'Search apps and games',
  searchValue,
  onSearch,
  children,
}) => {
  const [open, setOpen] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);
  const [panes, setPanes] = useState<DockItem[]>([]);
  const [paneCollapsed, setPaneCollapsed] = useState<Record<string, boolean>>({});
  const [query, setQuery] = useState(searchValue ?? '');

  const initial = (userName || 'B').slice(0, 1).toUpperCase();
  const openPane = (item: DockItem) =>
    setPanes((list) => (list.some((p) => p.id === item.id) ? list : [...list, item].slice(-2)));

  const row = (item: ShellSection, isOpen: boolean) => {
    const Icon = item.icon;
    const active = activeSection === item.id;
    return (
      <button
        key={item.id}
        type="button"
        onClick={() => onSelect(item.id)}
        title={item.label}
        aria-label={item.label}
        aria-current={active ? 'page' : undefined}
        className={`group relative flex items-center h-10 rounded-xl cursor-pointer ${
          isOpen ? 'w-full' : 'w-10'
        } ${active ? 'text-white' : 'text-zinc-900 dark:text-zinc-100'}`}
      >
        <span
          aria-hidden
          className={`absolute inset-x-0 top-[2px] bottom-[2px] rounded-xl transition-colors ${
            active
              ? 'bg-[#0494f4] shadow-sm shadow-[#0494f4]/25'
              : 'bg-zinc-100/80 group-hover:bg-zinc-200/80 dark:bg-[#303030] dark:group-hover:bg-[#3a3a3a]'
          }`}
        />
        <span className="relative w-10 h-10 flex items-center justify-center shrink-0">
          <Icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
        </span>
        {isOpen && (
          <span className={`relative ml-2 truncate text-[13px] ${active ? 'font-semibold' : 'font-medium'}`}>
            {item.label}
          </span>
        )}
      </button>
    );
  };

  const panel = (variant: 'desktop' | 'drawer') => {
    const isOpen = variant === 'drawer' ? true : open;
    return (
      <div
        className={`flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-[#333333] dark:bg-[#2a2a2a] ${
          isOpen ? 'w-[260px]' : 'w-16'
        }`}
      >
        <div className={`flex items-center h-16 shrink-0 ${isOpen ? 'gap-2.5 px-3' : 'justify-center px-0'}`}>
          {isOpen ? (
            <>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                title="Collapse panel"
                aria-label="Collapse panel"
                className="w-9 h-9 rounded-[10px] bg-[#0494f4] overflow-hidden shrink-0 ring-1 ring-black/5 dark:ring-white/10"
              >
                <img src="/icon-192.png" alt="Bansify Store" className="w-full h-full object-cover" />
              </button>
              <span className="min-w-0 text-[16px] font-black tracking-tight leading-none truncate">
                <span className="text-[#0494f4]">Bansify</span>{' '}
                <span className="text-zinc-900 dark:text-zinc-100">Store</span>
              </span>
              <button
                type="button"
                onClick={() => (variant === 'drawer' ? setMobileNav(false) : setOpen(false))}
                title="Collapse"
                aria-label="Collapse panel"
                className="ml-auto w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:bg-zinc-100 dark:hover:bg-[#333333] cursor-pointer shrink-0"
              >
                {variant === 'drawer' ? <X className="w-4 h-4" strokeWidth={1.75} /> : <ChevronLeft className="w-4 h-4" strokeWidth={1.75} />}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              title="Expand panel"
              aria-label="Expand panel"
              className="w-9 h-9 rounded-[10px] bg-[#0494f4] overflow-hidden ring-1 ring-black/5 dark:ring-white/10"
            >
              <img src="/icon-192.png" alt="Bansify Store" className="w-full h-full object-cover" />
            </button>
          )}
        </div>

        <div className={`flex-1 min-h-0 overflow-y-auto flex flex-col gap-1 ${isOpen ? 'px-3' : 'px-0 items-center'}`}>
          {sections.map((item) => row(item, isOpen))}
          <button
            type="button"
            onClick={onOpenSettings}
            title="Settings"
            aria-label="Settings"
            className={`group relative flex items-center h-10 rounded-xl cursor-pointer text-zinc-900 dark:text-zinc-100 ${
              isOpen ? 'w-full' : 'w-10'
            }`}
          >
            <span
              aria-hidden
              className="absolute inset-x-0 top-[2px] bottom-[2px] rounded-xl bg-zinc-100/80 group-hover:bg-zinc-200/80 dark:bg-[#303030] dark:group-hover:bg-[#3a3a3a] transition-colors"
            />
            <span className="relative w-10 h-10 flex items-center justify-center shrink-0">
              <Settings className="w-[18px] h-[18px]" strokeWidth={1.75} />
            </span>
            {isOpen && <span className="relative ml-2 truncate text-[13px] font-medium">Settings</span>}
          </button>
        </div>

        <div className="shrink-0">
          <div className={`mx-3 h-px bg-zinc-200 dark:bg-[#333333] ${isOpen ? '' : 'mx-2'}`} />

          {!isOpen && (
            <div className="flex justify-center pt-2">
              <button
                type="button"
                onClick={() => setOpen(true)}
                title="Expand panel"
                aria-label="Expand panel"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:bg-zinc-100 dark:hover:bg-[#333333] cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" strokeWidth={1.75} />
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={onAccount}
            title={userEmail}
            className={`w-full flex items-center gap-2.5 py-3 hover:bg-zinc-50 dark:hover:bg-[#333333] text-left cursor-pointer ${
              isOpen ? 'px-3' : 'justify-center px-0'
            }`}
          >
            <span className="w-9 h-9 rounded-full overflow-hidden bg-[#0494f4] text-white flex items-center justify-center text-xs font-bold shrink-0">
              {userAvatar ? <img src={userAvatar} alt="" className="w-full h-full object-cover" /> : initial}
            </span>
            {isOpen && (
              <span className="min-w-0 text-left">
                <span className="block text-[13px] font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                  {userName || 'Account'}
                </span>
                <span className="block text-[11px] text-zinc-500 truncate">{userEmail}</span>
              </span>
            )}
            {isOpen && (
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleTheme();
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onToggleTheme();
                  }
                }}
                title={isDark ? 'Switch to light' : 'Switch to dark'}
                aria-label="Toggle theme"
                className="ml-auto w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-[#333333] cursor-pointer shrink-0"
              >
                {isDark ? <Sun className="w-4 h-4" strokeWidth={1.75} /> : <Moon className="w-4 h-4" strokeWidth={1.75} />}
              </span>
            )}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-[100dvh] w-full flex-col gap-3 bg-[#f5f6f7] p-3 dark:bg-[#212121] text-zinc-900 dark:text-zinc-100">
      <div className="flex flex-1 min-h-0 gap-3">
        <div className="hidden md:block shrink-0">{panel('desktop')}</div>

        {mobileNav && (
          <div className="fixed inset-0 z-50 md:hidden">
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setMobileNav(false)}
              className="absolute inset-0 bg-black/40 cursor-default"
            />
            <div className="absolute left-3 top-3 bottom-3">{panel('drawer')}</div>
          </div>
        )}

        <div className="flex flex-1 min-w-0 flex-col gap-3">
          <div className="flex gap-3 shrink-0">
            <div className="flex-1 min-w-0 flex items-center gap-2 h-12 px-4 rounded-full border border-zinc-200 bg-white dark:border-[#333333] dark:bg-[#2a2a2a]">
              <button
                type="button"
                onClick={() => setMobileNav(true)}
                aria-label="Open navigation"
                className="md:hidden w-6 h-6 rounded-lg flex items-center justify-center text-zinc-500 cursor-pointer shrink-0"
              >
                <Menu className="w-5 h-5" strokeWidth={1.75} />
              </button>
              <Search className="w-4 h-4 text-zinc-400 shrink-0" strokeWidth={1.75} />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  onSearch?.(e.target.value);
                }}
                placeholder={searchPlaceholder}
                className="flex-1 min-w-0 bg-transparent outline-none text-[13px] placeholder:text-zinc-400"
              />
            </div>

            <div className="hidden sm:flex items-center gap-1.5 h-12 px-3 rounded-2xl border border-zinc-200 bg-white dark:border-[#333333] dark:bg-[#2a2a2a] overflow-x-auto">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${social.label} · ${social.handle}`}
                  aria-label={`${social.label} ${social.handle}`}
                  style={{ backgroundColor: social.color }}
                  className="group w-[34px] h-[34px] rounded-[10px] flex items-center justify-center shrink-0 ring-1 ring-black/10 dark:ring-white/15 transition group-hover:brightness-110"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" className="text-white" aria-hidden="true">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <main className="flex flex-1 min-h-0 flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-[#333333] dark:bg-[#2a2a2a]">
            {children}
          </main>
        </div>

        {panes.map((item) => {
          const isCollapsed = !!paneCollapsed[item.id];
          return (
            <section
              key={item.id}
              className={`hidden lg:flex shrink-0 flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-[#333333] dark:bg-[#2a2a2a] ${
                isCollapsed ? 'w-14' : 'w-[38%] max-w-[560px]'
              }`}
              aria-label={item.label}
            >
              <div className={`flex items-center gap-2 h-12 px-3 shrink-0 border-b border-zinc-200 dark:border-[#333333] ${isCollapsed ? 'justify-center px-0' : ''}`}>
                {isCollapsed ? (
                  <button
                    type="button"
                    onClick={() => setPaneCollapsed((m) => ({ ...m, [item.id]: false }))}
                    title={item.label}
                    aria-label={`Expand ${item.label}`}
                    className="group w-10 h-10 rounded-xl flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-[#333333] cursor-pointer"
                  >
                    <DockTile item={item} />
                  </button>
                ) : (
                  <>
                    <DockTile item={item} />
                    <span className="text-[13px] font-semibold truncate">{item.label}</span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto text-[11px] text-zinc-500 hover:text-[#0494f4]"
                    >
                      Open in tab
                    </a>
                    <button
                      type="button"
                      onClick={() => setPaneCollapsed((m) => ({ ...m, [item.id]: true }))}
                      title="Collapse"
                      aria-label="Collapse"
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:bg-zinc-100 dark:hover:bg-[#333333] cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" strokeWidth={1.75} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setPanes((list) => list.filter((p) => p.id !== item.id))}
                      title="Close"
                      aria-label="Close"
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-zinc-400 hover:bg-zinc-100 dark:hover:bg-[#333333] cursor-pointer"
                    >
                      <X className="w-4 h-4" strokeWidth={1.75} />
                    </button>
                  </>
                )}
              </div>
              {!isCollapsed && (
                <iframe src={item.url} title={item.label} className="flex-1 w-full border-0 bg-white" loading="lazy" />
              )}
            </section>
          );
        })}

        <aside
          className="hidden lg:flex w-16 shrink-0 flex-col items-center gap-1.5 rounded-2xl border border-zinc-200 bg-white py-3 dark:border-[#333333] dark:bg-[#2a2a2a]"
          aria-label="Bansify apps"
        >
          <button
            type="button"
            onClick={onAccount}
            title={userEmail}
            aria-label="Account"
            className="mb-1 w-9 h-9 rounded-full overflow-hidden bg-[#0494f4] text-white flex items-center justify-center text-xs font-bold cursor-pointer"
          >
            {userAvatar ? <img src={userAvatar} alt="" className="w-full h-full object-cover" /> : initial}
          </button>
          <div className="w-6 h-px bg-zinc-200 dark:bg-[#333333] mb-1" />

          {APP_DOCK.map((item) => (
            <React.Fragment key={item.id}>
              <button
                type="button"
                onClick={() => openPane(item)}
                title={item.label}
                aria-label={`Open ${item.label}`}
                className="group cursor-pointer rounded-[10px]"
              >
                <DockTile item={item} active={panes.some((p) => p.id === item.id)} />
              </button>
              <div className="w-5 h-px bg-zinc-200 dark:bg-[#333333]" />
            </React.Fragment>
          ))}
        </aside>
      </div>
    </div>
  );
};

export const STORE_SECTIONS: ShellSection[] = [
  { id: '/', label: 'Home', icon: Home },
  { id: '/apps', label: 'Apps', icon: LayoutGrid },
  { id: '/games', label: 'Games', icon: Gamepad2 },
  { id: '/fdroid', label: 'F-Droid', icon: Package },
  { id: '/charts', label: 'Top charts', icon: TrendingUp },
  { id: '/library', label: 'Library', icon: Library },
];
