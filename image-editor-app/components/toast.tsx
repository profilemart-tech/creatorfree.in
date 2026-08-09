'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { AlertTriangle, CheckCircle2, Info, X } from 'lucide-react'

type ToastVariant = 'error' | 'success' | 'info'

type Toast = {
  id: number
  message: string
  variant: ToastVariant
}

type ToastContextValue = {
  toast: (message: string, variant?: ToastVariant) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>')
  return ctx
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback((message: string, variant: ToastVariant = 'info') => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, message, variant }])
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex flex-col items-center gap-2 px-4">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

const VARIANT_STYLES: Record<ToastVariant, { icon: React.ElementType; classes: string }> = {
  error: {
    icon: AlertTriangle,
    classes: 'border-destructive/50 bg-destructive/15 text-foreground',
  },
  success: {
    icon: CheckCircle2,
    classes: 'border-primary/50 bg-primary/15 text-foreground',
  },
  info: {
    icon: Info,
    classes: 'border-border bg-card text-foreground',
  },
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, toast.variant === 'error' ? 6000 : 4000)
    return () => clearTimeout(timer)
  }, [onDismiss, toast.variant])

  const { icon: Icon, classes } = VARIANT_STYLES[toast.variant]

  return (
    <div
      role="alert"
      className={`pointer-events-auto flex w-full max-w-md items-start gap-3 rounded-lg border px-4 py-3 shadow-lg shadow-black/30 backdrop-blur-sm ${classes} animate-in fade-in slide-in-from-top-2`}
    >
      <Icon
        className={`mt-0.5 size-5 shrink-0 ${
          toast.variant === 'error'
            ? 'text-destructive'
            : toast.variant === 'success'
              ? 'text-primary'
              : 'text-muted-foreground'
        }`}
        aria-hidden="true"
      />
      <p className="flex-1 text-pretty text-sm leading-relaxed">{toast.message}</p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="rounded-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <X className="size-4" aria-hidden="true" />
      </button>
    </div>
  )
}
