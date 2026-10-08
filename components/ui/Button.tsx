import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import Icon, { type IconName } from './Icon'

// Visual styles live in globals.css (.btn, .btn-primary...) so any element can share them.
type Variant = 'primary' | 'secondary' | 'dark'
type Size = 'sm' | 'md' | 'lg' | 'xl'

type Shared = {
  variant?: Variant
  size?: Size
  block?: boolean
  icon?: IconName
  iconSize?: number
  children: ReactNode
  className?: string
}

export function buttonClass({ variant = 'primary', size = 'md', block, className }: Omit<Shared, 'children' | 'icon'>) {
  return ['btn', `btn-${variant}`, size !== 'md' && `btn-${size}`, block && 'btn-block', className].filter(Boolean).join(' ')
}

function Inner({ icon, iconSize = 18, children }: Pick<Shared, 'icon' | 'iconSize' | 'children'>) {
  return (
    <>
      {icon && <Icon name={icon} size={iconSize} strokeWidth={1.8} />}
      {children}
    </>
  )
}

const external = /^(https?:|mailto:|tel:)/

// Internal paths use next/link; mail, phone and other sites use a plain anchor.
export function ButtonLink({
  href,
  variant,
  size,
  block,
  icon,
  iconSize,
  className,
  children,
  ...rest
}: Shared & Omit<ComponentProps<'a'>, 'href' | 'className' | 'children'> & { href: string }) {
  const cls = buttonClass({ variant, size, block, className })
  if (external.test(href)) {
    return (
      <a href={href} className={cls} {...rest}>
        <Inner icon={icon} iconSize={iconSize}>
          {children}
        </Inner>
      </a>
    )
  }
  return (
    <Link href={href} className={cls} {...rest}>
      <Inner icon={icon} iconSize={iconSize}>
        {children}
      </Inner>
    </Link>
  )
}

export function Button({
  variant,
  size,
  block,
  icon,
  iconSize,
  className,
  children,
  type = 'button',
  ...rest
}: Shared & Omit<ComponentProps<'button'>, 'className' | 'children'>) {
  return (
    <button type={type} className={buttonClass({ variant, size, block, className })} {...rest}>
      <Inner icon={icon} iconSize={iconSize}>
        {children}
      </Inner>
    </button>
  )
}
