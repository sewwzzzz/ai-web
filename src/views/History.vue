<template>
  <div id="history-header">
    <Header></Header>
  </div>
  <div id="history-content">
    <div id="content-title">
      <SvgIcon name="history" id="title-icon"></SvgIcon>
      历史记录
    </div>
    <div id="content-record">
        <div v-show="!deleteState" :class="[currentMenu === item.id ? 'record-select-sure' : 'record-select']" v-for="(item) in systemStore.platform" :key="item.id" @click="changeMenu(item.id)">
          {{ item.name }}
        </div>
        <div v-show="!deleteState" id="record-right">
          <el-input
            placeholder="Please input"
            class="input-with-select"
          >
            <template #append>
              <el-button>
                <el-icon>
                  <i-ep-search></i-ep-search>
                </el-icon>
              </el-button>
            </template>
          </el-input>
          <ToolButton name="cleanhistory" func="清空历史" @click="popupMessageBox('记录删除后不可恢复','确定要删除所有的历史记录?',deleteAll)"></ToolButton>
          <ToolButton id="right-button" name="batchmanagement" func="批量管理" @click="changeDelState()"></ToolButton>
        </div>

        <div v-show="deleteState" id="record-left">
          <div id="left-check" @click="changeAllState">
            <CheckBox class="check" :isCheck="checkAll"></CheckBox> 
            <div id="check-font">全选</div>
          </div>
          <div id="left-font">
            已经选择 {{ cnt }} 条记录
          </div>
          <div id="left-split">
            |
          </div>
          <ToolButton name="deletehistory" func="删除记录" @click="popupMessageBox('记录删除后不可恢复','确定要删除选中的历史记录?',deleteCheck)"></ToolButton>
        </div>
        <ToolButton v-show="deleteState" id="record-right" name="exitmanagement" func="退出管理" @click="changeDelState()"></ToolButton>
    </div>
    <div v-show="infoStore.id" id="content">
      <div class="content-box"  @click="changeOrJump(item.id)" v-for="(item) in dataList.filter((x)=>x.sourceId == currentMenu)" :key="item.id">
        <CheckBox v-show="deleteState" class="box-check" :isCheck="checkList[item.id]"></CheckBox>
        <HistoryBilibili :records="item"></HistoryBilibili>
      </div>
    </div>
  </div>
  <div v-show="!infoStore.id" id="unlogin">
      <UnLogin></UnLogin>
    </div>
  <div v-show="infoStore.id" id="history-footer">
    <Pagination id="footer-pagination" :paging = paging @sizeChange="sizeChange" @currentChange="currentChange"></Pagination>
  </div>
</template>

<style scoped>
#unlogin{
  margin-top:60px;
  height:300px;
  width:450px;
  position:absolute;
  left:50%;
  transform:translateX(-50%);
}

#content{
  display:flex;
  flex-direction:row;
  flex-wrap:wrap;
  flex-direction: space-between;
  margin-top:30px;
}

.content-box{
  flex-basis:20%;
  flex-shrink: 0;
  flex-grow: 0;
  overflow: hidden;
  cursor:pointer;
  box-sizing: border-box;
  padding:0 8px;
  margin-bottom: 40px;
  position:relative;
}
.box-check{
  position:absolute;
  left:15px;
  top:7px;
  width:20px;
  height:20px;
  border-color: rgb(255, 255, 255);
}

.check{
  width:15px;
  height:15px;
  border-color: rgb(175, 178, 180);
}

#history-footer{
  display:flex;
  justify-content: center;
  padding-bottom:40px;
}

#footer-pagination{
  width:fit-content;
}

.input-with-select .el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}

.el-input{
  width:200px;
  margin-right:16px;
}

#history-header{
  width:100%;
}

#history-content{
  padding:20px 15%;
  /* background-color: beige; */
  overflow:hidden;
}

#content-title{
  width:100%;
  height:40px;
  display:flex;
  font-size:26px;
  font-weight:600px;
  align-items:center;
  margin-top:20px;
}

#title-icon{
  width:30px;
  height:30px;
  margin-right:10px;
}

#content-record{
  width:100%;
  display: flex;
  margin-top:20px;
  position:relative;
}

.record-select{
  display:flex;
  justify-content:center;
  align-items: center;
  background-color: white;
  box-sizing:border-box;
  width:fit-content;
  height:34px;
  padding:0 15px;
  font-size: 14px;
  border-radius: 6px;
  font-weight: 400;
  cursor: pointer;
  color:rgb(97, 102, 109);
  margin-right:15px;
}

.record-select:hover{
  background-color: rgb(241, 242, 243);
}

