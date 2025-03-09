<template>
  <el-menu
    ellipsis
    class="el-menu-popper-demo"
    mode="horizontal"
    :popper-offset="0"
    :style="{width:props.fixedWidth?props.fixedWidth:(realWidth + 'px')}"
    :default-active="props.menuIndex+'-'+props.subIndex"
  >
    <el-sub-menu v-for="(TitleItem) in props.menuTitle" :key="TitleItem.id" :index = "TitleItem.id.toString()" @click="console.log(TitleItem.id)"> 
      <template #title>{{ TitleItem.name }}</template>
      <el-menu-item v-for="(item) in props.platform" :key="item.id" :index="TitleItem.id + '-' + item.id" @click="sendCurrentId(TitleItem.id, item.id, TitleItem.blockId)">{{ item.name }}</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style scoped>

</style>

<script setup>
import { defineProps, defineExpose, ref,defineEmits } from 'vue'

const props = defineProps({
  menuTitle: {
    type: Array,
  },
  platform: {
    type: Array,
  },
  fixedWidth: {
    type: String
  },
  menuIndex: {
    type: Number,
    default:1,
  },
  subIndex: {
    type: Number,
    default:1
  }
})
let realWidth = ref(0)

// 设置每个板块的菜单栏宽度
function setMenuWidth(menuWidth) {
  realWidth.value = menuWidth
}

defineExpose({ setMenuWidth })

const emits = defineEmits(['sendId'])
const sendCurrentId = ( keyId, sourceId, blockId) => {
  emits('sendId',keyId, sourceId, blockId)
}
</script>