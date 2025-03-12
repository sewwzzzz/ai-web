<template>
  <el-pagination
    :current-page="props.paging.currentPage"
    :page-size="props.paging.pageSize"
    :page-sizes="[30,50,100,200]"
    :layout="props.layout?props.layout:'total,sizes,prev,pager,next,jumper'"
    :total="props.paging.totalCount"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  >

  </el-pagination>
</template>

<style scoped>

</style>

<script setup>
import { defineProps, defineEmits } from 'vue'
const props = defineProps({
  paging: {
    type: Object,
  },
  layout: {
    type: String,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: ""
  }
})

const emits = defineEmits(['sizeChange','currentChange'])
const handleSizeChange = (val) => {
  emits('sizeChange',val)
}

const handleCurrentChange = (val) => {
  emits('currentChange',val)
}
</script>