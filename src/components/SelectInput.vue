<template>
  <div class="mt-4">
    <el-input
      v-model="input"
      placeholder="Please input"
      class="input-with-select"
    >
      <template #prepend>
        <el-select v-model="select" placeholder="Select" style="width: 140px">
          <el-option v-for="(item,index) in props.menuItem" :key="index" :label="item" :value="index.toString()" />
        </el-select>
      </template>
      <template #append>
        <el-button :icon="Search" />
      </template>
    </el-input>
  </div>
</template>

<style scoped>
.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}

.el-input{
  width: 500px;
}

</style>

<script setup>
import { ref,defineProps } from 'vue'

const input = ref('')
const select = ref('')
const props = defineProps({
  menuItem: {
    type:Array,
  }
})
</script>