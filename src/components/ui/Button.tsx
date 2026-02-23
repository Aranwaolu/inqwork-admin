import React from 'react'
import { Link } from 'react-router-dom'
import GoogleMaterialIcon from '@/components/ui/icons/GoogleMaterialIcon'

const variants = {
  primary: 'bg-brand text-white hover:bg-brand-dark disabled:opacity-50',
  secondary: 'bg-brand/10 text-brand hover:bg-brand/20 disabled:opacity-50',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50',
  ghost: 'text-gray-700 hover:bg-gray-100 disabled:opacity-50',
  danger: 'bg-red-600 text-white hover:bg-red-700 disabled:opacity-50',
} as const

const sizes = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2.5 text-sm gap-2',
  lg: 'px-6 py-3 text-base gap-2',
} as const

type Variant = keyof typeof variants
type Size = keyof typeof sizes

interface BaseProps {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  loading?: boolean
  icon?: string
  children: React.ReactNode
  className?: string
}

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & { href?: never }

type ButtonAsLink = BaseProps &
  Omit<React.ComponentPropsWithoutRef<typeof Link>, keyof BaseProps | 'to'> & { href: string }

type ButtonProps = ButtonAsButton | ButtonAsLink

function isLink(props: ButtonProps): props is ButtonAsLink {
  return props.href !== undefined && props.href !== null
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>((props, ref) => {
  const {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    icon,
    children,
    className = '',
    ...rest
  } = props

  const base =
    'inline-flex items-center justify-center font-semibold rounded-lg transition cursor-pointer disabled:cursor-not-allowed'
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`.trim()

  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 22 : 18

  const content = (
    <>
      {loading && (
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {!loading && icon && <GoogleMaterialIcon name={icon} size={iconSize} />}
      {children}
    </>
  )

  if (isLink(props)) {
    const { href, ...linkRest } = rest as Omit<ButtonAsLink, keyof BaseProps>
    return (
      <Link ref={ref as React.Ref<HTMLAnchorElement>} to={href} className={classes} {...linkRest}>
        {content}
      </Link>
    )
  }

  const buttonRest = rest as Omit<ButtonAsButton, keyof BaseProps>
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      disabled={loading || buttonRest.disabled}
      className={classes}
      {...buttonRest}
    >
      {content}
    </button>
  )
})

Button.displayName = 'Button'
export default Button
