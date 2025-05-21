<template>
  <div class="mt-4">
    <el-input
      v-model="input"
      placeholder="Please input"
      class="input-with-select"
      :style="{ width:realWidth+'px'}"
    >
      <template #prepend>
        <el-select v-model="select" placeholder="Select" style="width:130px">
          <el-option v-for="(item) in props.platform" :key="item.id" :label="item.name" :value="item.name" />
        </el-select>
      </template>
      <template #append>
        <el-button @click="selectPoster">
          <el-icon>
            <i-ep-search></i-ep-search>
          </el-icon>
        </el-button>
      </template>
    </el-input>
  </div>
</template>

<style scoped>
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}


</style>

<script setup>
import { commitMessage } from '@/utils/operate'
import { ref,defineProps, defineExpose, onMounted} from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const input = ref(route.query.searchText)
const select = ref(route.query.sourceName)
const props = defineProps({
  platform: {
    type:Array,
  }
})
const realWidth = ref(0)

onMounted(() => {
  // console.log('重新挂载')
})

const selectPoster = () => {
  if (!input.value) {
    commitMessage('warning', '输入的关键词不可为空')
    return
  }
  if (!select.value) {
    commitMessage('warning', '选择的平台不可为空')
    return
  }
  // 判断是否需要（路径不是select）跳转新界面，retuen
  if (route.name != 'select') {
    let routeData = router.resolve({
      name: 'select',
      query: {
        searchText: input.value,
        sourceName: select.value
      }
    })
    window.open(routeData.href,'_blank')
    return
  }
  // 其他情况正常执行

  if (input.value && select.value) {
    router.push({
      name: 'select',
      query: {
        searchText: input.value,
        sourceName:select.value
      }
    })
  }
}

// 首次页面初始化如果路径是select，需要获取参数后调用一次selectPoster
if (route.name == 'select') {
  selectPoster()
}

// 设置搜索框的宽度
function setInputWidth(inputWidth) {
  realWidth.value = inputWidth
}


defineExpose({setInputWidth})
</script>