import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layout/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
    './src/home/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'proxima-nova': ['var(--font-proxima-nova)', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        navbar: 'var(--navbar)',
        foreground: 'var(--foreground)',
        link: 'var(--link)',
        selection: 'var(--selection)',
        'nav-link': 'var(--nav-link)',
        'nav-link-hover': 'var(--nav-link-hover)',
        'btn-primary': 'var(--btn-primary)',
        'btn-primary-hover': 'var(--btn-primary-hover)',
        'btn-secondary': 'var(--btn-secondary)',
        'btn-secondary-hover': 'var(--btn-secondary-hover)',
        price: 'var(--price)',
        'price-discounted': 'var(--price-discounted)',
        'price-offer': 'var(--price-offer)',
      },
    },
  },
  plugins: [],
}

export default config
