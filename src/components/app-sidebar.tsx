import { Link, useRouterState } from "@tanstack/react-router";
import { Sparkles, Mail, FileText, ListChecks, Search, MessageSquare, LayoutDashboard } from "lucide-react";

const items = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/email", label: "Email Generator", icon: Mail },
  { to: "/meetings", label: "Meeting Notes", icon: FileText },
  { to: "/tasks", label: "Task Planner", icon: ListChecks },
  { to: "/research", label: "Research", icon: Search },
  { to: "/chat", label: "AI Chat", icon: MessageSquare },
];

export function AppSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-sidebar-border">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-lg text-primary-foreground shadow-[var(--shadow-elevated)]"
          style={{ background: "var(--gradient-primary)" }}
        >
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold text-sidebar-foreground">Aurora</span>
          <span className="text-xs text-muted-foreground">Workplace AI</span>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="m-3 rounded-lg border border-sidebar-border bg-card p-3 text-xs text-muted-foreground">
        <p className="font-medium text-foreground mb-1">Responsible AI</p>
        <p>Outputs may be inaccurate. Always review before sharing or acting on suggestions.</p>
      </div>
    </aside>
  );
}

export function MobileNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="md:hidden flex gap-1 overflow-x-auto border-b bg-card px-3 py-2">
      {items.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap ${
              active ? "bg-accent text-accent-foreground" : "text-muted-foreground"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}