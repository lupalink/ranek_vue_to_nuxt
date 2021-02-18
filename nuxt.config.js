export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Pna Webservice',
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
    redirect: {
      home: '/'
    },
    localStorage: {
      prefix: 'auth.'
    },
    token: {
      prefix: 'token.'
    },
    strategies: {
      local: {
        token: {
          property: 'data.access_token',
          // required: true,
          // type: 'Bearer'
        },
        endpoints: {
          login: {
            url: 'http://127.0.0.1:8000/api/v1/auth/login',
            method: 'post',
            propertyName: 'data.access_token'
          },
          user: {
            url: 'http://127.0.0.1:8000/api/v1/auth/user',
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
