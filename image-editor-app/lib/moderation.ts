import type { NSFWJS, PredictionType } from 'nsfwjs'

// NSFW classes considered "adult" content. We sum their probabilities.
const ADULT_CLASSES = new Set(['Porn', 'Hentai', 'Sexy'])

// Probability threshold above which an image is rejected.
export const NSFW_THRESHOLD = 0.6

export type ModerationResult = {
  blocked: boolean
  score: number
  predictions: PredictionType[]
}

let modelPromise: Promise<NSFWJS> | null = null

/**
 * Lazily load the NSFW model once and cache it. The model weights are bundled
 * with nsfwjs (MobileNetV2), so this runs fully client-side with no server.
 */
async function getModel(): Promise<NSFWJS> {
  if (!modelPromise) {
    modelPromise = (async () => {
      const tf = await import('@tensorflow/tfjs')
      await tf.ready()
      const nsfwjs = await import('nsfwjs')
      return nsfwjs.load()
    })().catch((err) => {
      // Reset so a later attempt can retry after a transient failure.
      modelPromise = null
      throw err
    })
  }
  return modelPromise
}

/** Warm up the model in the background (e.g. on first user interaction). */
export function preloadModerationModel(): void {
  void getModel().catch(() => {})
}

/**
 * Classify an image element and decide whether it should be blocked.
 * Returns the aggregate adult-content score and raw predictions.
 */
export async function moderateImage(img: HTMLImageElement): Promise<ModerationResult> {
  const model = await getModel()
  const predictions = await model.classify(img)
  const score = predictions
    .filter((p) => ADULT_CLASSES.has(p.className))
    .reduce((sum, p) => sum + p.probability, 0)

  return {
    blocked: score > NSFW_THRESHOLD,
    score,
    predictions,
  }
}
