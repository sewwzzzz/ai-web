<template>
  <div id="header">
    <div id="aside-sign">
      <svg-icon id="sign-icon" name="aiweb"></svg-icon>
      <div id="sign-title">AI资讯</div>
    </div>
    <div ref="headerRef" id="article-header">
      <SelectInput ref="inputRef" id="header-input" :menuItem="menuItem"></SelectInput>
      <div id="header-right">
        <div id="right-avator"></div>
        <ToolIcon v-for="(item,index) in tools" :key="index" :name="item.name" :title="item.title">
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
</style>

<script setup>
import SelectInput from './SelectInput.vue'
import ToolIcon from './ToolIcon.vue'
import { menuItem,tools,debounce } from '@/datas/config'
import { ref,onMounted,onBeforeUnmount } from 'vue'

// 设定搜索框的宽度
const inputRef = ref(null)
const headerRef = ref(null)
const updateWidth = debounce(() => {
  inputRef.value.setInputWidth(headerRef.value.offsetWidth*0.4)
})

onMounted(() => {
  updateWidth()
  window.addEventListener('resize',updateWidth)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize',updateWidth)
})
</script>