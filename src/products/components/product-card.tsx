import Image from 'next/image'

import { cva, type VariantProps } from 'class-variance-authority'
import { AiFillThunderbolt } from 'react-icons/ai'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/card'
import { Price } from '@/shared/components/price'
import { cn } from '@/shared/utils/class-names'

interface Product {
  discount?: number
  hasFreeShipping?: boolean
  image: string
  isFullShipping?: boolean
  link: string
  previousPrice?: number
  price: number
  title: string
}

const imageVariants = cva('mx-auto object-contain', {
  variants: {
    size: {
      sm: 'h-[105px] w-[105px]',
      md: 'h-[150px] w-[150px]',
    },
  },
  defaultVariants: {
    size: 'sm',
  },
})

interface ProductCardProps {
  className?: string
  product: Product
  size?: VariantProps<typeof imageVariants>['size']
  title?: string
}

export function ProductCard({ className, title, product, size }: Readonly<ProductCardProps>) {
  return (
    <Card className={cn('group/card h-full min-w-[162px]', className)}>
      {title ? (
        <CardHeader className='p-4 pe-3'>
          <CardTitle as='h2'>{title}</CardTitle>
        </CardHeader>
      ) : null}
      <CardContent className='flex flex-col gap-3 p-4 pt-3'>
        <Image
          alt={product.title}
          className={imageVariants({ size })}
          height={150}
          src={product.image}
          width={150}
        />
        <CardDescription className='line-clamp-2 group-hover/card:text-link'>
          {product.title}
        </CardDescription>
        <div>
          {product.previousPrice ? (
            <Price
              className='text-xs'
              format={{ maximumFractionDigits: 0 }}
              price={product.previousPrice}
              variant='discounted'
            />
          ) : null}
          <div className='flex flex-wrap items-center gap-2'>
            <Price
              className='text-2xl'
              format={{ maximumFractionDigits: 0 }}
              price={product.price}
            />
            <span className='text-sm font-normal text-price-offer'>{product.discount}% OFF</span>
          </div>
        </div>
        <div className='flex items-end gap-1'>
          {product.hasFreeShipping ? (
            <span className='text-sm font-semibold text-price-offer'>Envío gratis</span>
          ) : null}
          {product.isFullShipping ? (
            <span className='flex items-center text-xs font-bold italic text-price-offer'>
              <AiFillThunderbolt size={14} />
              FULL
            </span>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )
}
