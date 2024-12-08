import { type ButtonHTMLAttributes, forwardRef } from 'react'

import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/shared/utils/class-names'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: '',
        primary: 'bg-btn-primary text-white hover:bg-btn-primary-hover p-2',
        'primary-outline': 'bg-white border-2 border-btn-primary text-black p-2',
        secondary: 'bg-btn-secondary text-btn-primary hover:bg-btn-secondary-hover p-2',
      },
      size: {
        default: 'w-fit h-fit',
        full: 'w-full h-fit',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  },
)

Button.displayName = 'Button'

export { Button, buttonVariants }