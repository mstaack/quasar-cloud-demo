// Configuration for your app

module.exports = function (ctx) {
  return {
    plugins: [
      'axios',
      'vuelidate',
      'title',
      'auth',
    ],
    css: [
      'app.styl'
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons',
      // 'ionicons',
      // 'mdi',
      'fontawesome'
    ],
    supportIE: false,
    vendor: {
      add: [],
      remove: []
    },
    build: {
      env: ctx.prod
        ? {
          // prod env vars here, for example:
          API_HOST: JSON.stringify('https://api.therealhost.com')

        }
        : {
          // dev env vars here, for example:
          API_HOST: JSON.stringify(process.env.API_HOST || 'http://localhost:8000')
        },
      scopeHoisting: true,
      vueRouterMode: 'history',
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      // useNotifier: false,
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules|quasar)/
        })
      }
    },
    devServer: {
      // https: true,
      // port: 8080,
      open: true, // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QBtn',
        'QBtnGroup',
        'QCard',
        'QCardActions',
        'QCardMain',
        'QCardMedia',
        'QCardSeparator',
        'QCarousel',
        'QCarouselSlide',
        'QCarouselControl',
        'QCollapsible',
        'QCardTitle',
        'QCheckbox',
        'QContextMenu',
        'QDialog',
        'QFab',
        'QFabAction',
        'QField',
        'QIcon',
        'QInnerLoading',
        'QInput',
        'QItem',
        'QItemMain',
        'QItemSeparator',
        'QItemSide',
        'QItemTile',
        'QLayout',
        'QLayoutDrawer',
        'QLayoutHeader',
        'QBreadcrumbs',
        'QBreadcrumbsEl',
        'QList',
        'QListHeader',
        'QPage',
        'QPageContainer',
        'QPageSticky',
        'QPopover',
        'QParallax',
        'QProgress',
        'QRouteTab',
        'QSpinnerIos',
        'QSearch',
        'QSelect',
        'QTab',
        'QTable',
        'QTableColumns',
        'QUploader',
        'QModal',
        'QModalLayout',
        'QTabs',
        'QTree',
        'QTd',
        'QTh',
        'QToolbar',
        'QToolbarTitle',
        'QTr',
      ],
      directives: [
        'Ripple',
        'CloseOverlay'
      ],
      plugins: [
        'Loading',
        'LocalStorage',
        'Notify',
        'AppFullscreen',
        'Dialog'
      ],
      iconSet: 'fontawesome'
    },
    // animations: 'all' --- includes all animations
    animations: [],
    pwa: {
      cacheExt: 'js,html,css,ttf,eot,otf,woff,woff2,json,svg,gif,jpg,jpeg,png,wav,ogg,webm,flac,aac,mp4,mp3',
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      extendWebpack (cfg) {
        // do something with cfg
      },
      packager: {
        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      }
    },

    // leave this here for Quasar CLI
    starterKit: '1.0.0-beta.4'
  }
}
