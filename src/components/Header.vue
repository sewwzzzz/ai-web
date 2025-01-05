<template>
  <div id="header">
    <div id="aside-sign" @click="backMain()">
      <svg-icon id="sign-icon" name="aiweb"></svg-icon>
      <div id="sign-title">AI资讯</div>
    </div>
    <div ref="headerRef" id="article-header">
      <SelectInput ref="inputRef" id="header-input" :menuItem="menuItem"></SelectInput>
      <div id="header-right">
        <div id="right-avator"></div>
        <ToolIcon v-for="(item,index) in tools" :key="index" :name="item.name" :title="item.title" @click="jumpTools(item)">
        </ToolIcon>
      </div>
    </div>
  </div>
</template>


<style scoped>
#header{
  display:flex;
}
#aside-sign{
  display:flex;
  justify-content: center;
  align-items: center;
  width:150px;
  height:64px;
  border-bottom: 1px #e0dbdb solid;
  background-color: #ffffff;
  cursor:pointer;
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

#article-header{
  position:relative;
  width:calc(100% - 150px);
  height:64px;
  background: linear-gradient(to right, #4b9ff3, #f6c533); /* 初始渐变 */
  /* 动画名称 | 持续时间 | 循环次数 | 动画方向 */
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
  left:35%;
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
</style>

<script setup>
import SelectInput from './SelectInput.vue'
import ToolIcon from './ToolIcon.vue'
import { menuItem,tools,debounce } from '@/datas/config'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const inputRef = ref(null)
const headerRef = ref(null)

// 元素挂载后需要执行的操作
onMounted(() => {
  updateWidth()
  window.addEventListener('resize',updateWidth)
})

// 元素销毁前需要执行的操作
onBeforeUnmount(() => {
  window.removeEventListener('resize',updateWidth)
})

// 设定搜索框的宽度
const updateWidth = debounce(() => {
  inputRef.value.setInputWidth(headerRef.value.offsetWidth*0.4)
})

// 点击 消息/动态/收藏/历史/ 后跳转路由
const jumpTools = (item) => {
  let routeData = router.resolve({
    path: item.path, // 这里填写的是路由配置中定义的路由路径path或者name
  });
  window.open(routeData.href, '_blank');
}

// 刷新首页
const backMain = () => {
  router.push('/')
}
</script>