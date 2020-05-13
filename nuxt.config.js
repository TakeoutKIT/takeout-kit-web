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
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'description', content: '金沢工業大学周辺の飲食店を守りたいをコンセプトに飲食店のテイクアウトの情報を収集拡散するサービスです。' },
      { name: 'keywords', content: 'テイクアウト,金沢工業大学,お弁当' },
      { property: 'og:title', content: 'めしてく' },
      { property: 'og:site_name', content: 'めしてく' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://takeout-kit-web.herokuapp.com' },
      { property: 'og:image', content: 'https://takeout-kit-web.herokuapp.com/thumbnail.png' },
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@meshiteku' },
      { name: 'twitter:creator', content: '@zukky_rikugame' },
      { name: 'twitter:title', content: 'めしてく' },
      { name: 'twitter:description', content: '金沢工業大学周辺の飲食店を守りたいをコンセプトに飲食店のテイクアウトの情報を収集拡散するサービスです。' },
      { name: 'twitter:image', content: 'https://takeout-kit-web.herokuapp.com/twitter_thumbnail.png' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icons/favicon.ico' },
      { rel: 'apple-touch-icon', size: '192x192', href: '/icons/icon-192x192.png' },
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
    '@nuxtjs/pwa'
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
          primary: '#fcbe32',
          secondary: '#fcbe32',
          accent: '#88d8b0',
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
    '~/api/index.js',
    'redirect-ssl',
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
  },
  manifest: {
    name: 'めしてく',
    short_name: 'めしてく',
    description: '金沢工業大学周辺の飲食店を守りたいをコンセプトに飲食店のテイクアウトの情報を収集拡散するサービスです。',
    lang: 'ja',
    theme_color: "#fcbe32",
    background_color: '#e1eef6',
    display: 'standalone',
    scope: 'https://takeout-kit-web.herokuapp.com',
    start_url: 'https://takeout-kit-web.herokuapp.com'
  }
}
