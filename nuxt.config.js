module.exports = {
    mode: 'spa',
    /*
     ** Headers of the page
     */
    head: {
        title: 'dali-backend',
        meta: [
            {
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
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: '/favicon.ico'
            }
        ]
    },
    /*
     ** Global CSS
     */
    css: [
        {
            src: '@assets/style/index.less',
            lang: 'less'
        }
    ],
    /*
     ** Plugins
     */
    plugins: [
        {
            src: '@plugins/iview.js'
        },
        {
            src: '~plugins/qriously.js'
        }
    ],
    /*
     ** Nuxt Modules
     */
    modules: [
        '@nuxtjs/axios',
        [
            'nuxt-i18n',
            {
                // Options
                strategy: 'prefix_except_default',
                defaultLocale: 'cn',
                locales: [
                    {
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
            }
        ]
    ],
    /*
     ** Customize the progress bar color
     */
    loading: {
        color: '#3B8070'
    },

    /*
     ** Middleware configuration
     */
    router: {
        // middleware: ['routerBlocker']
        // middleware: ['check-auth', 'auth']
    },

    env: {
        K_TOKEN: process.env.K_TOKEN || 'LeedianPlatformToken',
        API_PWD_KEY: process.env.API_PWD_KEY || '769E18DAFE373A2F8A17B415',
        AUTH_API_URL:
            process.env.AUTH_API_URL || 'http://192.168.2.215:17000/api/v1/'
    },
    /*
     ** Build configuration
     */
    build: {
        /*
         ** Run ESLint on save
         */
        extend(config, { isDev, isClient }) {
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
