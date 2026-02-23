interface GoogleMaterialIconProps {
  name: string
  size?: number
  fill?: boolean
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700
  className?: string
  style?: React.CSSProperties
}

export default function GoogleMaterialIcon({
  name,
  size = 24,
  fill = false,
  weight = 400,
  className = '',
  style,
}: GoogleMaterialIconProps) {
  return (
    <span
      className={`material-symbols-outlined ${className}`}
      style={{
        fontSize: `${size}px`,
        fontVariationSettings: `'FILL' ${fill ? 1 : 0}, 'wght' ${weight}, 'GRAD' 0, 'opsz' ${size}`,
        ...style,
      }}
    >
      {name}
    </span>
  )
}
