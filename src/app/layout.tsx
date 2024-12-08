import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Image from 'next/image'
import Link from 'next/link'
import { type ReactNode } from 'react'

import { BsCart2 } from 'react-icons/bs'
import { PiMapPinThin } from 'react-icons/pi'

import { NavLink } from '@/layout/components/nav-link'
import { SearchBar } from '@/layout/components/search-bar'

import './globals.css'

// Define the fonts with different weights
const proximaNova = localFont({
  src: [
    {
      path: './fonts/proximanova-light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/proximanova-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/proximanova-semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/proximanova-bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-proxima-nova',
})

export const metadata: Metadata = {
  title: 'Mercado Libre Clone',
  description: 'Mercado Libre Clone',
}

const middleLinks = [
  { href: '/', label: 'Categorías' },
  { href: '/', label: 'Ofertas' },
  { href: '/', label: 'Cupones' },
  { href: '/', label: 'Supermercado' },
  { href: '/', label: 'Moda' },
  { href: '/', label: 'Mercado Play' },
  { href: '/', label: 'Vender' },
  { href: '/', label: 'Ayuda' },
]

const rightLinks = [
  { href: '/', label: 'Creá tu cuenta' },
  { href: '/', label: 'Ingresá' },
  { href: '/', label: 'Mis compras' },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={`${proximaNova.variable} font-proxima-nova`}>
        <header className='flex h-fit w-full min-w-fit justify-center bg-navbar p-[10px]'>
          <div className='grid max-w-[1200px] grid-cols-[162px_minmax(340px,_588px)_minmax(350px,_390px)] grid-rows-[40px_1fr] gap-x-5 gap-y-3'>
            <Link href='/'>
              <Image
                alt='Logo'
                height={34}
                src='https://http2.mlstatic.com/frontend-assets/ml-web-navigation/ui-navigation/6.6.92/mercadolibre/logo_large_25years_v2.png'
                width={134}
              />
            </Link>
            <SearchBar />
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
            <div className='flex h-5 flex-wrap gap-4 self-end overflow-y-hidden'>
              {middleLinks.map(({ href, label }) => (
                <NavLink href={href} key={label}>
                  {label}
                </NavLink>
              ))}
            </div>
            <div className='flex items-baseline justify-end gap-4 self-end'>
              {rightLinks.map(({ href, label }) => (
                <NavLink href={href} key={label}>
                  {label}
                </NavLink>
              ))}
              <NavLink href='/'>
                <BsCart2 size={18} />
              </NavLink>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}
