interface SkeletonProps {
  variant?: 'text' | 'circle' | 'rectangle'
  width?: string | number
  height?: string | number
  className?: string
}

export default function Skeleton({ variant = 'text', width, height, className = '' }: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-gray-200'

  const variantClasses = {
    text: 'rounded-md',
    circle: 'rounded-full',
    rectangle: 'rounded-lg',
  }

  const defaultDimensions = {
    text: { width: '100%', height: '1.6rem' },
    circle: { width: '4rem', height: '4rem' },
    rectangle: { width: '100%', height: '8rem' },
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{
        width: width ?? defaultDimensions[variant].width,
        height: height ?? defaultDimensions[variant].height,
      }}
    />
  )
}
