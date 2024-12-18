<template>
  <el-menu
    ellipsis
    class="el-menu-popper-demo"
    mode="horizontal"
    :popper-offset="0"
    :style="`width: ${props.menuWidth}px`"
  >
    <el-sub-menu v-for="(TitleItem,TitleIndex) in props.menuTitle" :key="TitleIndex" :index = "TitleIndex.toString()"> 
        <template #title>{{ TitleItem }}</template>
        <el-menu-item v-for="(item,index) in props.menuItem" :key="index" :index="TitleIndex + '-' + index">{{ item }}</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style scoped>

</style>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  menuWidth: {
    type: Number,
    default: 1076
  },
  menuTitle: {
    type: Array,
  },
  menuItem: {
    type: Array,
  }
})
</script>