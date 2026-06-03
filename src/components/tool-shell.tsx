import { type ReactNode } from "react";

export function ToolShell({
  title,
  description,
  icon,
  children,
}: {
  title: string;
  description: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-5xl p-6 md:p-10 space-y-8">
      <header className="flex items-start gap-4">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl text-primary-foreground shadow-[var(--shadow-elevated)]"
          style={{ background: "var(--gradient-primary)" }}
        >
          {icon}
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground max-w-2xl">{description}</p>
        </div>
      </header>
      {children}
      <p className="text-xs text-muted-foreground border-t pt-4">
        AI-generated content may be inaccurate or incomplete. Review carefully before sending or acting on it.
      </p>
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] ${className}`}
    >
      {children}
    </div>
  );
}