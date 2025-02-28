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
        <div v-show="!deleteState" :class="[currentMenu === item.name ? 'record-select-sure' : 'record-select']" v-for="(item) in systemStore.platform" :key="item.id" @click="changeMenu(item.name)">
          {{ item.name }}
        </div>
        <div v-show="!deleteState" id="record-right">
          <el-input
            v-model="input"
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
          <ToolButton name="cleanhistory" func="清空历史"></ToolButton>
          <ToolButton id="right-button" name="batchmanagement" func="批量管理" @click="changeDelState()"></ToolButton>
        </div>

        <div v-show="deleteState" id="record-left">
          <div id="left-check">
            <CheckBox id="check"></CheckBox> 
            <div id="check-font">全选</div>
          </div>
          <div id="left-font">
            已经选择 {{ cnt }} 条记录
          </div>
          <div id="left-split">
            |
          </div>
          <ToolButton name="deletehistory" func="删除记录"></ToolButton>
        </div>
        <ToolButton v-show="deleteState" id="record-right" name="exitmanagement" func="退出管理" @click="changeDelState()"></ToolButton>
    </div>
    <div id="content">
      <div class="content-box">
        <CheckBox class="box-check"></CheckBox>
        <HistoryBilibili></HistoryBilibili>
      </div>
      <HistoryBilibili class="content-box"></HistoryBilibili>
      <HistoryBilibili class="content-box"></HistoryBilibili>
      <HistoryBilibili class="content-box"></HistoryBilibili>
      <HistoryBilibili class="content-box"></HistoryBilibili>
      <HistoryBilibili class="content-box"></HistoryBilibili>
      <HistoryBilibili class="content-box"></HistoryBilibili>
      <HistoryBilibili class="content-box"></HistoryBilibili>
    </div>
  </div>
  <div id="history-footer">
    <Pagination id="footer-pagination" :paging = paging @sizeChange="sizeChange" @currentChange="currentChange"></Pagination>
  </div>
</template>

<style scoped>
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

#check{
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
import { getPlatform } from '@/utils/preRequest';
import { ref,reactive } from 'vue'

let deleteState = ref(0)
let currentMenu = ref('Bilibili')
const systemStore = useSystemStore()
let dataList = ref([])

// 分页数据
let paging = reactive({
  currentPage: 1,
  pageSize: 30,
  totalCount: 400,
})

// 页数据量变化
const sizeChange = (val) => {
  paging.pageSize = val
  // getDataList(sourceId,keyName,paging.currentPage,paging.pageSize)
}

// 当前页号变化
const currentChange = (val) => {
  paging.currentPage = val
  // getDataList(sourceId,keyName,paging.currentPage,paging.pageSize)
}

// 获取最新平台信息
getPlatform()


// 改变是否允许删除的状态
const changeDelState = () => {
  deleteState.value = !deleteState.value
}

// 点击选中菜单
const changeMenu = (newMenu) => {
  currentMenu.value = newMenu
}
</script>