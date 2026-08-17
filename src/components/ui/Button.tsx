import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'ghost' | 'line'
type Size = 'md' | 'lg'

const base =
  'group relative inline-flex items-center justify-center gap-3 font-display text-eyebrow uppercase ' +
  'transition-colors duration-fast ease-raid disabled:opacity-40 disabled:pointer-events-none'

const variants: Record<Variant, string> = {
  // Sable plein — réservé au CTA principal de chaque page. Un seul par écran.
  primary: 'rounded-pill bg-sand text-ink hover:bg-bone',
  // Contour — CTA secondaire.
  ghost: 'rounded-pill border border-line-strong text-bone hover:border-sand hover:text-sand',
  // Lien souligné — CTA tertiaire, inline dans le contenu.
  line: 'text-bone hover:text-sand',
}

const sizes: Record<Size, string> = {
  md: 'h-11 px-6',
  lg: 'h-14 px-9',
}

type Props = {
  children: React.ReactNode
  to?: string
  href?: string
  variant?: Variant
  size?: Size
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}

const Arrow = () => (
  <span
    aria-hidden
    className="inline-block transition-transform duration-fast ease-raid group-hover:translate-x-1"
  >
    →
  </span>
)

export function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  type = 'button',
  disabled,
}: Props) {
  const isLine = variant === 'line'
  const cls = cn(base, variants[variant], isLine ? 'h-auto p-0' : sizes[size], className)
  const inner = (
    <>
      <span className={isLine ? 'link-underline' : undefined}>{children}</span>
      <Arrow />
    </>
  )

  if (to) return <Link to={to} className={cls} onClick={onClick}>{inner}</Link>
  if (href)
    return (
      <a
        href={href}
        className={cls}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noreferrer noopener' : undefined}
      >
        {inner}
      </a>
    )
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {inner}
    </button>
  )
}
