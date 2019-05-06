export default {
  mode: 'spa',
  generate: {
    fallback: true
  },

  /*
  ** Headers of the page
  */
  head: {
    title: "Overwatch Workshop Search",
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: 'rgb(0, 202, 242)' },

  /*
  ** Global CSS
  */
  css: [
    "@/assets/styles/global.scss"
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
  ],

  workbox: {
    importScripts: [
      "fontSW.js"
    ]
  },

  manifest: {
    nativeUI: false,
    name: "Overwatch Workshop Search",
    description: "Find cool workshop codes for Overwatch",
    themeColor: "#6cee7e",
    "background_color": "#6cee7e",
    author: "Moritz Ruth",
    twitterCreator: "cte3x",
    twitterSite: "cte3x"
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
