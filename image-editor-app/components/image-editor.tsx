'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  Aperture,
  Crop as CropIcon,
  Download,
  FlipHorizontal2,
  FlipVertical2,
  Layers,
  RotateCcw,
  RotateCcwSquare,
  RotateCw,
  Scaling,
  SlidersHorizontal,
  Upload,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ControlSlider } from '@/components/control-slider'
import { UploadDropzone } from '@/components/upload-dropzone'
import { LoadingOverlay } from '@/components/loading-overlay'
import { CropDialog } from '@/components/crop-dialog'
import { ResizePanel } from '@/components/resize-panel'
import { BackgroundPanel } from '@/components/background-panel'
import { useToast } from '@/components/toast'
import {
  ADJUSTMENT_CONFIG,
  type Adjustments,
  DEFAULT_ADJUSTMENTS,
  DEFAULT_TRANSFORM,
  FILTER_PRESETS,
  type Transform,
  buildFilterString,
  canvasToImage,
  imageToDataURL,
  isDefaultAdjustments,
  loadImageFromFile,
  renderToCanvas,
  resizeImage,
} from '@/lib/editor'
import { moderateImage, preloadModerationModel } from '@/lib/moderation'
import { compositeBackground, removeImageBackground } from '@/lib/background'

type Tool = 'adjust' | 'crop' | 'resize' | 'background'

type OverlayState = {
  active: boolean
  title: string
  subtitle?: string
  progress?: number
}

const TOOLS: { id: Tool; label: string; icon: React.ElementType }[] = [
  { id: 'adjust', label: 'Adjust', icon: SlidersHorizontal },
  { id: 'crop', label: 'Crop', icon: CropIcon },
  { id: 'resize', label: 'Resize', icon: Scaling },
  { id: 'background', label: 'Background', icon: Layers },
]

