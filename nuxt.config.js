export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'vue to nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },  
  ssr: false,
  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~plugins/main.js'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth'
  ],
  auth: {
    localStorage: {
      prefix: 'auth.'
    },
    token: {
      prefix: 'token.'
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'http://localhost/wp_ranek/wp-json/jwt-auth/v1/token',
            method: 'post',
            propertyName: 'token'
          },
          user: {
            url: 'http://localhost/wp_ranek/wp-json/api/usuario',
            method: 'get',
            propertyName: false
          },
          logout: false
        }
      }
    }
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
