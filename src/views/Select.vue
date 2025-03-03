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
import { getList } from '@/utils/preRequest'
import { ref,reactive, provide, watch } from 'vue'
let dataList = ref([])
import { useRouter } from 'vue-router'
import useSystemStore from '@/store/system'

const systemStore = useSystemStore()
const router = useRouter()
const target = reactive({
  sourceName: '',
  keyName: '',
  type:false
})

provide('select', target)

watch(target, (x) => {
  console.log(x)
  getDataList(systemStore.platform.filter((item)=>item.name == x.sourceName)[0].id,x.keyName)
})
// 分页数据
let paging = reactive({
  currentPage: 1,
  pageSize: 30,
  totalCount: 400,
})

// 页数据量变化
const sizeChange = (val) => {
  paging.pageSize = val
  getDataList(target.sourceId,target.keyName,paging.currentPage,paging.pageSize)
}

// 当前页号变化
const currentChange = (val) => {
  paging.currentPage = val
  getDataList(target.sourceId,target.keyName,paging.currentPage,paging.pageSize)
}


// 根据信息获取对应数据列表
const getDataList = (secondId, firstName, current = 1, size = 30) => {
  getList(current, size, secondId, firstName).then((data) => {
    paging.pageSize = data.size
    paging.totalCount = data.total
    paging.currentPage = data.current
    dataList.value = data.records
    console.log(dataList)
  })
}

// 前往具体资讯页面
const goPoster = (id) => {
  let routeData = router.resolve({
    path :`/Poster/${id}`
  })
  window.open(routeData.href,'_blank')
}
</script>