import { loadImageFromBlob } from '@/lib/editor'

export type GradientStop = { from: string; to: string }

/**
 * Remove the background from an image using @imgly/background-removal.
 * Runs entirely in the browser (WASM + ONNX). Returns an image element whose
 * background is transparent.
 */
export async function removeImageBackground(
  source: HTMLImageElement,
  onProgress?: (ratio: number) => void,
): Promise<HTMLImageElement> {
  const { removeBackground } = await import('@imgly/background-removal')

  // Draw the current image to a canvas first so we always feed the model a
  // clean bitmap regardless of the original source type.
  const canvas = document.createElement('canvas')
  canvas.width = source.naturalWidth
  canvas.height = source.naturalHeight
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas context unavailable')
  ctx.drawImage(source, 0, 0)

  const inputBlob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob failed'))), 'image/png')
  })

  const resultBlob = await removeBackground(inputBlob, {
    output: { format: 'image/png' },
    progress: (_key, current, total) => {
      if (onProgress && total > 0) onProgress(current / total)
    },
  })

  return loadImageFromBlob(resultBlob)
}

/**
 * Composite a foreground (typically a transparent cutout) over a new
 * background. The background can be a solid color, a linear gradient, or an
 * uploaded image (cover-fit). Returns a new flattened image element.
 */
export async function compositeBackground(
  foreground: HTMLImageElement,
  background:
    | { type: 'solid'; color: string }
    | { type: 'gradient'; from: string; to: string; angle?: number }
    | { type: 'image'; image: HTMLImageElement },
): Promise<HTMLImageElement> {
  const w = foreground.naturalWidth
  const h = foreground.naturalHeight
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas context unavailable')

  if (background.type === 'solid') {
    ctx.fillStyle = background.color
    ctx.fillRect(0, 0, w, h)
  } else if (background.type === 'gradient') {
    const angle = ((background.angle ?? 135) * Math.PI) / 180
    // Compute gradient endpoints across the canvas for the given angle.
    const cx = w / 2
    const cy = h / 2
    const len = Math.abs(w * Math.cos(angle)) + Math.abs(h * Math.sin(angle))
    const dx = (Math.cos(angle) * len) / 2
    const dy = (Math.sin(angle) * len) / 2
    const grad = ctx.createLinearGradient(cx - dx, cy - dy, cx + dx, cy + dy)
    grad.addColorStop(0, background.from)
    grad.addColorStop(1, background.to)
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)
  } else {
    // Cover-fit the background image.
    const bg = background.image
    const scale = Math.max(w / bg.naturalWidth, h / bg.naturalHeight)
    const bw = bg.naturalWidth * scale
    const bh = bg.naturalHeight * scale
    ctx.drawImage(bg, (w - bw) / 2, (h - bh) / 2, bw, bh)
  }

  ctx.drawImage(foreground, 0, 0, w, h)
  const blob: Blob = await new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob failed'))), 'image/png')
  })
  return loadImageFromBlob(blob)
}

/** Preset gradient backgrounds. */
export const GRADIENT_PRESETS: { name: string; from: string; to: string }[] = [
  { name: 'Sunset', from: '#f97316', to: '#e11d48' },
  { name: 'Ocean', from: '#0ea5e9', to: '#14b8a6' },
  { name: 'Forest', from: '#22c55e', to: '#065f46' },
  { name: 'Dusk', from: '#6366f1', to: '#0ea5e9' },
  { name: 'Ember', from: '#f59e0b', to: '#7c2d12' },
  { name: 'Slate', from: '#64748b', to: '#1e293b' },
]

/** Preset solid background colors. */
export const SOLID_PRESETS: string[] = [
  '#ffffff',
  '#000000',
  '#ef4444',
  '#f59e0b',
  '#22c55e',
  '#0ea5e9',
  '#6366f1',
  '#ec4899',
]
