<template>
  <el-menu
    class="el-menu-vertical-demo"
  >
    <div id="aside-edit" v-show="showEdit">
      <Dialog :title="type?'编辑收藏夹':'新建收藏夹'" @exit="cancelDialog" @act="newOrEdit">
        <template v-slot:dialog-content>
          <ElInput v-model="targetName" id="edit-input"></ElInput>
        </template>
      </Dialog>
    </div>
    <div id="aside-mask" v-show="showEdit"></div>
    <el-sub-menu index="1">
      <template #title>
        <span>我创建的收藏夹</span>
      </template>
      <el-menu-item class="menu" index="1-0" @click="showDialog(0)">
        <SvgIcon name="new" class="icon"></SvgIcon>
        <span>新建收藏夹</span>
      </el-menu-item>
      <el-menu-item v-for="(item) in props.collectList" :key="item.id" :index="'1-'+item.id" :class="[current == item.id? 'menu-sure':'menu']">
        <SvgIcon name="folder" class="icon"></SvgIcon>
        <div class="menu-width" @click="setCurrent(item.id)">
          {{ item.name }}
        </div>
        <div 
          :class="[current == item.id? 'menu-icon-sure':'menu-icon']"
          >
            <SvgIcon class="icon" name="edit" @click="showDialog(1,item)"></SvgIcon>
            <SvgIcon class="icon" name="deletehistory" @click="popupMessageBox('收藏夹删除后不可恢复',`确定要删除收藏夹：${item.name}?`,()=>deleteFolder(item.id))"></SvgIcon>
        </div>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<style scoped>
#aside-edit{
  position:fixed;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  width:300px;
  z-index:3;
  background-color: #ffffff;
  border-radius: 5px;
}

#aside-mask{
  position:fixed;
  top:0;
  left:0;
  height:100%;
  width:100%;
  background-color: #555555;
  z-index:2;
  opacity: 0.6;
}

.el-input{
  box-sizing: border-box;
  padding:50px 15px;
}



:deep(.el-menu--inline){
  width:300px;
  height:400px;
  overflow: auto;
}

:deep(.el-menu)::-webkit-scrollbar {
  display: none;  /* Chrome, Safari, Opera*/
}

.menu{
  position:relative;
  display:flex;
  align-items: center;
  gap:15px;
  color:rgb(108, 115, 120);
}

.menu:hover{
  color:#337ecc;
}

.menu:hover .menu-icon{
  visibility:visible;
  transition: all 0.2s ease-in-out;
}

.menu-sure{
  position:relative;
  display:flex;
  align-items: center;
  gap:15px;
  color:#337ecc;
}

.menu-width{
  width:180px;
}

.menu-icon{
  visibility:hidden;
  position: absolute;
  right:0;
  top:50%;
  transform:translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  transition: all 0.2s ease-in-out;
}

.menu-icon-sure{
  position: absolute;
  right:0;
  top:50%;
  transform:translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  transition: all 0.2s ease-in-out;
}

.icon{
  height:20px;
  width:20px;
}
</style>

<script setup>
import { popupMessageBox } from '@/utils/operate'
import { deleteCollect, editCollectName, newCollect } from '@/utils/preRequest'
import { defineProps,defineEmits, ref } from 'vue'


let current = ref(0)
const props = defineProps({
  collectList: {
    type: Array,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: [
      {
        id:1,
        name:'我的收藏夹1',
      },
      {
        id:2,
        name:'我的收藏夹2',
      },
      {
        id:3,
        name:'我的收藏夹3',
      },
      {
        id:4,
        name:'我的收藏夹4',
      },
      {
        id:5,
        name:'我的收藏夹5',
      },
      {
        id:6,
        name:'我的收藏夹6',
      },
      {
        id:7,
        name:'我的收藏夹7',
      },
      {
        id:8,
        name:'我的收藏夹8',
      },
      {
        id:9,
        name:'我的收藏夹9',
      },
      {
        id:10,
        name:'我的收藏夹10',
      },
      {
        id:11,
        name:'我的收藏夹11',
      },
      {
        id:12,
        name:'我的收藏夹12',
      },
      {
        id:13,
        name:'我的收藏夹13',
      }
    ]
  }
})
let showEdit = ref(false)
let targetName = ref('')
let targetId = ref(0)
// 0:创建， 1:修改
let type = ref(0)

const emits=defineEmits(['getFavList','clearFavList'])
// 设置当前点击的选项
const setCurrent = (id) => {
  current.value = id
  emits('getFavList',id)
}

// 显示框
const showDialog = (t,item=null) => {
  type.value = t
  if (item) {
    targetName.value = item.name
    targetId.value = item.id
  } else {
    targetName.value = ''
  }
  showEdit.value = true
}

// 取消框
const cancelDialog = () => {
  showEdit.value = false
}

// 新建 或者 编辑
const newOrEdit = async() => {
  if (type.value == 0) {
    console.log(targetName.value)
    await newCollect(targetName.value)
  } else {
    console.log(targetId.value, targetName.value)
    await editCollectName(targetId.value,targetName.value)
  }
  // 重新获取收藏夹列表和当前id显示的收藏夹内容

  showEdit.value = false
}

// 删除当前文件夹
const deleteFolder = async (id) => {
  // 调用接口删除
  await deleteCollect(id)
  // 重新拉取一遍收藏夹列表

  // 如果删除的是current，那么清空外部的dataList
  if (current.value == id) {
    current.value = 0
    emits('clearFavList')
  }
}
</script>
