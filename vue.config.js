const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const IconsResolver = require('unplugin-icons/resolver')
const Icons = require('unplugin-icons/webpack')
const {ElementPlusResolver} = require('unplugin-vue-components/resolvers')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,//关闭eslint检验
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4523/m1/5901436-0-default',
        changeOrigin: true,
        pathRewrite:{'^/api':''}
      }
    }
  },
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({ prefix: 'Icon' })
        ],
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({ enabledCollections: ['ep'] })
        ],
      }),
      Icons({
        autoInstall:true,
      }),
    ],
    module: {
      rules: [
      ]
    },
  },
  chainWebpack: config => {
    config.module
      .rule('svg')
      .exclude.add(path.join(__dirname, 'src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.join(__dirname, 'src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')  
      .options({
        symbolId:'icon-[name]'
      })
      .end()
  }
})
