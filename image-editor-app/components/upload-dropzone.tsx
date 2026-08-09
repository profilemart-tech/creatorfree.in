'use client'

import { useRef, useState } from 'react'
import { ImagePlus, Lock } from 'lucide-react'

export function UploadDropzone({ onFile }: { onFile: (file: File) => void }) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="mx-auto w-full max-w-lg">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          const file = e.dataTransfer.files?.[0]
          if (file) onFile(file)
        }}
        className={`flex w-full flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed px-6 py-16 text-center transition-colors ${
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-border bg-card/40 hover:border-muted-foreground/50 hover:bg-card/70'
        }`}
      >
        <div className="flex size-14 items-center justify-center rounded-full bg-secondary text-primary">
          <ImagePlus className="size-7" aria-hidden="true" />
        </div>
        <div className="space-y-1">
          <p className="text-base font-medium text-foreground text-balance">
            Drop a photo here or click to upload
          </p>
          <p className="text-sm text-muted-foreground text-pretty">
            PNG, JPG, WebP, or GIF. Edit brightness, filters, transforms and more.
          </p>
        </div>
        <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Lock className="size-3" aria-hidden="true" />
          Everything is processed locally in your browser
        </p>
      </button>
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
    </div>
  )
}
