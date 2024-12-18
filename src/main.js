import { createApp } from 'vue'
import App from './App.vue'
import '../src/styles/index.css'
import '../src/assets/iconfonts/iconfont.css'
import SvgIcon from '@/components/SvgIcon.vue'


const app = createApp(App)
// 全局注册SvgIcon 
app.component('svg-icon', SvgIcon)
app.mount('#app')

// 载入所有svg icon
const requireContext = require.context('./assets/icons', false, /\.svg$/)
requireContext.keys().forEach(requireContext)