.record-select-sure{
  display:flex;
  justify-content:center;
  align-items: center;
  background-color: rgb(223, 246, 253);
  box-sizing:border-box;
  width:fit-content;
  height:34px;
  padding:0 15px;
  font-size: 14px;
  border-radius: 6px;
  font-weight: 400;
  cursor: pointer;
  color:rgb(0, 174, 236);
  margin-right:15px;
}
#record-right{
  position:absolute;
  display:flex;
  right:0;
}

#right-button{
  margin-left:5px;
}

#record-left{
  display:flex;
  justify-content: center;
  align-items: center;
}

#left-check{
  display:flex;
  align-items: center;
  cursor: pointer;
}

#left-check:hover .check{
  border-color: rgb(0, 170, 255);
}

#check-font{
  font-size:15px;
  font-weight:400;
  margin-left:10px;
  color:rgb(24, 25, 28);
}

#left-split{
  margin: 0 20px;
}

#left-font{
  font-size: 14px;
  font-weight:550;
  color:rgb(125, 130, 137);
  margin-left:26px;
}

#record-right{
  float:right;
}
</style>

<script setup>
import CheckBox from '@/components/CheckBox.vue';
import HistoryBilibili from '@/components/History/HistoryBilibili.vue';
import ToolButton from '@/components/ToolButton.vue'
import useSystemStore from '@/store/system'
import { deleteHistory, getHistory, getPlatform} from '@/utils/preRequest';
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import useInfoStore from '@/store/info'
import { popupMessageBox } from '@/utils/operate';

const systemStore = useSystemStore()
const infoStore = useInfoStore()
const router = useRouter()

// 获取最新平台信息
getPlatform()

// 参考b站只要登陆状态发生变化且id存在才能发送历史记录
watch(()=>infoStore.id, (val) => {
  if (val) {
    getDataList()
  }
})

let deleteState = ref(0)
let currentMenu = ref(systemStore.platform[0].id)
let dataList = ref([])
let checkList = reactive({}) // 记录所有source条件下的id的checkBox情况
let trueList = new Set() // 记录当前source条件下checkBox选项为true的id
let cnt = ref(0) // 记录当前source条件下checkBox选项为true的数量
let checkAll = ref(false) // 全选的checkBox选项情况

// 管理所有数据
const changeAllState = () => {
  checkAll.value = !checkAll.value
  const datas = dataList.value.filter((item) => item.sourceId == currentMenu.value)
  if (checkAll.value) {
    for (let x of datas) {
      checkList[x.id] = true
      trueList.add(x.id)
    }
    cnt.value = datas.length
  } else {
    for (let x of datas) {
      checkList[x.id] = false
    }
    cnt.value = 0
    trueList.clear()
  }
}

// 删除记录
const deleteCheck = () => {
  for (let x of trueList) {
    // 调用接口
    deleteHistory(x)
  }
  getDataList(paging.currentPage,paging.pageSize)
  trueList.clear()
  cnt.value = 0
  deleteState.value = !deleteState.value
}

// 清空所有
const deleteAll = () => {
  for (let x of dataList.value) {
    // 调用接口
    deleteHistory(x)
  }
  getDataList(paging.currentPage,paging.pageSize)
}

// 分页数据
let paging = reactive({
  currentPage: 1,
  pageSize: 30,
  totalCount: 400,
})

const getDataList = (current = 1, size = 30)=>{
  getHistory(current, size).then((data) => {
    if (data) {
      paging.currentPage = data.current
      paging.pageSize = data.size
      paging.totalCount = data.total
      dataList.value = data.resources
      checkList = {}
      for (let item in data.resources) {
        checkList[item.id] = false
      }
    }
  })
}

// 页数据量变化
const sizeChange = (val) => {
  paging.pageSize = val
  getDataList(paging.currentPage,paging.pageSize)
}

// 当前页号变化
const currentChange = (val) => {
  paging.currentPage = val
  getDataList(paging.currentPage,paging.pageSize)
}

// 改变当前选择框的状态
const changeCheckState = (id) => {
  checkList[id] = !checkList[id]
  if (checkList[id]) {
    trueList.add(id)
    cnt.value++
  }
  else {
    trueList.delete(id)
    cnt.value--
    if(checkAll.value) checkAll.value = false
  }
} 

// 前往具体资讯页面
const goPoster = (id) => {
  let routeData = router.resolve({
    path :`/Poster/${id}`
  })
  window.open(routeData.href,'_blank')
}

// 删除还是跳转到具体页面
const changeOrJump = (id) => {
  if (deleteState.value) changeCheckState(id)
  else goPoster(id)
}

// 改变是否允许删除的状态
const changeDelState = () => {
  deleteState.value = !deleteState.value
  if (cnt.value) {
    for (let x of trueList) {
      checkList[x] = false
    }
    cnt.value = 0
    trueList.clear()
    if(checkAll.value) checkAll.value = false
  }
}

// 点击选中菜单
const changeMenu = (newMenu) => {
  currentMenu.value = newMenu
}
</script>