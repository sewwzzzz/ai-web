<template>
  <div id="reply">
    <!-- <CardReply></CardReply> -->
    <div v-show="infoStore.id">
      <CardReply v-for="(item) in dataList" :key="item.id" :records="item"></CardReply>
    </div>
    <div v-show="infoStore.id && dataList.length" id="reply-footer">
      <Pagination id="footer-pagination" :paging="paging" @sizeChange="sizeChange" @currentChange="currentChange"></Pagination>
    </div>
  </div>
</template>

<style scoped>
#reply{
  width:100%;
  background-color:white;
  box-shadow: 0 0px 10px -5px rgb(134, 134, 137);
}

#reply-footer{
  display:flex;
  justify-content:center;
  padding: 20px 0 40px;
}

</style>

<script setup>
import useInfoStore from '@/store/info'
import { getMessage } from '@/utils/preRequest'
import { onMounted, reactive, ref, watch } from 'vue'
import { defineExpose } from 'vue'

const infoStore = useInfoStore()

watch(() => infoStore.id, (val) => {
  if (val) {
    getDataList()
  }
})

onMounted(() => {
  if (infoStore.id) getDataList()
})

let paging = reactive({
  currentPage: 1,
  pageSize: 30,
  totalCount:400,
})

let dataList = ref([])

function getDataList(current = 1, size = paging.pageSize){
  getMessage(current, size).then((data) => {
    if (data) {
      paging.currentPage = data.current
      paging.pageSize = data.size
      paging.totalCount = data.total
      dataList.value = data.records
    }
  })
}

defineExpose({
  getDataList,
})

// 页数据量变化
const sizeChange = (val) => {
  paging.pageSize = val
  getDataList(paging.currentPage, paging.pageSize)
}

// 当前页号变化
const currentChange = (val) => {
  paging.currentPage = val
  getDataList(paging.currentPage, paging.pageSize)
}
</script>