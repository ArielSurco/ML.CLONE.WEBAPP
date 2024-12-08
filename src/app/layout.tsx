import type { Metadata } from 'next'

import './globals.css'

import Image from 'next/image'
import Link from 'next/link'
import { type ReactNode } from 'react'

import { IoIosSearch } from 'react-icons/io'
import { PiMapPinThin } from 'react-icons/pi'

import { Input } from '@/shared/components/input'

export const metadata: Metadata = {
  title: 'Mercado Libre Clone',
  description: 'Mercado Libre Clone',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <header className='flex h-fit w-full min-w-fit justify-center bg-navbar p-[10px]'>
          <div className='grid max-w-[1200px] grid-cols-[162px_minmax(340px,_588px)_minmax(350px,_390px)] grid-rows-[40px_1fr] gap-x-5 gap-y-3'>
            <Image
              alt='Mercado Libre'
              height={34}
              src='https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.6.92/mercadolibre/logo_large_25years_v2.png'
              width={134}
            />
            <form className='group relative flex h-10 items-center'>
              <Input className='h-10 py-[10px] pe-16 ps-4' name='search' />
              <button
                className='absolute right-0 top-0 flex h-10 w-12 items-center justify-center bg-transparent'
                type='submit'
              >
                <IoIosSearch className='w-full border-l' color='#666' size={20} />
              </button>
            </form>
            <Image
              alt='Offer'
              className='justify-self-end'
              height={39}
              src='https://http2.mlstatic.com/D_NQ_880254-MLA80790488278_112024-OO.webp'
              width={340}
            />
            <Link
              className='flex h-fit w-fit items-center gap-1 rounded-md border border-black border-opacity-0 px-2 py-1 hover:border-opacity-10'
              href='/'
            >
              <PiMapPinThin className='-mx-1' size={26} />
              <div className='flex flex-col'>
                <span className='text-xs leading-none text-[#0000008c]'>Enviar a</span>
                <span className='text-sm leading-none'>Dirección X</span>
              </div>
            </Link>
            <div>categories</div>
            <div>Login</div>
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}
