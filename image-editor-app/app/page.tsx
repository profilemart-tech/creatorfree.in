import { ImageEditor } from '@/components/image-editor'
import { ToastProvider } from '@/components/toast'

export default function Page() {
  return (
    <ToastProvider>
      <ImageEditor />
    </ToastProvider>
  )
}
