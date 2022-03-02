export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Weather App with Voice Search',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Weather App with Voice Search',
      },
      {
        hid: 'og:title',
        name: 'og:title',
        property: 'og:title',
        content: 'Weather App with Voice Search',
      },
      {
        hid: 'og:url',
        name: 'og:url',
        property: 'og:url',
        content: 'https://weather-voice-search.vercel.app/',
      },
      {
        hid: 'og:type',
        name: 'og:type',
        property: 'og:type',
        content: 'Website',
      },
      {
        hid: 'og:image',
        name: 'og:image',
        property: 'og:image',
        content: 'https://weather-voice-search.vercel.app/og-image.png',
      },
      {
        hid: 'og:site_name',
        name: 'og:site_name',
        property: 'og:site_name',
        content: 'Weather App with Voice Search',
      },
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary',
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'Weather App with Voice Search',
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: 'https://weather-voice-search.vercel.app/og-image.png',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon-image.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Merriweather+Sans:wght@400;500;600;700&display=swap',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/style.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/moment', ssr: false }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/pwa'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  env: {
    API_KEY: process.env.API_KEY,
    WEATHER_API: process.env.WEATHER_API
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    fileName: 'icon.png',
    manifest: {
      name: 'Weather App with Voice Search',
      description: 'Weather App with Voice Search',
      lang: 'en',
      useWebmanifestExtension: false,
      background_color: '#5b82a3',
      theme_color: '#5b82a3',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
}
