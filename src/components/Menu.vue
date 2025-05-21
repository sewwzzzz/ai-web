<template>
  <el-menu
    ellipsis
    class="el-menu-popper-demo"
    mode="horizontal"
    :popper-offset="0"
    :style="{width:props.fixedWidth?props.fixedWidth:(realWidth + 'px')}"
    :default-active="props.menuTitle[0].id+'-1'"
  >
    <el-sub-menu  v-for="(TitleItem) in props.menuTitle" :key="TitleItem.id" :index = "TitleItem.id.toString()"> 
      <template #title>
        <div class="dot" v-show="systemStore.subscribeList.filter((x) => {
          return x.keywordId === TitleItem.id && x.status === 1
        }).length">●</div>
        {{ TitleItem.name }}
      </template>
      <el-menu-item v-for="(item) in props.platform" :key="item.id" :index="TitleItem.id + '-' + item.id" @click="sendCurrentId(TitleItem.id, item.id, TitleItem.blockId)">{{ item.name }}</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style scoped>
.dot{
  color:red;
  font-size:5px;
  margin-right:3px;
}
</style>

<script setup>
import { defineProps, defineExpose, ref,defineEmits} from 'vue'
import useSystemStore from '@/store/system'
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

let systemStore = useSystemStore()

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