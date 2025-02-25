<template>
  <el-menu
    ellipsis
    class="el-menu-popper-demo"
    mode="horizontal"
    :popper-offset="0"
    :style="{width:realWidth + 'px'}"
  >
    <el-sub-menu v-for="(TitleItem,TitleIndex) in props.menuTitle" :key="TitleItem.id" :index = "TitleItem.id.toString()" @click="console.log(TitleItem.id)"> 
        <template #title>{{ TitleItem.name }}</template>
        <el-menu-item v-for="(item,index) in props.menuItem" :key="index" :index="TitleItem.id + '-' + index">{{ item }}</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style scoped>

</style>

<script setup>
import { defineProps, defineExpose, ref } from 'vue'

const props = defineProps({
  menuTitle: {
    type: Array,
  },
  menuItem: {
    type: Array,
  }
})
let realWidth = ref(0)

// 设置每个板块的菜单栏宽度
function setMenuWidth(menuWidth) {
  realWidth.value = menuWidth
}

defineExpose({setMenuWidth})
</script>