export function ImageEditor() {
  const { toast } = useToast()

  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [baseSrc, setBaseSrc] = useState<string>('') // dataURL for <img> previews + crop
  const [fileName, setFileName] = useState<string>('image')
  const [hasCutout, setHasCutout] = useState(false)

  const [adjustments, setAdjustments] = useState<Adjustments>(DEFAULT_ADJUSTMENTS)
  const [transform, setTransform] = useState<Transform>(DEFAULT_TRANSFORM)
  const [activePreset, setActivePreset] = useState<string>('Original')

  const [tool, setTool] = useState<Tool>('adjust')
  const [overlay, setOverlay] = useState<OverlayState>({ active: false, title: '' })
  const [cropSrc, setCropSrc] = useState<string | null>(null)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Warm up the moderation model so the first upload scans quickly.
  useEffect(() => {
    preloadModerationModel()
  }, [])

  /** Apply a brand new base image and reset all non-destructive edits. */
  const applyNewBase = useCallback((img: HTMLImageElement, cutout = false) => {
    setImage(img)
    setBaseSrc(imageToDataURL(img))
    setAdjustments(DEFAULT_ADJUSTMENTS)
    setTransform(DEFAULT_TRANSFORM)
    setActivePreset('Original')
    setHasCutout(cutout)
  }, [])

  /** Upload pipeline: moderate first, then load onto the canvas. */
  const loadFile = useCallback(
    async (file: File) => {
      if (!file.type.startsWith('image/')) {
        toast('Please choose a valid image file.', 'error')
        return
      }
      setOverlay({
        active: true,
        title: 'Scanning image',
        subtitle: 'Checking content safety before loading…',
      })
      try {
        const img = await loadImageFromFile(file)
        const result = await moderateImage(img)
        if (result.blocked) {
          toast('⚠️ Adult/NSFW content detected. Please upload appropriate images.', 'error')
          return
        }
        setFileName(file.name.replace(/\.[^/.]+$/, '') || 'image')
        applyNewBase(img)
      } catch (err) {
        console.log('[v0] upload/moderation error:', err)
        toast('Could not process that image. Please try another file.', 'error')
      } finally {
        setOverlay({ active: false, title: '' })
      }
    },
    [applyNewBase, toast],
  )

  // Draw a preview capped to a sensible max dimension for performance.
  useEffect(() => {
    if (!image || !canvasRef.current) return
    const maxPreview = 1400
    const longest = Math.max(image.naturalWidth, image.naturalHeight)
    const scale = longest > maxPreview ? maxPreview / longest : 1
    renderToCanvas(canvasRef.current, image, adjustments, transform, scale)
  }, [image, adjustments, transform])

  const updateAdjustment = (key: keyof Adjustments, value: number) => {
    setAdjustments((prev) => ({ ...prev, [key]: value }))
    setActivePreset('Custom')
  }

  const applyPreset = (name: string, presetAdjustments: Adjustments) => {
    setAdjustments(presetAdjustments)
    setActivePreset(name)
  }

  const rotate = (dir: 1 | -1) => {
    setTransform((prev) => ({
      ...prev,
      rotation: (((prev.rotation + dir * 90) % 360) + 360) % 360,
    }))
  }

  const resetAll = () => {
    setAdjustments(DEFAULT_ADJUSTMENTS)
    setTransform(DEFAULT_TRANSFORM)
    setActivePreset('Original')
  }

  /** Render the current base + adjustments + transform to a full-res image. */
  const getRenderedImage = useCallback(async (): Promise<HTMLImageElement> => {
    if (!image) throw new Error('No image')
    const canvas = document.createElement('canvas')
    renderToCanvas(canvas, image, adjustments, transform, 1)
    return canvasToImage(canvas)
  }, [image, adjustments, transform])

  // --- Crop ---
  const openCrop = () => {
    if (!image) return
    const canvas = document.createElement('canvas')
    renderToCanvas(canvas, image, adjustments, transform, 1)
    setCropSrc(canvas.toDataURL('image/png'))
  }

  const handleCropApply = (cropped: HTMLImageElement) => {
    setCropSrc(null)
    applyNewBase(cropped, hasCutout)
    toast('Crop applied.', 'success')
  }

  // --- Resize ---
  const handleResize = async (width: number, height: number) => {
    setOverlay({ active: true, title: 'Resizing image' })
    try {
      const rendered = await getRenderedImage()
      const resized = await resizeImage(rendered, width, height)
      applyNewBase(resized, hasCutout)
      toast(`Resized to ${width} × ${height} px.`, 'success')
    } catch (err) {
      console.log('[v0] resize error:', err)
      toast('Resize failed. Please try again.', 'error')
    } finally {
      setOverlay({ active: false, title: '' })
    }
  }

  // --- Background removal ---
  const handleRemoveBackground = async () => {
    if (!image) return
    setOverlay({
      active: true,
      title: 'Removing background',
      subtitle: 'Running AI cutout locally…',
      progress: 0,
    })
    try {
      const rendered = await getRenderedImage()
      const cutout = await removeImageBackground(rendered, (ratio) => {
        setOverlay((prev) => ({ ...prev, progress: ratio }))
      })
      applyNewBase(cutout, true)
      toast('Background removed.', 'success')
    } catch (err) {
      console.log('[v0] background removal error:', err)
      toast('Background removal failed. Please try again.', 'error')
    } finally {
      setOverlay({ active: false, title: '' })
    }
  }

  // --- Change background ---
  const applyBackground = async (
    bg:
      | { type: 'solid'; color: string }
      | { type: 'gradient'; from: string; to: string }
      | { type: 'image'; image: HTMLImageElement },
  ) => {
    if (!image) return
    setOverlay({ active: true, title: 'Applying background' })
    try {
      const rendered = await getRenderedImage()
      const composed = await compositeBackground(rendered, bg)
      applyNewBase(composed, false)
      toast('Background applied.', 'success')
    } catch (err) {
      console.log('[v0] apply background error:', err)
      toast('Could not apply background. Please try again.', 'error')
    } finally {
      setOverlay({ active: false, title: '' })
    }
  }

  const handleApplyBackgroundImage = async (file: File) => {
    try {
      const bgImage = await loadImageFromFile(file)
      await applyBackground({ type: 'image', image: bgImage })
    } catch {
      toast('Could not load that background image.', 'error')
    }
  }

  const download = async () => {
    if (!image) return
    const out = document.createElement('canvas')
    renderToCanvas(out, image, adjustments, transform, 1)
    const link = document.createElement('a')
    link.download = `${fileName}-edited.png`
    link.href = out.toDataURL('image/png')
    link.click()
  }

  const isEdited =
    !isDefaultAdjustments(adjustments) ||
    transform.rotation !== 0 ||
    transform.flipH ||
    transform.flipV

  return (
    <div className="flex h-dvh flex-col bg-background text-foreground">
      {/* Header */}
      <header className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 md:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Aperture className="size-5" aria-hidden="true" />
          </div>
          <div className="leading-tight">
            <h1 className="text-sm font-semibold tracking-tight">Aperture</h1>
            <p className="hidden text-xs text-muted-foreground sm:block">
              Private, in-browser image editor
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {image && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetAll}
                disabled={!isEdited}
                className="gap-1.5"
              >
                <RotateCcwSquare className="size-4" aria-hidden="true" />
                <span className="hidden sm:inline">Reset</span>
              </Button>
              <UploadButton onFile={loadFile} variant="outline" label="Replace" />
              <Button size="sm" onClick={download} className="gap-1.5">
                <Download className="size-4" aria-hidden="true" />
                <span className="hidden sm:inline">Download</span>
              </Button>
            </>
          )}
        </div>
      </header>

      {/* Body */}
      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        {/* Canvas area */}
        <main className="relative flex min-h-0 flex-1 items-center justify-center overflow-auto bg-[oklch(0.13_0.005_285)] p-4 md:p-8">
          {image ? (
            <div className="relative max-h-full max-w-full">
              <canvas
                ref={canvasRef}
                className={`max-h-[calc(100dvh-8rem)] max-w-full rounded-md shadow-2xl shadow-black/50 ring-1 ring-border ${
                  hasCutout ? 'bg-checkerboard' : ''
                }`}
              />
            </div>
          ) : (
            <UploadDropzone onFile={loadFile} />
          )}
          <LoadingOverlay
            active={overlay.active}
            title={overlay.title}
            subtitle={overlay.subtitle}
            progress={overlay.progress}
          />
        </main>

        {/* Controls sidebar */}
        {image && (
          <aside className="flex w-full shrink-0 flex-col border-t border-border bg-sidebar md:w-80 md:border-l md:border-t-0">
            {/* Tool tabs */}
            <div className="grid shrink-0 grid-cols-4 gap-1 border-b border-border p-2">
              {TOOLS.map((t) => {
                const Icon = t.icon
                const active = tool === t.id
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTool(t.id)}
                    aria-pressed={active}
                    className={`flex flex-col items-center gap-1 rounded-md px-1 py-2 text-[11px] font-medium transition-colors ${
                      active
                        ? 'bg-secondary text-foreground'
                        : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                    }`}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    {t.label}
                  </button>
                )
              })}
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
              {tool === 'adjust' && (
                <>
                  <section className="border-b border-border p-4">
                    <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Filters
                    </h2>
                    <div className="grid grid-cols-4 gap-2">
                      {FILTER_PRESETS.map((preset) => (
                        <PresetThumb
                          key={preset.name}
                          name={preset.name}
                          src={baseSrc}
                          filter={buildFilterString(preset.adjustments)}
                          active={activePreset === preset.name}
                          onClick={() => applyPreset(preset.name, preset.adjustments)}
                        />
                      ))}
                    </div>
                  </section>

                  <section className="border-b border-border p-4">
                    <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Adjustments
                    </h2>
                    <div className="space-y-4">
                      {ADJUSTMENT_CONFIG.map((config) => (
                        <ControlSlider
                          key={config.key}
                          label={config.label}
                          value={adjustments[config.key]}
                          min={config.min}
                          max={config.max}
                          step={config.step}
                          unit={config.unit}
                          defaultValue={config.default}
                          onChange={(v) => updateAdjustment(config.key, v)}
                        />
                      ))}
                    </div>
                  </section>

                  <section className="p-4">
                    <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Transform
                    </h2>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => rotate(-1)}
                        className="gap-1.5"
                      >
                        <RotateCcw className="size-4" aria-hidden="true" />
                        Left
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => rotate(1)}
                        className="gap-1.5"
                      >
                        <RotateCw className="size-4" aria-hidden="true" />
                        Right
                      </Button>
                      <Button
                        variant={transform.flipH ? 'default' : 'secondary'}
                        size="sm"
                        onClick={() => setTransform((p) => ({ ...p, flipH: !p.flipH }))}
                        className="gap-1.5"
                      >
                        <FlipHorizontal2 className="size-4" aria-hidden="true" />
                        Flip H
                      </Button>
                      <Button
                        variant={transform.flipV ? 'default' : 'secondary'}
                        size="sm"
                        onClick={() => setTransform((p) => ({ ...p, flipV: !p.flipV }))}
                        className="gap-1.5"
                      >
                        <FlipVertical2 className="size-4" aria-hidden="true" />
                        Flip V
                      </Button>
                    </div>
                  </section>
                </>
              )}

              {tool === 'crop' && (
                <section className="p-4">
                  <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Crop
                  </h2>
                  <p className="mb-4 text-xs text-muted-foreground text-pretty">
                    Open the crop editor to trim your image with freeform or preset aspect ratios
                    (1:1, 16:9, 9:16 and more).
                  </p>
                  <Button className="w-full gap-1.5" size="sm" onClick={openCrop}>
                    <CropIcon className="size-4" aria-hidden="true" />
                    Open crop editor
                  </Button>
                </section>
              )}

              {tool === 'resize' && (
                <section className="p-4">
                  <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Resize
                  </h2>
                  <ResizePanel
                    naturalWidth={image.naturalWidth}
                    naturalHeight={image.naturalHeight}
                    onApply={handleResize}
                  />
                </section>
              )}

              {tool === 'background' && (
                <section className="p-4">
                  <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Background
                  </h2>
                  <BackgroundPanel
                    hasCutout={hasCutout}
                    onRemoveBackground={handleRemoveBackground}
                    onApplySolid={(color) => applyBackground({ type: 'solid', color })}
                    onApplyGradient={(from, to) => applyBackground({ type: 'gradient', from, to })}
                    onApplyImage={handleApplyBackgroundImage}
                  />
                </section>
              )}
            </div>
          </aside>
        )}
      </div>

      {cropSrc && (
        <CropDialog src={cropSrc} onCancel={() => setCropSrc(null)} onApply={handleCropApply} />
      )}
    </div>
  )
}

