'use client'

import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ComponentProps,
  type HTMLAttributes,
  type KeyboardEvent,
} from 'react'

import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'

import { cn } from '../utils/class-names'

import { Button } from './button'

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

interface CarouselProps {
  opts?: CarouselOptions
  orientation?: 'horizontal' | 'vertical'
  plugins?: CarouselPlugin
  setApi?: (api: CarouselApi) => void
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps

const CarouselContext = createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = useContext(CarouselContext)

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />')
  }

  return context
}

const Carousel = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & Omit<CarouselProps, 'plugins'> & { autoplay?: boolean }
>(
  (
    { orientation = 'horizontal', opts, setApi, className, children, autoplay = false, ...props },
    ref,
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === 'horizontal' ? 'x' : 'y',
      },
      [Autoplay({ active: autoplay })],
    )

    const [canScrollPrev, setCanScrollPrev] = useState(false)
    const [canScrollNext, setCanScrollNext] = useState(false)

    const onSelect = useCallback((api: CarouselApi) => {
      if (!api) {
        return
      }

      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = useCallback(() => {
      api?.scrollNext()
    }, [api])

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === 'ArrowRight') {
          event.preventDefault()
          scrollNext()
        }
      },
      [scrollPrev, scrollNext],
    )

    useEffect(() => {
      if (!api || !setApi) {
        return
      }

      setApi(api)
    }, [api, setApi])

    useEffect(() => {
      if (!api) {
        return
      }

      onSelect(api)
      api.on('reInit', onSelect)
      api.on('select', onSelect)

      return () => {
        api.off('select', onSelect)
      }
    }, [api, onSelect])

    const contextValue = useMemo(
      () => ({
        carouselRef,
        api,
        opts,
        orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }),
      [api, canScrollNext, canScrollPrev, carouselRef, opts, orientation, scrollNext, scrollPrev],
    )

    return (
      <CarouselContext.Provider value={contextValue}>
        <div
          aria-roledescription='carousel'
          className={cn('relative', className)}
          onKeyDownCapture={handleKeyDown}
          ref={ref}
          role='region'
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    )
  },
)

Carousel.displayName = 'Carousel'

const CarouselContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { carouselRef } = useCarousel()

    return (
      <div className='overflow-hidden' ref={carouselRef}>
        <div className={cn('flex', className)} ref={ref} {...props} />
      </div>
    )
  },
)

CarouselContent.displayName = 'CarouselContent'

const CarouselItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        aria-roledescription='slide'
        className={cn('min-w-0 shrink-0 grow-0 basis-full', className)}
        ref={ref}
        role='group'
        {...props}
      />
    )
  },
)

CarouselItem.displayName = 'CarouselItem'

const CarouselPrevious = forwardRef<HTMLButtonElement, ComponentProps<typeof Button>>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel()

    return (
      <Button
        className={cn(
          'absolute h-8 w-8 rounded-full shadow transition-shadow duration-200 hover:shadow-lg',
          orientation === 'horizontal'
            ? '-left-12 top-1/2 -translate-y-1/2'
            : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
          className,
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        ref={ref}
        size={size}
        variant={variant}
        {...props}
      >
        <SlArrowLeft className='text-btn-primary' size={32} />
        <span className='sr-only'>Previous slide</span>
      </Button>
    )
  },
)

CarouselPrevious.displayName = 'CarouselPrevious'

const CarouselNext = forwardRef<HTMLButtonElement, ComponentProps<typeof Button>>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel()

    return (
      <Button
        className={cn(
          'absolute h-8 w-8 rounded-full shadow transition-shadow duration-200 hover:shadow-lg',
          orientation === 'horizontal'
            ? '-right-12 top-1/2 -translate-y-1/2'
            : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
          className,
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        ref={ref}
        size={size}
        variant={variant}
        {...props}
      >
        <SlArrowRight className='text-btn-primary' size={32} />
        <span className='sr-only'>Next slide</span>
      </Button>
    )
  },
)

CarouselNext.displayName = 'CarouselNext'

const CarouselDots = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { api } = useCarousel()
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [slideCount, setSlideCount] = useState(0)

    useEffect(() => {
      if (!api) return

      setSlideCount(api.scrollSnapList().length)

      const onSelect = () => {
        setSelectedIndex(api.selectedScrollSnap())
      }

      api.on('select', onSelect)
      // Initialize
      onSelect()

      return () => {
        api.off('select', onSelect)
      }
    }, [api])

    return (
      <div
        className={cn('absolute flex w-full justify-center gap-1', className)}
        ref={ref}
        {...props}
      >
        {Array.from({ length: slideCount }).map((_, index) => (
          <button
            aria-label={`Go to slide ${String(index + 1)}`}
            className={cn(
              'h-[6px] w-[6px] rounded-full border border-white transition-all',
              selectedIndex === index ? 'bg-white' : 'bg-black bg-opacity-25',
            )}
            key={index}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    )
  },
)

CarouselDots.displayName = 'CarouselDots'

export {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
}
