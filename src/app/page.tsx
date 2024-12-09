import Link from 'next/link'

import { BannersCarousel } from '@/home/components/banners-carousel'
import { ProductCard } from '@/products/components/product-card'
import { createClient } from '@/shared/supabase/client'

export default async function Home() {
  const supabase = createClient()
  const { data } = await supabase.from('products').select('*').limit(10)

  const products = data?.map((product) => {
    const reverseDiscount = 1 - (product.discount ?? 0) / 100

    return {
      id: product.id,
      link: `/products/${product.id}`,
      title: product.title ?? '',
      image: product.image ?? '',
      price: product.price ?? 0,
      previousPrice: (product.price ?? 0) / reverseDiscount,
      discount: product.discount ?? 0,
      hasFreeShipping: Boolean(product.free_shipping),
      isFullShipping: Boolean(product.full_shipping),
    }
  })

  return (
    <div className='group flex flex-col items-center justify-center pb-20'>
      <BannersCarousel />
      <main className='relative w-full max-w-[1180px] p-6 pb-40'>
        <div className='absolute -top-24 flex gap-4 pr-6'>
          {products?.map((product) => (
            <Link className='basis-[20%]' href={product.link} key={product.id}>
              <ProductCard key={product.id} product={product} />
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
