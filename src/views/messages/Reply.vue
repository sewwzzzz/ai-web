<template>
  <div id="reply">
    <!-- <CardReply></CardReply> -->
    <div v-show="infoStore.id <= 0" id="unlogin">
        <UnLogin></UnLogin>
      </div>
    <div v-show="infoStore.id > 0 ">
      <CardReply v-for="(item) in dataList" :key="item.id" :records="item" @deleteMessage="deleteMessage"></CardReply>
    </div>
    <div v-show="infoStore.id> 0 && dataList.length" id="reply-footer">
      <Pagination id="footer-pagination" :paging="paging" @sizeChange="sizeChange" @currentChange="currentChange"></Pagination>
    </div>
  </div>
</template>

<style scoped>
#reply{
  width:100%;
  background-color:white;
  box-shadow: 0 0px 10px -5px rgb(134, 134, 137);
  position: relative;
}

#unlogin{
  margin-top:60px;
  height:300px;
  width:450px;
  position:absolute;
  left:50%;
  transform:translate(-50%,-50%);
  top:50%;
}

#reply-footer{
  display:flex;
  justify-content:center;
  padding: 20px 0 40px;
}

</style>

<script setup>
import { useRouter } from 'vue-router'
import useInfoStore from '@/store/info'
import { addEyes, deleteNotice, getMessage, getPlatform } from '@/utils/preRequest'
import { onMounted, reactive, ref, watch } from 'vue'
import { defineExpose } from 'vue'
 

const infoStore = useInfoStore()
const router = useRouter()

getPlatform()

watch(() => infoStore.id, (val) => {
  if (val > 0) {
    getDataList()
  }
})

onMounted(() => {
  if (infoStore.id > 0) getDataList()
})

let paging = reactive({
  currentPage: 1,
  pageSize: 10,
  totalCount:0,
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

async function deleteMessage(id) {
  await deleteNotice(id)
  getDataList()
}

defineExpose({
  getDataList,
})

// 页数据量变化
const sizeChange = (val) => {
  paging.pageSize = val
  paging.currentPage = 1
  getDataList(1, paging.pageSize)
}

// 当前页号变化
const currentChange = (val) => {
  paging.currentPage = val
  getDataList(paging.currentPage, paging.pageSize)
}

// 前往具体资讯页面
const goPoster = (id) => {
  // console.log("resourceId",id)
  addEyes(id)
  let routeData = router.resolve({
    path :`/Poster/${id}`
  })
  // openWindowWithPromise(routeData.href).then(() => {
  //   sendInfoMessage()
  // })
  window.open(routeData.href,'_blank')
}
</script>