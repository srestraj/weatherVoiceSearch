export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Weather App with Voice Search',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/style.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/moment', ssr: false }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://api.openweathermap.org/data/2.5',
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
