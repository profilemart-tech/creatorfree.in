'use client'

import { RotateCcw } from 'lucide-react'

type ControlSliderProps = {
  label: string
  value: number
  min: number
  max: number
  step: number
  unit: string
  defaultValue: number
  onChange: (value: number) => void
}

export function ControlSlider({
  label,
  value,
  min,
  max,
  step,
  unit,
  defaultValue,
  onChange,
}: ControlSliderProps) {
  const isModified = value !== defaultValue
  const percent = ((value - min) / (max - min)) * 100

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <div className="flex items-center gap-1.5">
          <span className="min-w-12 text-right font-mono text-xs tabular-nums text-muted-foreground">
            {value}
            {unit}
          </span>
          <button
            type="button"
            onClick={() => onChange(defaultValue)}
            disabled={!isModified}
            aria-label={`Reset ${label}`}
            className="rounded-sm p-0.5 text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-0"
          >
            <RotateCcw className="size-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="slider-input"
        style={
          {
            '--slider-percent': `${percent}%`,
          } as React.CSSProperties
        }
      />
    </div>
  )
}
