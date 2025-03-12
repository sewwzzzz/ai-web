<template>
  <Header></Header>
  <div id="block-navigation">
    <el-button @click="goBack">
      <el-icon><i-ep-arrow-left></i-ep-arrow-left></el-icon>返回主页
    </el-button>
    <Menu id="navigation-menu" :menu-index="parseInt(route.params.keyId)" :sub-index="parseInt(route.params.sourceId)" @send-id="setCurrent" fixed-width="calc(100% - 160px)" :menuTitle="systemStore.menuTitle.filter((keyword)=>keyword.blockId == route.params.blockId)" :platform="systemStore.platform" ></Menu>
  </div>
  <div id="block-content">
    <Bilibili id="content-box" v-for="(item) in dataList" :key="item.id" :records="item" @click="goPoster(item.id)"></Bilibili>
  </div>
  <div id="block-footer">
    <Pagination id="footer-pagination" :paging = paging @sizeChange="sizeChange" @currentChange="currentChange"></Pagination>
  </div>
</template>

<style scoped>
#block-navigation{
  display: flex;
  align-items:center;
}

#navigation-menu{
  margin-left:50px;
}

#block-content{
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

#block-footer{
  display:flex;
  justify-content: center;
  padding-bottom: 40px;
}

#footer-pagination{
  width:fit-content;
}
</style>

<script setup>
import useSystemStore from '@/store/system'
import { getList } from '@/utils/preRequest'
import { useRoute,useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import Bilibili from '@/components/Picture/Bilibili.vue'
const systemStore = useSystemStore()
const route = useRoute()
const router = useRouter()
let dataList = ref([])
// 当前展示的关键词和平台
let sourceId = route.params.sourceId
let keyId = route.params.keyId

// 分页数据
let paging = reactive({
  currentPage: 1,
  pageSize: 30,
  totalCount: 400,
})

// 根据信息获取对应数据列表
const getDataList = (sourceId, keyId, current = 1, size = paging.pageSize, searchText = '') => {
  getList(current, size, sourceId, keyId, searchText).then((data) => {
    if (data) {
      paging.pageSize = data.size
      paging.totalCount = data.total
      paging.currentPage = data.current
      dataList.value = data.records
      console.log(dataList)
    }
  })
}

getDataList(sourceId, keyId)

// 设置当前点击的平台id及关键词
const setCurrent = (firstId, secondId, thirdId) => {
  keyId = firstId
  sourceId = secondId
  console.log("当前关键词id和平台id:", keyId, sourceId)
  router.replace(`/block/${thirdId}/${firstId}/${secondId}`)
  getDataList(sourceId,keyId)
}

// 页数据量变化
const sizeChange = (val) => {
  paging.pageSize = val
  getDataList(sourceId,keyId,paging.currentPage,paging.pageSize)
}

// 当前页号变化
const currentChange = (val) => {
  paging.currentPage = val
  getDataList(sourceId,keyId,paging.currentPage,paging.pageSize)
}

// 返回主页
const goBack = ()=>{
  router.push('/')
}

// 前往具体资讯页面
const goPoster = (id) => {
  let routeData = router.resolve({
    path :`/Poster/${id}`
  })
  window.open(routeData.href,'_blank')
}
</script>