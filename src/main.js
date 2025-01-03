import { createApp } from 'vue'
import App from './App.vue'
import '../src/styles/index.css'
import '../src/assets/iconfonts/iconfont.css'
import SvgIcon from '@/components/SvgIcon.vue'
import router from './router/index'

const app = createApp(App)
app.component('svg-icon', SvgIcon) // 全局注册SvgIcon 
app.use(router) // 全局使用router/index中的自定义路由
app.mount('#app')

// 载入所有svg icon
const requireContext = require.context('./assets/icons', false, /\.svg$/)
requireContext.keys().forEach(requireContext)
