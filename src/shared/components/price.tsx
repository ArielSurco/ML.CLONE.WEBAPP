import { forwardRef, type ComponentPropsWithoutRef } from 'react'

import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../utils/class-names'

const priceVariants = cva('text-sm flex items-center font-normal', {
  variants: {
    variant: {
      default: 'text-price',
      discounted: 'text-price-discounted line-through',
      offer: 'text-price-offer',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

interface PriceProps extends ComponentPropsWithoutRef<'div'>, VariantProps<typeof priceVariants> {
  format?: Intl.NumberFormatOptions
  price: number
}

const Price = forwardRef<HTMLDivElement, PriceProps>(
  ({ className, variant, price, format, ...props }, ref) => {
    const formattedPrice = new Intl.NumberFormat('de-DE', {
      maximumFractionDigits: 2,
      ...format,
    }).format(price)

    return (
      <span className={cn(priceVariants({ variant, className }))} ref={ref} {...props}>
        $ {formattedPrice}
      </span>
    )
  },
)

Price.displayName = 'Price'

export { Price, priceVariants }
