import { forwardRef, type HTMLAttributes } from 'react'

import { cn } from '@/shared/utils/class-names'

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      className={cn('rounded-md bg-white text-foreground shadow', className)}
      ref={ref}
      {...props}
    />
  ),
)

Card.displayName = 'Card'

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div className={cn('flex flex-col space-y-1.5 p-6', className)} ref={ref} {...props} />
  ),
)

CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & { as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' }
>(({ className, as: Component = 'h2', ...props }, ref) => (
  <Component className={cn('font-semibold leading-none', className)} ref={ref} {...props} />
))

CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div className={cn('text-muted-foreground text-sm', className)} ref={ref} {...props} />
  ),
)

CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div className={cn('text-sm font-normal', className)} ref={ref} {...props} />
  ),
)

CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div className={cn('flex items-center p-6 pt-0', className)} ref={ref} {...props} />
  ),
)

CardFooter.displayName = 'CardFooter'

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
