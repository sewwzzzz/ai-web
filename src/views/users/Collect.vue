<template>
  <div id="collect-edit" v-show="showMove">
      <Dialog title="移动到" @exit="cancelDialog" @act="moveFavlist">
        <template v-slot:dialog-content>
          <div id="dialog-list">
            <div :class="[checked == item.id?'list-sure':'list']" v-for="(item) in collectList" :key="item.id" @click="selectId(item.id)">
              <SvgIcon name="folder" class="icon"></SvgIcon>
              <div>
                {{ limitTitle(item.name) }}
              </div>
            </div>
          </div>
        </template>
      </Dialog>
    </div>
  <div id="collect-mask" v-show="showMove"></div>
  <div id="collect">
    <AsideMenu id="collect-menu" :collect-list="collectList" @get-fav-list="getFavList" @clear-fav-list="clearDataList" @getCollect="getCollect"></AsideMenu>
    <div id="collect-content">
      <div id="content-record">
        <div v-show="!deleteState" :class="[currentMenu === item.id ? 'record-select-sure' : 'record-select']" v-for="(item) in systemStore.platform" :key="item.id" @click="changeMenu(item.id)">
          {{ item.name }}
        </div>
        <div v-show="!deleteState" id="record-right">
          <el-input
            placeholder="Please input"
            v-model="searchText"
            class="input-with-select"
          >
            <template #append>
              <el-button @click="getDataList(collectionId,searchText)">
                <el-icon>
                  <i-ep-search></i-ep-search>
                </el-icon>
              </el-button>
            </template>
          </el-input>
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
          <ToolButton class="left-button" name="move" func="移动到" @click="judgeCheck(showDialog)"></ToolButton>
          <ToolButton class="left-button" name="deletehistory" func="取消收藏" @click="judgeCheck(()=>popupMessageBox('收藏取消后不可恢复',`确定要取消选中的${cnt}条收藏?`,deleteCheck))"></ToolButton>
        </div>
        <ToolButton v-show="deleteState" id="record-right" name="exitmanagement" func="退出管理" @click="changeDelState()"></ToolButton>
      </div>
      <div v-show="infoStore.id" id="content">
        <div class="content-box"  @click="changeOrJump(item.id)" v-for="(item) in dataList.filter((x)=>x.sourceId == currentMenu)" :key="item.id">
          <CheckBox v-show="deleteState" class="box-check" :isCheck="checkList[item.id]"></CheckBox>
          <Bilibili :records="item"></Bilibili>
        </div>
      </div>
      <div v-show="!infoStore.id" id="unlogin">
        <UnLogin></UnLogin>
      </div>
      <div v-show="infoStore.id && dataList.length" id="content-footer">
        <Pagination id="footer-pagination" :paging = paging @sizeChange="sizeChange" @currentChange="currentChange"></Pagination>
      </div>
    </div>
  </div>
</template>

<style scoped>
#collect-edit{
  position:fixed;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  width:300px;
  z-index:3;
  background-color: #ffffff;
  border-radius: 5px;
}

#collect-mask{
  position:fixed;
  top:0;
  left:0;
  height:100%;
  width:100%;
  background-color: #555555;
  z-index:2;
  opacity: 0.6;
}

#dialog-list{
  height: 300px;
  margin:20px 0;
  padding:0 20px;
  overflow:auto;
}

#dialog-list::-webkit-scrollbar {
  display: none;  /* Chrome, Safari, Opera*/
}

.list{
  display: flex;
  align-items: center;
  gap:20px;
  color: rgb(108, 115, 120);
  cursor:pointer;
  padding:10px 20px;
}

.list:hover{
  color:#337ecc;
}

.list-sure{
  display:flex;
  align-items: center;
  gap:20px;
  color:#337ecc;
  cursor:pointer;
  padding:10px 20px;
}

#unlogin{
  margin-top:60px;
  height:300px;
  width:450px;
  position:absolute;
  left:50%;
  transform:translateX(-50%);
}
#collect{
  display:flex;
}
#collect-menu{
  /* 保证当sub-menu的ul收起来时宽度不变，因为宽度是ul撑起来的 */
  width:300px;
}
#collect-content{
  flex: 1;
  padding-left: 20px;
  position:relative;
  overflow: hidden;
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

