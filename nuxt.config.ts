// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxtjs/tailwindcss', '@nuxt/ui', 'nuxt-icon'],

  ui: {
    global: true,
    button: {
      default: {
        color: 'primary',
        variant: 'solid',
        size: 'lg',
      },
    },
    input: {
      default: {
        size: 'lg',
        color: 'primary',
      },
    },
  },

  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },

  compatibilityDate: '2025-03-17',
})
