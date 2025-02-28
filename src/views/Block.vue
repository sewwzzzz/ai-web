<template>
  <Header></Header>
  <div id="block-navigation">
    <el-button @click="goBack">
      <el-icon><i-ep-arrow-left></i-ep-arrow-left></el-icon>返回主页
    </el-button>
    <Menu id="navigation-menu" :menu-index="route.params.keyId" :sub-index="route.params.sourceId" @send-id="setCurrent" fixed-width="calc(100% - 160px)" :menuTitle="systemStore.menuTitle.filter((keyword)=>keyword.blockId == route.params.blockId)" :platform="systemStore.platform" ></Menu>
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
import { openWindowWithPromise, sendInfoMessage } from '@/utils/broadcast'

const systemStore = useSystemStore()
const route = useRoute()
const router = useRouter()
let dataList = ref([])
// 当前展示的关键词和平台
let sourceId = route.params.sourceId
let keyName = systemStore.menuTitle.filter((item) => item.id == route.params.keyId)[0].name

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

getDataList(sourceId, keyName)


// 模拟快捷登录
// login(1, 1)


console.log('组件销毁后重新挂载')
// document.documentElement.scrollTop = 0

// 设置当前点击的平台id及关键词
const setCurrent = (firstName, firstId, secondId, thirdId) => {
  keyName = firstName
  sourceId = secondId
  console.log("当前关键词和平台id:", keyName, sourceId)
  router.push(`/block/${thirdId}/${firstId}/${secondId}`)
  getDataList(sourceId,keyName)
}

// 分页数据
let paging = reactive({
  currentPage: 1,
  pageSize: 30,
  totalCount: 400,
})

// 页数据量变化
const sizeChange = (val) => {
  paging.pageSize = val
  getDataList(sourceId,keyName,paging.currentPage,paging.pageSize)
}

// 当前页号变化
const currentChange = (val) => {
  paging.currentPage = val
  getDataList(sourceId,keyName,paging.currentPage,paging.pageSize)
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
  openWindowWithPromise(routeData.href).then(() => {
    sendInfoMessage()
  })
}
</script>