import { useState, useRef, useCallback } from 'react'
import GoogleMaterialIcon from '@/components/ui/icons/GoogleMaterialIcon'

interface SearchBarProps {
  onSearch?: (value: string) => void
  delay?: number
  placeholder?: string
  defaultValue?: string
  width?: number | string
  className?: string
}

export default function SearchBar({
  onSearch,
  delay = 600,
  placeholder = 'Search',
  defaultValue = '',
  width = 400,
  className = '',
}: SearchBarProps) {
  const [value, setValue] = useState(defaultValue)
  const [focused, setFocused] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setValue(newValue)
      const trimmed = newValue.trim()

      if (timeoutRef.current) clearTimeout(timeoutRef.current)

      if (!trimmed) {
        onSearch?.('')
        return
      }

      timeoutRef.current = setTimeout(() => {
        onSearch?.(trimmed)
      }, delay)
    },
    [onSearch, delay]
  )

  const resolvedWidth = typeof width === 'number' ? `${width}px` : width

  return (
    <div
      className={`flex items-center gap-3 bg-white ${className}`}
      style={{
        width: resolvedWidth,
        height: 40,
        borderRadius: 5,
        padding: '9px 15px',
        border: `1px solid ${focused ? '#5e17eb' : '#e1e6e9'}`,
        transition: 'border-color 0.2s ease-in-out',
      }}
    >
      <GoogleMaterialIcon name="search" size={22} className="text-gray-400 shrink-0" />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="flex-1 bg-transparent outline-none text-gray-900 placeholder:text-gray-400"
        style={{ fontSize: 15, padding: 0 }}
      />
    </div>
  )
}
