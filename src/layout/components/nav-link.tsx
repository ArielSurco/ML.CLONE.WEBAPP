import Link from 'next/link'
import { type ComponentPropsWithoutRef, forwardRef } from 'react'

import { cn } from '@/shared/utils/class-names'

export const NavLink = forwardRef<HTMLAnchorElement, ComponentPropsWithoutRef<typeof Link>>(
  ({ children, className, ...props }, ref) => {
    return (
      <Link
        className={cn('text-nav-link hover:text-nav-link-hover text-sm transition-all', className)}
        ref={ref}
        {...props}
      >
        {children}
      </Link>
    )
  },
)

NavLink.displayName = 'NavLink'
