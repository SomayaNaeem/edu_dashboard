export type Page = 'dashboard' | 'enrollment' | 'prospects' | 'marketing' | 'settings'

interface NavItem {
  icon: string
  label: string
  page: Page
}

const navItems: NavItem[] = [
  { icon: 'dashboard',    label: 'Dashboard',  page: 'dashboard' },
  { icon: 'school',       label: 'Enrollment', page: 'enrollment' },
  { icon: 'person_search',label: 'Prospects',  page: 'prospects' },
  { icon: 'campaign',     label: 'Marketing',  page: 'marketing' },
  { icon: 'settings',     label: 'Settings',   page: 'settings' },
]

interface SidebarProps {
  activePage: Page
  onNavigate: (page: Page) => void
}

export function Sidebar({ activePage, onNavigate }: SidebarProps) {
  return (
    <aside className="w-64 bg-background-dark border-r border-white/10 flex flex-col justify-between shrink-0 h-full">
      <div className="p-6">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="size-9 rounded-lg bg-primary flex items-center justify-center text-background-dark shrink-0">
            <span className="material-symbols-outlined font-bold text-xl">school</span>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white leading-tight">EduAdmin AI</h1>
            <p className="text-[10px] text-primary font-bold uppercase tracking-widest">Executive Suite</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1.5">
          {navItems.map((item) =>
            item.page === activePage ? (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg bg-primary text-background-dark font-bold transition-all shadow-lg shadow-primary/10"
              >
                <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </button>
            ) : (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-white/70 hover:bg-white/5 hover:text-white transition-all"
              >
                <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                <span className="text-sm">{item.label}</span>
              </button>
            )
          )}
        </nav>
      </div>

      {/* User profile */}
      <div className="p-6 border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-full bg-accent-indigo flex items-center justify-center text-white font-bold text-sm shrink-0">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-white truncate">Jane Doe</p>
            <p className="text-[10px] text-slate-500 font-medium truncate">Executive Director</p>
          </div>
          <span className="material-symbols-outlined text-slate-500 hover:text-white cursor-pointer transition-colors text-xl">
            more_vert
          </span>
        </div>
      </div>
    </aside>
  )
}
