'use client'
// https://v0.dev/chat/ccfVZZ99JUg

import * as React from 'react'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ICarousel } from '@/types'

export function HomeCarousel({ 
  items
}: { 
  items: ICarousel[]
}) {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  React.useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <Carousel
      setApi={setApi}
      plugins={[plugin.current]}
      className='w-full mx-auto'
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        loop: true,
        align: 'start',
      }}
    >
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem key={item.title}>
            <Link href={item.url}>
              <div className='flex aspect-[16/6] items-center justify-center p-6 relative -m-1'>
              <Image
                src={item.image}
                alt={item.title}
                 fill
                className="object-cover"
                />
                <div className='absolute w-1/3 left-16 md:left-32 top-1/2 transform -translate-y-1/2'>
                  <h2
                    className={cn(
                      'text-xl md:text-6xl font-bold mb-4 text-primary  '
                    )}
                  >
                    {item.title}
                  </h2>
                  <Button className='hidden md:block'>
                    {item.buttonCaption}
                  </Button>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='left-0 md:left-12' />
      <CarouselNext className='right-0 md:right-12' />
      
      {/* Progress indicator */}
      {count > 0 && (
        <div className='flex justify-center mt-4 space-x-2'>
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === current - 1 ? 'bg-primary w-6' : 'bg-muted'
              }`}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      )}
    </Carousel>
  )
}