import { useState, useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import GoogleMaterialIcon from '@/components/ui/icons/GoogleMaterialIcon'

export interface SelectOption {
  label: string
  value: string
}

interface SelectProps {
  label?: string
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  searchable?: boolean
  error?: string
  disabled?: boolean
  className?: string
}

export default function Select({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select...',
  searchable = false,
  error,
  disabled = false,
  className = '',
}: SelectProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [highlightIndex, setHighlightIndex] = useState(0)
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 })

  const triggerRef = useRef<HTMLButtonElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const filtered =
    searchable && search ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase())) : options

  const selectedLabel = options.find((o) => o.value === value)?.label

  const updatePosition = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: Math.max(rect.width, 180),
      })
    }
  }, [])

  const close = useCallback(() => {
    setOpen(false)
    setSearch('')
    setHighlightIndex(0)
  }, [])

  const handleToggle = useCallback(() => {
    if (disabled) return
    if (open) {
      close()
    } else {
      updatePosition()
      setOpen(true)
      setHighlightIndex(0)
    }
  }, [disabled, open, close, updatePosition])

  // Close on outside click — use setTimeout to avoid race condition with trigger click
  useEffect(() => {
    if (!open) return

    let mounted = true

    const handleClick = (e: MouseEvent) => {
      if (!mounted) return
      const target = e.target as Node
      if (triggerRef.current?.contains(target)) return
      if (listRef.current?.contains(target)) return
      close()
    }

    // Delay listener registration to avoid catching the opening click
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClick)
    }, 0)

    return () => {
      mounted = false
      clearTimeout(timer)
      document.removeEventListener('mousedown', handleClick)
    }
  }, [open, close])

  // Reposition on scroll/resize
  useEffect(() => {
    if (!open) return

    const handleReposition = () => updatePosition()
    window.addEventListener('scroll', handleReposition, true)
    window.addEventListener('resize', handleReposition)
    return () => {
      window.removeEventListener('scroll', handleReposition, true)
      window.removeEventListener('resize', handleReposition)
    }
  }, [open, updatePosition])

  // Focus search input when dropdown opens
  useEffect(() => {
    if (open && searchable) {
      requestAnimationFrame(() => searchInputRef.current?.focus())
    }
  }, [open, searchable])

  // Reset highlight when search changes
  useEffect(() => {
    setHighlightIndex(0)
  }, [search])

  // Keyboard navigation — works on both trigger and portal search input
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
          e.preventDefault()
          handleToggle()
        }
        return
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setHighlightIndex((prev) => (prev + 1) % Math.max(filtered.length, 1))
          break
        case 'ArrowUp':
          e.preventDefault()
          setHighlightIndex((prev) => (prev - 1 + filtered.length) % Math.max(filtered.length, 1))
          break
        case 'Enter':
          e.preventDefault()
          if (filtered[highlightIndex]) {
            onChange(filtered[highlightIndex].value)
            close()
            triggerRef.current?.focus()
          }
          break
        case 'Escape':
          e.preventDefault()
          close()
          triggerRef.current?.focus()
          break
      }
    },
    [open, filtered, highlightIndex, onChange, close, handleToggle]
  )

  return (
    <div className={className} onKeyDown={handleKeyDown}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}

      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className="flex w-full items-center justify-between gap-2 text-left text-sm outline-none"
        style={{
          minWidth: 140,
          height: 40,
          padding: '10px 12px',
          borderRadius: 6,
          border: `2px solid ${error ? '#ef4444' : open ? '#5e17eb' : 'transparent'}`,
          backgroundColor: disabled ? '#e5e7eb' : open ? '#fff' : '#f3f4f6',
          color: disabled ? '#9ca3af' : '#111827',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.7 : 1,
          transition: 'all 0.2s ease',
        }}
      >
        <span
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            color: selectedLabel ? undefined : '#9ca3af',
          }}
        >
          {selectedLabel || placeholder}
        </span>
        <GoogleMaterialIcon
          name="expand_more"
          size={20}
          className="shrink-0"
          style={{
            color: '#9ca3af',
            transition: 'transform 0.2s ease',
            transform: open ? 'rotate(180deg)' : undefined,
          }}
        />
      </button>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}

      {/* Dropdown list — portaled to body */}
      {open &&
        createPortal(
          <div
            ref={listRef}
            onKeyDown={handleKeyDown}
            style={{
              position: 'absolute',
              top: position.top + 4,
              left: position.left,
              width: position.width,
              zIndex: 9999,
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: 6,
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              overflow: 'hidden',
            }}
          >
            {/* Search input */}
            {searchable && (
              <div style={{ padding: '8px 12px', borderBottom: '1px solid #f3f4f6' }}>
                <div
                  className="flex items-center gap-2"
                  style={{ border: '1px solid #e5e7eb', borderRadius: 4, padding: '4px 8px' }}
                >
                  <GoogleMaterialIcon name="search" size={16} className="shrink-0" style={{ color: '#9ca3af' }} />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search..."
                    className="flex-1 bg-transparent outline-none text-sm text-gray-900 placeholder:text-gray-400"
                    style={{ padding: 0 }}
                  />
                </div>
              </div>
            )}

            {/* Options */}
            <SimpleBar style={{ maxHeight: 200 }} autoHide={false}>
              {filtered.length === 0 ? (
                <div style={{ padding: '10px 12px', fontSize: 14, color: '#9ca3af' }}>No options available</div>
              ) : (
                filtered.map((option, index) => (
                  <div
                    key={option.value}
                    role="option"
                    aria-selected={option.value === value}
                    onClick={() => {
                      onChange(option.value)
                      close()
                      triggerRef.current?.focus()
                    }}
                    onMouseEnter={() => setHighlightIndex(index)}
                    style={{
                      padding: '10px 12px',
                      fontSize: 14,
                      backgroundColor:
                        option.value === value ? '#f3eefe' : index === highlightIndex ? '#f3f4f6' : undefined,
                      color: option.value === value ? '#5e17eb' : '#1f2937',
                      fontWeight: option.value === value ? 500 : 400,
                      cursor: 'pointer',
                      transition: 'background-color 0.15s ease',
                    }}
                  >
                    {option.label}
                  </div>
                ))
              )}
            </SimpleBar>
          </div>,
          document.body
        )}
    </div>
  )
}
