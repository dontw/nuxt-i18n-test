module.exports = {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: 'dali-backend',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'a Nuxt.js project for dali-platform'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  /*
   ** Plugins
   */
  plugins: [{
    src: '@plugins/iview.js'
  }],
  /*
   ** Nuxt Modules
   */
  modules: [
    '@nuxtjs/axios', ['nuxt-i18n', {
      // Options
      strategy: 'prefix_except_default',
      defaultLocale: 'cn',
      locales: [{
          code: 'cn',
          file: 'cn.js',
          iso: 'zh-cn',
          name: '中文'
        },
        {
          code: 'en',
          file: 'en.js',
          iso: 'en-US',
          name: 'English'
        }
      ],
      lazy: true,
      langDir: './lang/'
    }]
  ],
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#3B8070'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, {
      isDev,
      isClient
    }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
