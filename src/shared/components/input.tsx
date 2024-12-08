import { type ComponentProps, forwardRef } from 'react'

import { cn } from '../utils/class-names'

const Input = forwardRef<HTMLInputElement, ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        className={cn(
          'placeholder:text-muted-foreground focus:border-link focus-visible:ring-ring selection:bg-selection flex h-9 w-full rounded-sm border border-transparent bg-white px-3 py-1 text-lg shadow-[0_1px_2px_0_rgba(0,0,0,0.2)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
        )}
        ref={ref}
        type={type}
        {...props}
      />
    )
  },
)

Input.displayName = 'Input'

export { Input }