#content-footer{
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

.left-button{
  margin-left:8px;
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
// import HistoryBilibili from '@/components/History/HistoryBilibili.vue';
import ToolButton from '@/components/ToolButton.vue'
import useSystemStore from '@/store/system'
import { addEyes, deleteCollectList, getAllCollect, getCollectList, getPlatform, moveCollect} from '@/utils/preRequest';
import { ref, reactive, watch} from 'vue'
import { useRouter } from 'vue-router'
import useInfoStore from '@/store/info'
import { commitMessage, limitTitle, popupMessageBox } from '@/utils/operate';

const systemStore = useSystemStore()
const infoStore = useInfoStore()
const router = useRouter()

// 获取最新平台信息
getPlatform()

// 获取所有收藏夹名称
const getCollect = () => {
  getAllCollect().then((data) => {
      collectList.value = data
  })
}

// 参考b站只要登陆状态发生变化且id存在才能发送用户收藏夹
watch(()=>infoStore.id, (val) => {
  if (val) {
    getCollect()
  }
}, {
  immediate: true
})


let deleteState = ref(0)
let currentMenu = ref(systemStore.platform[0].id)
let dataList = ref([])
let checkList = reactive({}) // 记录所有source条件下的id的checkBox情况
let trueList = new Set() // 记录当前source条件下checkBox选项为true的id
let cnt = ref(0) // 记录当前source条件下checkBox选项为true的数量
let checkAll = ref(false) // 全选的checkBox选项情况
let collectionId = ref(0)
let searchText = ref('')

let checked = ref(1)
let showMove = ref(false)
let collectList = ref([]) // 收藏夹数组
// 参考b站只要登陆状态发生变化且id存在才能发送历史记录
// watch(()=>infoStore.id, (val) => {
//   if (val) {
//     getDataList()
//   }
// })
// 移动到另一收藏夹
const moveFavlist = async() => {
  // 调用接口
  await moveCollect(Array.from(trueList),collectionId.value,checked.value)
  // 调接口重新获取当前收藏夹分页数据
  getDataList(collectionId.value,searchText.value)
  showMove.value = false
}


// 判断是否选中资讯
const judgeCheck = (callback) => {
  if (cnt.value == 0) {
    commitMessage('warning', '请先选择资讯')
    return 
  }
  callback()
}

// 选中某个收藏夹
const selectId = (id) => {
  checked.value = id
}

// 显示框
const showDialog = () => {
  checked.value = collectList.value[0].id
  showMove.value = true
}

// 取消框
const cancelDialog = () => {
  showMove.value = false
}

// 点击某个收藏夹id获取该收藏夹的分页内容，前端获得该页内容再分平台展示
const getFavList = (id) => {
  collectionId.value = id
  getDataList(id)
}

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
const deleteCheck = async() => {
  await deleteCollectList(collectionId.value,Array.from(trueList))
  getDataList(collectionId.value,searchText.value)
}

// 分页数据
let paging = reactive({
  currentPage: 1,
  pageSize: 30,
  totalCount: 400,
})

const clearDataList = () => {
  dataList.value = []
  checkList = {}
  trueList.clear()
  checkAll.value = false
  cnt.value = 0
  deleteState.value = false
}

const getDataList = (collectionId, searchText = '', current = 1, size = paging.pageSize)=>{
  getCollectList(collectionId, searchText, current, size).then((data) => {
    if (data) {
      paging.currentPage = data.current
      paging.pageSize = data.size
      paging.totalCount = data.total
      dataList.value = data.records
      checkList = {}
      trueList.clear()
      checkAll.value = false
      cnt.value = 0
      deleteState.value = false
      for (let item in dataList.value) {
        checkList[item.id] = false
      }
    }
  })
}

// 页数据量变化
const sizeChange = (val) => {
  paging.pageSize = val
  getDataList(collectionId.value, searchText.value ,paging.currentPage,paging.pageSize)
}

// 当前页号变化
const currentChange = (val) => {
  paging.currentPage = val
  getDataList(collectionId.value, searchText.value,paging.currentPage,paging.pageSize)
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
  addEyes(id)
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