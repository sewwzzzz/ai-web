<template>
  <div id="select-header">
    <Header></Header>
  </div>
  <div id="select-content">
    <Bilibili id="content-box" v-for="(item) in dataList" :key="item.id" :records="item" @click="goPoster(item.id)"></Bilibili>
  </div>
  <div id="select-footer" v-show="dataList.length">
    <Pagination id="footer-pagination" :paging = paging @sizeChange="sizeChange" @currentChange="currentChange"></Pagination>
  </div>
</template>

<style scoped>
#select-header{
  width:100%;

}

#select-content{
  display:flex;
  flex-direction: row;
  flex-wrap:wrap;
  flex-direction: space-between;
  margin-top:30px;
  padding:0 64px;
  box-sizing: border-box;
}

#content-box{
  flex-basis:20%;
  flex-shrink: 0;
  flex-grow: 0;
  overflow: hidden;
  cursor:pointer;
  box-sizing: border-box;
  padding:0 8px;
  margin-bottom: 40px;
}

#select-footer{
  display:flex;
  justify-content: center;
  padding-bottom: 40px;
}

#footer-pagination{
  width:fit-content;
}
</style>

<script setup>
import { addEyes, getList, getPlatform } from '@/utils/preRequest'
import { ref, watch, reactive, computed } from 'vue'
let dataList = ref([])
import { useRouter,useRoute } from 'vue-router'
import useSystemStore from '@/store/system'

getPlatform()
const systemStore = useSystemStore()
const router = useRouter()
const route = useRoute()
const input = ref(route.query.searchText)
const selectId = computed(() => {
  if (systemStore.platform.length === 5) {
    return systemStore.platform.filter((item)=>item.name == route.query.sourceName)[0].id
  }
  return null
})

// 根据信息获取对应数据列表
const getDataList = (sourceId, searchText, current = 1, size = 30) => {
  getList(current, size, sourceId, null, searchText).then((data) => {
    if (data) {
      paging.pageSize = data.size
      paging.totalCount = data.total
      paging.currentPage = data.current
      dataList.value = data.records
    }
    // console.log(dataList)
  })
}

watch([()=>route.query.searchText,selectId], (x) => {
  console.log(x)
  getDataList(x[1],x[0])
}, {immediate:true})
// 分页数据
let paging = reactive({
  currentPage: 1,
  pageSize: 10,
  totalCount: 0,
})

// 页数据量变化
const sizeChange = (val) => {
  paging.pageSize = val
  paging.currentPage = 1
  getDataList(selectId.value,input.value,1,paging.pageSize)
}

// 当前页号变化
const currentChange = (val) => {
  paging.currentPage = val
  getDataList(selectId.value,input.value ,paging.currentPage,paging.pageSize)
}




// 前往具体资讯页面
const goPoster = (id) => {
  addEyes(id)
  let routeData = router.resolve({
    path :`/Poster/${id}`
  })
  window.open(routeData.href,'_blank')
}
</script>