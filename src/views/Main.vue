<template>
  <aside id="main-aside">
      <div id="aside-sign">
        <svg-icon id="sign-icon" name="aiweb"></svg-icon>
        <div id="sign-title">AI资讯</div>
      </div>
      <div v-for="(item,index) in menu" :key="index" class="aside-title">
        <div :class="item.icon"></div>
        <div class="title">{{item.title}}</div>
      </div>
  </aside>
  <article id="main-article">
    <div id="article-header">
      <SelectInput id="header-input" :menuItem="menuItem"></SelectInput>
      <div id="header-right">
        <div id="right-avator"></div>
        <ToolIcon v-for="(item,index) in tools" :key="index" :name="item.name" :title="item.title">
        </ToolIcon>
      </div>
    </div>
    <div class="article-box" v-for="(item,index) in menu" :key="index">
      <div class="box-title">
        {{ item.title }}
      </div>
      <div ref="boxContentRef" class="box-content">
        <Menu :menuWidth="menuWidth" :menuTitle="item.menuTitle" :menuItem="item.menuItem"></Menu>
      </div>
    </div>
  </article>
</template>

<style lang="css" scoped>
#article-header{
  position:relative;
  width:100%;
  height:64px;
  background: linear-gradient(to right, #1E88F5, #FFC107); /* 初始渐变 */
  animation: blink 3s infinite alternate;
  opacity: 1; /* 初始透明度 */
  /* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
  box-shadow: 0 3px 10px -5px rgb(14, 4, 78);
}

@keyframes blink {
  0% { opacity: 1; } /* 完全不透明 */
  100% { opacity: 0.7; } /* 半透明 */
}

#header-input{
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%)
}

#header-right{
  float:right;
  margin-right: 10px;
  height:100%;
  display: flex;
  align-items: center;
  column-gap: 20px;
}

#right-avator{
  background-color: #1E88F5;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

#right-avator:hover{
  cursor: pointer;
}

#main-aside{
  position: fixed;
  width:150px;
  height:100%;
  background-color:rgb(249, 249, 249);
}

#aside-sign{
  display:flex;
  justify-content: center;
  align-items: center;
  width:100%;
  height:64px;
  border-bottom: 1px #e0dbdb solid;
  background-color: #ffffff;
}

#sign-icon{
  width:35px;
  height:35px;
}

#sign-title{
  font-family: 'Times New Roman', Times, serif;
  font-size: 30px;
  font-weight:600;
}

.aside-title{
  box-sizing: border-box;
  height: 60px;
  width:100%;
  /* 位置 */
  display: flex;
  padding-left: 10px;
  align-items:center;
  /* 字体 */
  font-weight:400;
  font-size:14px;
  color:rgb(81, 92, 107);
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
}

.aside-title:hover{
  background-color: rgb(224, 224, 224);
  color:rgb(89, 97, 249);
  cursor:pointer;
}

.title{
  margin-left:5px;
}

#main-article{
  margin-left: 150px;
  width:calc(100% - 150px);
  background-color:rgb(231, 238, 244);
  overflow: auto;
}

.article-box{
  margin-top:10px;
  box-sizing: border-box;
  height:380px;
  width:100%;
  padding: 10px 20px;
}

.box-title{
  font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 20px;
  color:#555555;
}

.box-content{
  margin-top:5px;
  width:100%;
  height:calc(100% - 10px - 10px - 20px - 5px);
  background-color: #ffffff;
}
</style>

<script setup>
import SelectInput from '@/components/SelectInput.vue';
import { onBeforeUnmount, onMounted, ref } from 'vue'

const menuItem = ['Bilibili', '微信公众号', 'Github','huggingface']
const menu = {
  baseKnowledge: {
    title: '基础知识',
    icon: 'iconfont icon-zhishi',
    menuTitle: ['Python', '数学基础'],
    menuItem: ['Bilibili', '微信公众号', 'Github','huggingface']
  },
  tool: {
    title: '工具与软件',
    icon: 'iconfont icon-ruanjian',
    menuTitle: ['Numpy', 'Pandas', '数据分析与实战','Pytorch','TenserFlow'],
    menuItem: ['Bilibili', '微信公众号', 'Github','huggingface']
  },
  machineLearning: {
    title: '机器学习',
    icon: 'iconfont icon-jiqiren',
    menuTitle: ['机器学习理论', '机器学习实战'],
    menuItem: ['Bilibili', '微信公众号', 'Github','huggingface']
  },
  deepLearning: {
    title: '深度学习',
    icon: 'iconfont icon-shenduxuexi',
    menuTitle: ['深度学习理论', '深度学习实战'],
    menuItem: ['Bilibili', '微信公众号', 'Github','huggingface']
  },
  computerVision: {
    title: '计算机视觉',
    icon: 'iconfont icon-jisuanjishijue',
    menuTitle: ['图像分类', '目标检测','图像分割','目标跟踪','图像生成'],
    menuItem: ['Bilibili', '微信公众号', 'Github','huggingface']
  },
  naturalLanguageProcessing: {
    title: '自然语言处理',
    icon: 'iconfont icon-ziranyuyanchuli',
    menuTitle: ['文本分配', '文本匹配','文本生成','序列标注'],
    menuItem: ['Bilibili', '微信公众号', 'Github','huggingface']
  }
}

const tools = [
  {
    name: 'notices',
    title: '消息'
  },
  {
    name: 'dynamics',
    title:'动态'
  },
  {
    name: 'collections',
    title:'收藏'
  },
  {
    name: 'histories',
    title:'历史'
  }
]

const boxContentRef = ref(null)
let menuWidth = 1076
// 计算box-content的宽度
function debounce(fn,delay) {
  let timer = null
  return function () {
    const context = this
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context,arguments)
    }, delay)
  }
}

const updateMenuWidth = debounce(() => {
  menuWidth = boxContentRef.value.Width*0.8
}, 100)

onMounted(()=>{
  window.addEventListener('resize', updateMenuWidth)
})

onBeforeUnmount(()=>{
  window.removeEventListener('resize',updateMenuWidth)
})
</script>