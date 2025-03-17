import forms from '@tailwindcss/forms'
import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    colors: {
      ...colors,
      primary: {
        50: '#f0f9f4',
        100: '#dbf1e4',
        200: '#bce3cd',
        300: '#90cead',
        400: '#4caf8a',
        500: '#3d9a77',
        600: '#2f7d61',
        700: '#266350',
        800: '#204e41',
        900: '#1c4137',
        950: '#0f241e',
      },
    },
    extend: {},
  },
  plugins: [forms],
} satisfies Config
