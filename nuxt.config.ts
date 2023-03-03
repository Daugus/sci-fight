// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      title: 'SCI-FIGHT',
      meta: [{ name: 'description', content: 'SCI-FIGHT' }],
    },
  },
  typescript: { shim: false },
  modules: ['@nuxtjs/tailwindcss'],
  tailwindcss: {
    cssPath: '~/assets/css/style.scss',
  },
  ssr: false,
});
