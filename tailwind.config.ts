import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        navbar: 'var(--navbar)',
        foreground: 'var(--foreground)',
        link: 'var(--link)',
        selection: 'var(--selection)',
      },
    },
  },
  plugins: [],
} satisfies Config
