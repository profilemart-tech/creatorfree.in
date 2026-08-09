'use client'

import { Loader2 } from 'lucide-react'

type LoadingOverlayProps = {
  active: boolean
  title: string
  subtitle?: string
  /** 0..1 progress; omit for an indeterminate spinner. */
  progress?: number
}

export function LoadingOverlay({ active, title, subtitle, progress }: LoadingOverlayProps) {
  if (!active) return null

  const pct = progress != null ? Math.round(Math.min(1, Math.max(0, progress)) * 100) : null

  return (
    <div
      className="absolute inset-0 z-30 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      role="status"
      aria-live="polite"
    >
      <div className="flex w-full max-w-xs flex-col items-center gap-4 rounded-xl border border-border bg-card p-6 text-center shadow-2xl shadow-black/50">
        <Loader2 className="size-8 animate-spin text-primary" aria-hidden="true" />
        <div className="space-y-1">
          <p className="text-sm font-medium text-foreground text-balance">{title}</p>
          {subtitle && <p className="text-xs text-muted-foreground text-pretty">{subtitle}</p>}
        </div>
        {pct != null && (
          <div className="w-full space-y-1.5">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-200"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="font-mono text-[10px] tabular-nums text-muted-foreground">{pct}%</p>
          </div>
        )}
      </div>
    </div>
  )
}
