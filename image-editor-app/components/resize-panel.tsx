'use client'

import { useEffect, useMemo, useState } from 'react'
import { Link2, Link2Off, Ruler } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Unit = 'px' | '%'

type ResizePanelProps = {
  naturalWidth: number
  naturalHeight: number
  onApply: (width: number, height: number) => void
}

export function ResizePanel({ naturalWidth, naturalHeight, onApply }: ResizePanelProps) {
  const [unit, setUnit] = useState<Unit>('px')
  const [lockAspect, setLockAspect] = useState(true)
  const [width, setWidth] = useState<string>(String(naturalWidth))
  const [height, setHeight] = useState<string>(String(naturalHeight))

  const aspect = naturalWidth / naturalHeight

  // Reset the inputs whenever the underlying image changes.
  useEffect(() => {
    setUnit('px')
    setWidth(String(naturalWidth))
    setHeight(String(naturalHeight))
  }, [naturalWidth, naturalHeight])

  const switchUnit = (next: Unit) => {
    if (next === unit) return
    if (next === '%') {
      setWidth('100')
      setHeight('100')
    } else {
      setWidth(String(naturalWidth))
      setHeight(String(naturalHeight))
    }
    setUnit(next)
  }

  const handleWidth = (val: string) => {
    setWidth(val)
    if (lockAspect && val !== '') {
      const num = Number(val)
      if (!Number.isNaN(num)) {
        setHeight(unit === '%' ? String(round(num)) : String(round(num / aspect)))
      }
    }
  }

  const handleHeight = (val: string) => {
    setHeight(val)
    if (lockAspect && val !== '') {
      const num = Number(val)
      if (!Number.isNaN(num)) {
        setWidth(unit === '%' ? String(round(num)) : String(round(num * aspect)))
      }
    }
  }

  // Compute the resulting pixel dimensions for preview + apply.
  const target = useMemo(() => {
    const w = Number(width)
    const h = Number(height)
    if (Number.isNaN(w) || Number.isNaN(h) || w <= 0 || h <= 0) return null
    if (unit === '%') {
      return {
        w: Math.round((naturalWidth * w) / 100),
        h: Math.round((naturalHeight * h) / 100),
      }
    }
    return { w: Math.round(w), h: Math.round(h) }
  }, [width, height, unit, naturalWidth, naturalHeight])

  const unchanged = target != null && target.w === naturalWidth && target.h === naturalHeight

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-muted-foreground">
          Current: {naturalWidth} × {naturalHeight} px
        </span>
        <div className="flex overflow-hidden rounded-md border border-border">
          {(['px', '%'] as Unit[]).map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => switchUnit(u)}
              className={`px-2.5 py-1 text-xs font-medium transition-colors ${
                unit === u
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {u}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-end gap-2">
        <label className="flex-1 space-y-1.5">
          <span className="text-xs font-medium text-muted-foreground">Width</span>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            value={width}
            onChange={(e) => handleWidth(e.target.value)}
            className="h-9 w-full rounded-md border border-input bg-secondary px-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
          />
        </label>

        <button
          type="button"
          onClick={() => setLockAspect((v) => !v)}
          aria-pressed={lockAspect}
          aria-label={lockAspect ? 'Aspect ratio locked' : 'Aspect ratio unlocked'}
          title={lockAspect ? 'Aspect ratio locked' : 'Aspect ratio unlocked'}
          className={`mb-0.5 flex size-9 items-center justify-center rounded-md border transition-colors ${
            lockAspect
              ? 'border-primary/50 bg-primary/15 text-primary'
              : 'border-border bg-secondary text-muted-foreground hover:text-foreground'
          }`}
        >
          {lockAspect ? (
            <Link2 className="size-4" aria-hidden="true" />
          ) : (
            <Link2Off className="size-4" aria-hidden="true" />
          )}
        </button>

        <label className="flex-1 space-y-1.5">
          <span className="text-xs font-medium text-muted-foreground">Height</span>
          <input
            type="number"
            inputMode="numeric"
            min={1}
            value={height}
            onChange={(e) => handleHeight(e.target.value)}
            className="h-9 w-full rounded-md border border-input bg-secondary px-2.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-ring"
          />
        </label>
      </div>

      {target && (
        <p className="text-xs text-muted-foreground">
          New size: <span className="font-mono text-foreground">{target.w} × {target.h} px</span>
        </p>
      )}

      <Button
        className="w-full gap-1.5"
        size="sm"
        disabled={!target || unchanged}
        onClick={() => target && onApply(target.w, target.h)}
      >
        <Ruler className="size-4" aria-hidden="true" />
        Apply resize
      </Button>
    </div>
  )
}

function round(n: number) {
  return Math.max(1, Math.round(n))
}
