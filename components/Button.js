import Link from 'next/link'

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  icon,
}) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-400 hover:shadow-md hover:scale-[1.02] active:scale-[0.98]',
    secondary: 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 hover:border-gray-300 focus:ring-gray-300 hover:shadow-sm',
    outline: 'bg-transparent hover:bg-primary-50 text-primary-600 border border-primary-400 hover:border-primary-500 focus:ring-primary-300',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-400 hover:shadow-md',
    alert: 'bg-alert-500 hover:bg-alert-600 text-white focus:ring-alert-400 hover:shadow-md hover:scale-[1.02]',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-900 focus:ring-gray-300',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-base',
  }

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes}>
        {icon && <span>{icon}</span>}
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {icon && <span>{icon}</span>}
      {children}
    </button>
  )
}
