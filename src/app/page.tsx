import Image from 'next/image'
import Link from 'next/link'

import { AiFillThunderbolt } from 'react-icons/ai'

import { BannersCarousel } from '@/home/components/banners-carousel'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/components/card'
import { Price } from '@/shared/components/price'

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

interface Recommendation {
  product: Product
  title: string
}

const recommendationExample: Recommendation = {
  title: 'Llevate tu favorito',
  product: {
    link: 'https://www.mercadolibre.com.ar/molinillo-de-cafe-moulinex-ar110858-cuo-color-negro/p/MLA26517938#reco_item_pos=0&reco_backend=item_decorator&reco_backend_type=function&reco_client=home_items-decorator-legacy&reco_id=a09d0611-ab13-4641-9e3a-4762e588e6a8&reco_model=&c_id=/home/bookmarks-recommendations-seed/element&c_uid=1ca65b19-e0b4-4956-a8ea-05d4d95578bb&da_id=bookmark&da_position=0&id_origin=/home/dynamic_access&da_sort_algorithm=ranker',
    title: 'Molinillo De Café Moulinex Ar110858 Cuo Color Negro',
    image: 'https://http2.mlstatic.com/D_Q_NP_2X_628973-MLU71283313387_082023-AB.webp',
    previousPrice: 63390,
    price: 47907,
    discount: 24,
    hasFreeShipping: true,
    isFullShipping: true,
  },
}

const recommendationExample2: Recommendation = {
  title: 'Lo querés',
  product: {
    link: 'https://www.mercadolibre.com.ar/pan-dulce-steinhauser-850-gr-con-frutas-estilo-europeo/p/MLA21794372#reco_item_pos=1&reco_backend=item_decorator&reco_backend_type=function&reco_client=home_items-decorator-legacy&reco_id=8f10b8b2-6145-49cd-98ba-0a36dbb66727&reco_model=&c_id=/home/second-best-navigation-trend-recommendations/element&c_uid=9a24e54a-3c7b-415a-8392-221efa2e0f4a&da_id=second_best_navigation_trend&da_position=1&id_origin=/home/dynamic_access&da_sort_algorithm=ranker',
    title: 'Pan Dulce Steinhauser 850 Gr con Frutas Estilo Europeo',
    image: 'https://http2.mlstatic.com/D_Q_NP_2X_785297-MLA80532405315_112024-AB.webp',
    previousPrice: 20000,
    price: 17200,
    discount: 14,
    isFullShipping: true,
  },
}

const recommendations: Recommendation[] = [
  recommendationExample,
  recommendationExample2,
  recommendationExample,
  recommendationExample2,
  recommendationExample,
]

export default function Home() {
  return (
    <div className='group flex flex-col items-center justify-center pb-20'>
      <BannersCarousel />
      <main className='relative w-full max-w-[1180px] p-6 pb-40'>
        <div className='absolute -top-24 flex gap-4'>
          {recommendations.map((recommendation, index) => (
            <Link href={recommendation.product.link} key={index}>
              <Card className='group/card h-full basis-[20%]'>
                <CardHeader className='p-4 pe-3'>
                  <CardTitle as='h2'>{recommendation.title}</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col gap-3 p-4 pt-3'>
                  <Image
                    alt={recommendation.product.title}
                    className='mx-auto'
                    height={105}
                    src={recommendation.product.image}
                    width={105}
                  />
                  <CardDescription className='line-clamp-2 group-hover/card:text-link'>
                    {recommendation.product.title}
                  </CardDescription>
                  <div>
                    {recommendation.product.previousPrice ? (
                      <Price
                        className='text-xs'
                        price={recommendation.product.previousPrice}
                        variant='discounted'
                      />
                    ) : null}
                    <div className='flex flex-wrap items-center gap-2'>
                      <Price className='text-2xl' price={recommendation.product.price} />
                      <span className='text-price-offer text-sm font-normal'>
                        {recommendation.product.discount}% OFF
                      </span>
                    </div>
                  </div>
                  <div className='flex items-end gap-1'>
                    {recommendation.product.hasFreeShipping ? (
                      <span className='text-price-offer text-sm font-semibold'>Envío gratis</span>
                    ) : null}
                    {recommendation.product.isFullShipping ? (
                      <span className='text-price-offer flex items-center text-xs font-bold italic'>
                        <AiFillThunderbolt size={14} />
                        FULL
                      </span>
                    ) : null}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
