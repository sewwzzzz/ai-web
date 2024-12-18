const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const {ElementPlusResolver} = require('unplugin-vue-components/resolvers')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,//关闭eslint检验
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers:[ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
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
