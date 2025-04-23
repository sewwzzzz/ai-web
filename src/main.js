import { createApp } from 'vue'
import App from './App.vue'
import '../src/styles/index.css'
import '../src/assets/iconfonts/iconfont.css'
import SvgIcon from '@/components/SvgIcon.vue'
import router from './router/index'
import { createPinia } from 'pinia'
import VueLazyload from 'vue-lazyload'

const app = createApp(App)
app.component('svg-icon', SvgIcon) // 全局注册SvgIcon 
app.use(router) // 全局使用router/index中的自定义路由
app.use(createPinia()) //全局注册Pinia
app.use(VueLazyload, {
  preLoad:1.3,
  error: './assets/img/pictureerror.png',
  // loading: './assets/img/pictureloading.png',
  attempt:1
})
app.mount('#app')

// 载入所有svg icon
const requireContext = require.context('./assets/icons', false, /\.svg$/)
requireContext.keys().forEach(requireContext)
