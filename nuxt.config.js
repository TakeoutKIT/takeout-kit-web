require('dotenv').config()
import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s | ' + 'めしてく',
    title: 'めしてく',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/vuetify', ssr: false },
    { src: '~/plugins/infiniteloading', ssr: false },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/vuetify',
    '@nuxtjs/google-analytics'
  ],
  googleAnalytics: {
    id: 'UA-165629168-1'
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/markdownit',
    '@nuxtjs/apollo',
    '@nuxtjs/axios',
  ],
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/scss/variables.scss'],
    theme: {
      // デフォルトはダークモードでない
      dark: false,
      themes: {
        // ダークモードだとこっち
        dark: {
          primary: '#ff9800',
          secondary: '#ff5722',
          accent: '#2196f3',
          error: '#f44336',
          warning: '#ffeb3b',
          info: '#8bc34a',
          success: '#4caf50'
        },
        // ダークモードでなければこっち
        light: {
          primary: '#ff9800',
          secondary: '#ff5722',
          accent: '#2196f3',
          error: '#f44336',
          warning: '#ffeb3b',
          info: '#8bc34a',
          success: '#4caf50'
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  serverMiddleware: [
    // API middleware
    '~/api/index.js'
  ],
  axios: {
    baseURL: process.env.NODE_ENV !== 'production' ? 'http://localhost:3000/api/' : 'http://localhost:' + process.env.PORT + '/api/',
    browserBaseURL: process.env.API_ENDPOINT,
    proxyHeaders: true
  },
  apollo: {
    clientConfigs: {
      default: '~/apollo/client-configs/default.js'
    }
  },
  markdownit: {
    injected: true,
    breaks: true,
    html: true,
    linkify: true,
    typography: true,
  }
}
