'use client'

import { useRef, useState } from 'react'
import { ImageUp, Scissors, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GRADIENT_PRESETS, SOLID_PRESETS } from '@/lib/background'

type BackgroundType = 'solid' | 'gradient' | 'image'

type BackgroundPanelProps = {
  hasCutout: boolean
  onRemoveBackground: () => void
  onApplySolid: (color: string) => void
  onApplyGradient: (from: string, to: string) => void
  onApplyImage: (file: File) => void
}

export function BackgroundPanel({
  hasCutout,
  onRemoveBackground,
  onApplySolid,
  onApplyGradient,
  onApplyImage,
}: BackgroundPanelProps) {
  const [tab, setTab] = useState<BackgroundType>('solid')
  const [customColor, setCustomColor] = useState('#0ea5e9')
  const fileRef = useRef<HTMLInputElement>(null)

  return (
    <div className="space-y-5">
      {/* AI cutout */}
      <div className="space-y-2">
        <Button className="w-full gap-1.5" size="sm" onClick={onRemoveBackground}>
          <Scissors className="size-4" aria-hidden="true" />
          Remove background
        </Button>
        <p className="flex items-start gap-1.5 text-xs text-muted-foreground">
          <Sparkles className="mt-0.5 size-3 shrink-0 text-primary" aria-hidden="true" />
          <span className="text-pretty">
            AI cutout runs locally in your browser. First run downloads the model, so it may take a
            moment.
          </span>
        </p>
      </div>

      <div className="h-px bg-border" />

      {/* Change background */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            New background
          </h3>
        </div>

        {!hasCutout && (
          <p className="rounded-md border border-border bg-secondary/50 px-3 py-2 text-xs text-muted-foreground text-pretty">
            Tip: remove the background first for a clean cutout, then apply a new one behind your
            subject.
          </p>
        )}

        {/* Sub-tabs */}
        <div className="flex overflow-hidden rounded-md border border-border">
          {(['solid', 'gradient', 'image'] as BackgroundType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={`flex-1 px-2 py-1.5 text-xs font-medium capitalize transition-colors ${
                tab === t
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'solid' && (
          <div className="space-y-3">
            <div className="grid grid-cols-8 gap-1.5">
              {SOLID_PRESETS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => onApplySolid(color)}
                  aria-label={`Apply ${color} background`}
                  className="aspect-square rounded-md border border-border ring-offset-2 ring-offset-sidebar transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-ring"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                aria-label="Custom background color"
                className="h-9 w-12 shrink-0 cursor-pointer rounded-md border border-input bg-secondary p-1"
              />
              <Button
                variant="secondary"
                size="sm"
                className="flex-1"
                onClick={() => onApplySolid(customColor)}
              >
                Apply {customColor}
              </Button>
            </div>
          </div>
        )}

        {tab === 'gradient' && (
          <div className="grid grid-cols-2 gap-2">
            {GRADIENT_PRESETS.map((g) => (
              <button
                key={g.name}
                type="button"
                onClick={() => onApplyGradient(g.from, g.to)}
                className="group flex flex-col gap-1.5 focus:outline-none"
              >
                <span
                  className="block h-12 w-full rounded-md border border-border ring-2 ring-transparent transition-all group-hover:ring-border"
                  style={{ backgroundImage: `linear-gradient(135deg, ${g.from}, ${g.to})` }}
                />
                <span className="text-[10px] text-muted-foreground">{g.name}</span>
              </button>
            ))}
          </div>
        )}

        {tab === 'image' && (
          <div className="space-y-2">
            <Button
              variant="secondary"
              size="sm"
              className="w-full gap-1.5"
              onClick={() => fileRef.current?.click()}
            >
              <ImageUp className="size-4" aria-hidden="true" />
              Upload background image
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) onApplyImage(file)
                e.target.value = ''
              }}
            />
            <p className="text-xs text-muted-foreground text-pretty">
              The image is cover-fit behind your subject.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
