import Image from 'next/image'

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/shared/components/carousel'

const slidesImages = [
  'https://http2.mlstatic.com/D_NQ_954980-MLA80897095780_122024-OO.webp',
  'https://http2.mlstatic.com/D_NQ_921186-MLA81163355469_122024-OO.webp',
  'https://http2.mlstatic.com/D_NQ_844495-MLA81214170443_122024-OO.webp',
  'https://http2.mlstatic.com/D_NQ_861319-MLA80897927976_122024-OO.webp',
  'https://http2.mlstatic.com/D_NQ_934578-MLA81214194351_122024-OO.webp',
  'https://http2.mlstatic.com/D_NQ_775994-MLA81216428047_122024-OO.webp',
]

export function BannersCarousel() {
  return (
    <Carousel autoplay className='w-full' opts={{ loop: true }}>
      <CarouselContent className='h-[400px]'>
        {slidesImages.map((image) => (
          <CarouselItem key={image}>
            <Image
              alt='slide'
              className='min-h-full w-full object-cover'
              height={400}
              src={image}
              width={1200}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='absolute left-0 top-[38%] h-16 w-10 -translate-y-1/2 justify-start rounded-l-none bg-white p-2 opacity-0 transition-opacity duration-300 focus:border focus:border-l-0 focus:border-btn-primary group-hover:opacity-100' />
      <CarouselNext className='absolute right-0 top-[38%] h-16 w-10 -translate-y-1/2 justify-end rounded-r-none bg-white p-2 opacity-0 transition-opacity duration-100 focus:border focus:border-r-0 focus:border-btn-primary group-hover:opacity-100' />
      <div className='absolute bottom-0 h-[120px] w-full bg-[linear-gradient(180deg,_transparent,_#ebebeb)]' />
      <CarouselDots className='bottom-32' />
    </Carousel>
  )
}