/** A hidden-input upload button used in the header. */
function UploadButton({
  onFile,
  variant = 'outline',
  label,
}: {
  onFile: (file: File) => void
  variant?: 'outline' | 'default'
  label: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <>
      <Button
        variant={variant}
        size="sm"
        onClick={() => inputRef.current?.click()}
        className="gap-1.5"
      >
        <Upload className="size-4" aria-hidden="true" />
        <span className="hidden sm:inline">{label}</span>
      </Button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onFile(file)
          e.target.value = ''
        }}
      />
    </>
  )
}

/** A small live filter preview thumbnail for a preset. */
function PresetThumb({
  name,
  src,
  filter,
  active,
  onClick,
}: {
  name: string
  src: string
  filter: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="group flex flex-col items-center gap-1 focus:outline-none"
    >
      <span
        className={`relative block size-full aspect-square overflow-hidden rounded-md ring-2 transition-all ${
          active ? 'ring-primary' : 'ring-transparent group-hover:ring-border'
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src || '/placeholder.svg'}
          alt=""
          aria-hidden="true"
          className="size-full object-cover"
          style={{ filter }}
        />
      </span>
      <span
        className={`w-full truncate text-center text-[10px] ${
          active ? 'font-medium text-foreground' : 'text-muted-foreground'
        }`}
      >
        {name}
      </span>
    </button>
  )
}
