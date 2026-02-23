import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import GoogleMaterialIcon from '@/components/ui/icons/GoogleMaterialIcon'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  footer?: ReactNode
  maxWidth?: string
  children: ReactNode
}

export default function Modal({ isOpen, onClose, title, footer, maxWidth = '50rem', children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full rounded-xl bg-white shadow-xl" style={{ maxWidth }}>
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
          >
            <GoogleMaterialIcon name="close" size={20} />
          </button>
        </div>
        <div className="px-6 py-4">{children}</div>
        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">{footer}</div>
        )}
      </div>
    </div>,
    document.body
  )
}
