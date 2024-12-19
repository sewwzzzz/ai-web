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
          <el-option v-for="(item,index) in props.menuItem" :key="index" :label="item" :value="index.toString()" />
        </el-select>
      </template>
      <template #append>
        <el-button>
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
import { ref,defineProps, defineExpose} from 'vue'

const input = ref('')
const select = ref('')
const props = defineProps({
  menuItem: {
    type:Array,
  }
})
const realWidth = ref(0)
function setInputWidth(inputWidth) {
  realWidth.value = inputWidth
}
defineExpose({setInputWidth})
</script>