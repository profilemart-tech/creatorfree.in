'use client'

import { useRef, useState } from 'react'
import Cropper, { type ReactCropperElement } from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import { Check, Crop as CropIcon, RotateCcw, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ASPECT_RATIOS, canvasToImage } from '@/lib/editor'

type CropDialogProps = {
  src: string
  onCancel: () => void
  onApply: (image: HTMLImageElement) => void
}

export function CropDialog({ src, onCancel, onApply }: CropDialogProps) {
  const cropperRef = useRef<ReactCropperElement>(null)
  const [ratioName, setRatioName] = useState<string>('free')

  const setRatio = (name: string, value: number | null) => {
    setRatioName(name)
    const cropper = cropperRef.current?.cropper
    if (cropper) cropper.setAspectRatio(value ?? NaN)
  }

  const reset = () => {
    cropperRef.current?.cropper?.reset()
  }

  const apply = async () => {
    const cropper = cropperRef.current?.cropper
    if (!cropper) return
    const canvas = cropper.getCroppedCanvas({
      maxWidth: 8192,
      maxHeight: 8192,
      imageSmoothingQuality: 'high',
    })
    if (!canvas) return
    const image = await canvasToImage(canvas)
    onApply(image)
  }

  return (
    <div
      className="fixed inset-0 z-40 flex flex-col bg-background/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Crop image"
    >
      <header className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 md:px-6">
        <div className="flex items-center gap-2">
          <CropIcon className="size-4 text-primary" aria-hidden="true" />
          <h2 className="text-sm font-semibold">Crop image</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={reset} className="gap-1.5">
            <RotateCcw className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Reset</span>
          </Button>
          <Button variant="outline" size="sm" onClick={onCancel} className="gap-1.5">
            <X className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Cancel</span>
          </Button>
          <Button size="sm" onClick={apply} className="gap-1.5">
            <Check className="size-4" aria-hidden="true" />
            Apply
          </Button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col-reverse md:flex-row">
        {/* Aspect ratio presets */}
        <div className="flex shrink-0 gap-2 overflow-x-auto border-t border-border p-3 md:w-56 md:flex-col md:overflow-y-auto md:border-r md:border-t-0">
          <p className="hidden px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground md:block">
            Aspect ratio
          </p>
          {ASPECT_RATIOS.map((r) => (
            <Button
              key={r.name}
              variant={ratioName === r.name ? 'default' : 'secondary'}
              size="sm"
              onClick={() => setRatio(r.name, r.value)}
              className="shrink-0 justify-start whitespace-nowrap"
            >
              {r.label}
            </Button>
          ))}
        </div>

        {/* Cropper canvas */}
        <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden p-4">
          <Cropper
            ref={cropperRef}
            src={src}
            className="max-h-[60vh] w-full md:max-h-full"
            viewMode={1}
            dragMode="move"
            autoCropArea={1}
            background={false}
            responsive
            checkOrientation={false}
            guides
          />
        </div>
      </div>
    </div>
  )
}
