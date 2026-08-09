export type Adjustments = {
  brightness: number
  contrast: number
  saturate: number
  grayscale: number
  sepia: number
  hueRotate: number
  blur: number
}

export type Transform = {
  rotation: number // degrees: 0, 90, 180, 270
  flipH: boolean
  flipV: boolean
}

export const DEFAULT_ADJUSTMENTS: Adjustments = {
  brightness: 100,
  contrast: 100,
  saturate: 100,
  grayscale: 0,
  sepia: 0,
  hueRotate: 0,
  blur: 0,
}

export const DEFAULT_TRANSFORM: Transform = {
  rotation: 0,
  flipH: false,
  flipV: false,
}

export type AdjustmentConfig = {
  key: keyof Adjustments
  label: string
  min: number
  max: number
  step: number
  unit: string
  default: number
}

export const ADJUSTMENT_CONFIG: AdjustmentConfig[] = [
  { key: 'brightness', label: 'Brightness', min: 0, max: 200, step: 1, unit: '%', default: 100 },
  { key: 'contrast', label: 'Contrast', min: 0, max: 200, step: 1, unit: '%', default: 100 },
  { key: 'saturate', label: 'Saturation', min: 0, max: 200, step: 1, unit: '%', default: 100 },
  { key: 'grayscale', label: 'Grayscale', min: 0, max: 100, step: 1, unit: '%', default: 0 },
  { key: 'sepia', label: 'Sepia', min: 0, max: 100, step: 1, unit: '%', default: 0 },
  { key: 'hueRotate', label: 'Hue', min: 0, max: 360, step: 1, unit: '°', default: 0 },
  { key: 'blur', label: 'Blur', min: 0, max: 20, step: 0.5, unit: 'px', default: 0 },
]

export type FilterPreset = {
  name: string
  adjustments: Adjustments
}

export const FILTER_PRESETS: FilterPreset[] = [
  { name: 'Original', adjustments: DEFAULT_ADJUSTMENTS },
  {
    name: 'Vivid',
    adjustments: { ...DEFAULT_ADJUSTMENTS, saturate: 160, contrast: 115, brightness: 105 },
  },
  {
    name: 'Mono',
    adjustments: { ...DEFAULT_ADJUSTMENTS, grayscale: 100, contrast: 110 },
  },
  {
    name: 'Sepia',
    adjustments: { ...DEFAULT_ADJUSTMENTS, sepia: 70, saturate: 120, brightness: 105 },
  },
  {
    name: 'Cool',
    adjustments: { ...DEFAULT_ADJUSTMENTS, hueRotate: 190, saturate: 115 },
  },
  {
    name: 'Warm',
    adjustments: { ...DEFAULT_ADJUSTMENTS, sepia: 30, saturate: 130, brightness: 105 },
  },
  {
    name: 'Vintage',
    adjustments: { ...DEFAULT_ADJUSTMENTS, sepia: 45, contrast: 90, brightness: 110, saturate: 85 },
  },
  {
    name: 'Faded',
    adjustments: { ...DEFAULT_ADJUSTMENTS, contrast: 85, brightness: 108, saturate: 75 },
  },
]

/** Load an HTMLImageElement from a Blob, revoking the object URL when done. */
export function loadImageFromBlob(blob: Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(blob)
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Failed to load image'))
    }
    img.src = url
  })
}

/** Load an HTMLImageElement from a File. */
export function loadImageFromFile(file: File): Promise<HTMLImageElement> {
  return loadImageFromBlob(file)
}

/**
 * Produce a self-contained data URL (PNG) from an image element. Used for
 * <img> previews so display no longer depends on a revocable object URL.
 */
export function imageToDataURL(image: HTMLImageElement): string {
  const canvas = document.createElement('canvas')
  canvas.width = image.naturalWidth
  canvas.height = image.naturalHeight
  const ctx = canvas.getContext('2d')
  if (!ctx) return image.src
  ctx.drawImage(image, 0, 0)
  return canvas.toDataURL('image/png')
}

/** Convert a canvas to a fresh HTMLImageElement (PNG, preserves alpha). */
export function canvasToImage(canvas: HTMLCanvasElement): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) return reject(new Error('Canvas is empty'))
      loadImageFromBlob(blob).then(resolve, reject)
    }, 'image/png')
  })
}

/**
 * Resize an image to the given pixel dimensions, returning a new image element.
 * Uses high-quality smoothing.
 */
export function resizeImage(
  image: HTMLImageElement,
  width: number,
  height: number,
): Promise<HTMLImageElement> {
  const canvas = document.createElement('canvas')
  canvas.width = Math.max(1, Math.round(width))
  canvas.height = Math.max(1, Math.round(height))
  const ctx = canvas.getContext('2d')
  if (!ctx) return Promise.reject(new Error('Canvas context unavailable'))
  ctx.imageSmoothingEnabled = true
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
  return canvasToImage(canvas)
}

export type AspectRatioPreset = {
  name: string
  label: string
  value: number | null // null = freeform
}

export const ASPECT_RATIOS: AspectRatioPreset[] = [
  { name: 'free', label: 'Freeform', value: null },
  { name: '1:1', label: '1:1 Square', value: 1 },
  { name: '16:9', label: '16:9 Thumbnail', value: 16 / 9 },
  { name: '9:16', label: '9:16 Reels', value: 9 / 16 },
  { name: '4:3', label: '4:3', value: 4 / 3 },
  { name: '3:2', label: '3:2', value: 3 / 2 },
]

/** Build a CSS/canvas filter string from adjustment values. */
export function buildFilterString(a: Adjustments): string {
  return [
    `brightness(${a.brightness}%)`,
    `contrast(${a.contrast}%)`,
    `saturate(${a.saturate}%)`,
    `grayscale(${a.grayscale}%)`,
    `sepia(${a.sepia}%)`,
    `hue-rotate(${a.hueRotate}deg)`,
    `blur(${a.blur}px)`,
  ].join(' ')
}

export function isDefaultAdjustments(a: Adjustments): boolean {
  return (Object.keys(DEFAULT_ADJUSTMENTS) as (keyof Adjustments)[]).every(
    (k) => a[k] === DEFAULT_ADJUSTMENTS[k],
  )
}

/**
 * Render the image onto a canvas with the given adjustments + transform.
 * The canvas is resized to fit the (possibly rotated) image at `scale`.
 */
export function renderToCanvas(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  adjustments: Adjustments,
  transform: Transform,
  scale = 1,
): void {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const rotated = transform.rotation === 90 || transform.rotation === 270
  const iw = image.naturalWidth * scale
  const ih = image.naturalHeight * scale

  canvas.width = rotated ? ih : iw
  canvas.height = rotated ? iw : ih

  ctx.save()
  ctx.filter = buildFilterString(adjustments)
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.rotate((transform.rotation * Math.PI) / 180)
  ctx.scale(transform.flipH ? -1 : 1, transform.flipV ? -1 : 1)
  ctx.drawImage(image, -iw / 2, -ih / 2, iw, ih)
  ctx.restore()
}
