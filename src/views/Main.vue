<template>
  <div id="main-login" v-show="showLogin">
    <Enter @exit-login="showLoginCmpt"></Enter>
  </div>
  <!-- <div id="main-reset" v-show="showReset">
    <Dialog title="修改个人信息" @exit="exitReset" @act="updateInfo">
      <template v-slot:dialog-content>
        <div id="dialog-name">
          <el-tag type="primary" size="large">昵称</el-tag>
          <el-input class="dialog-input" v-model="nickName" :placeholder="infoStore.nickName" />
        </div>
        <div id="dialog-avatar">
          <el-tag type="primary" size="large">头像</el-tag>
          <img class="dialog-image" :src="imageUrl" alt="">
          <el-button @click="handleImgUpload">上传文件</el-button>
          <input type="file" id="chooseImg" style="display:none;" @change="handleFileChange">
        </div>
      </template>
    </Dialog>
  </div> -->
  <div id="main-mask" v-show="showLogin">
  </div>
  <el-dialog v-model="showReset" title="修改个人信息" width="500">
    <div id="dialog-name">
      <el-tag type="primary" size="large">昵称</el-tag>
      <el-input class="dialog-input" v-model="nickName" :placeholder="infoStore.nickName" />
    </div>
    <div id="dialog-avatar">
      <el-tag type="primary" size="large">头像</el-tag>
      <img class="dialog-image" :src="imageUrl" alt="">
      <el-button @click="handleImgUpload">上传文件</el-button>
      <input type="file" id="chooseImg" style="display:none;" @change="handleFileChange">
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="exitReset">Cancel</el-button>
        <el-button type="primary" @click="updateInfo">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
  <aside id="main-aside">
      <div id="aside-sign" @click="stayMain()">
        <svg-icon id="sign-icon" name="aiweb"></svg-icon>
        <div id="sign-title">AI资讯</div>
      </div>
      <div v-for="(item) in menu" :key="item.blockId" class="aside-title" @click="locateHeight(item.scrollHeight)">
        <div :class="item.icon"></div>
        <div class="title">{{item.title}}</div>
      </div>
  </aside>
  <article id="main-article">
    <el-backtop :right="100" :bottom="100" />
    <div id="article-header" ref="headerRef">
      <SelectInput ref="inputRef" id="header-input" :platform="systemStore.platform"></SelectInput>
      <div id="header-right">
        <img v-if="infoStore.id > 0" id="right-avatar" @click="touchAvatar" :src="infoStore.avatarUrl">
        <div  v-else id="right-avatar" @click="touchLogin">登录</div>
        <ToolIcon v-for="(item,index) in tools" :key="index" :name="item.name" :title="item.title" @click="jumpTools(item)">
        </ToolIcon>
      </div>
    </div>
    <div class="article-box" v-for="(item) in menu" :key="item.blockId">
      <div class="box-title">
        {{ item.title }}
      </div>
      <div ref="boxContentRef" class="box-content">
        <div class="content-header">
          <div v-if="systemStore.menuTitle.filter((x) => x.blockId == item.blockId).length">
            <Menu ref="menuRef" :menuTitle="systemStore.menuTitle.filter((x) => x.blockId == item.blockId)" :platform="systemStore.platform" @send-id="setCurrent"></Menu>
            <el-button class="header-more" @click="goBlock(item.blockId)">
              查看更多<el-icon><i-ep-arrow-right></i-ep-arrow-right></el-icon>
            </el-button>
          </div>
        </div>
        <div class="content">
          <Bilibili class="content-box" v-for="(x) in dataList[item.blockId]" :key="x.id" :records="x" @click="goPoster(x.id)"></Bilibili>
        </div>
      </div>
    </div>
  </article>
</template>

<style lang="css" scoped>
#main-login{
  position:fixed;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  width:900px;
  height:450px;
  z-index:3;
}

#main-reset{
  position:fixed;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  width:500px;
  z-index:3;
  background-color: #ffffff;
  border-radius: 5px;
}

#login-reset:hover{
  color:rgb(0, 174, 236);
}

#dialog-name{
  padding-left:20px;
  margin:20px 0;
  display:flex;
  font-family: "Noto Sans SC";
  color:rgb(81, 85, 84);
  gap:10px;
  overflow: hidden;
}

.dialog-input{
  width:150px;
}

#dialog-avatar{
  padding-left:20px;
  margin:20px 0;
  display:flex;
  overflow: hidden;
  font-family: "Noto Sans SC";
  color:rgb(81, 85, 84);
  gap:10px;
}

.dialog-image{
  height:150px;
  width:150px;
  border:2px dotted #8fcef29e;
}

#main-mask{
  position:fixed;
  height:100%;
  width:100%;
  background-color: #555555;
  z-index:2;
  opacity: 0.6;
}
#article-header{
  position:relative;
  width:100%;
  height:64px;
  background: linear-gradient(to right, #4b9ff3, #f6c533); /* 初始渐变 */
  animation: blink 3s infinite alternate;
  opacity: 1; /* 初始透明度 */
  /* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
  box-shadow: 0 3px 10px -5px rgb(14, 4, 78);
}

@keyframes blink {
  0% { opacity: 1; } /* 完全不透明 */
  100% { opacity: 0.7; } /* 半透明 */
}

#header-input{
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%)
}

#header-right{
  float:right;
  margin-right: 10px;
  height:100%;
  display: flex;
  align-items: center;
  column-gap: 20px;
}

#right-avatar{
  border:1px solid #ffffff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: aliceblue;
  font-size:14px;
}

#right-avatar:hover{
  cursor: pointer;
}

#main-aside{
  position: fixed;
  width:150px;
  height:100%;
  background-color:rgb(249, 249, 249);
}

#aside-sign{
  display:flex;
  justify-content: center;
  align-items: center;
  width:100%;
  height:64px;
  border-bottom: 1px #e0dbdb solid;
  background-color: #ffffff;
  cursor:pointer;
}

#sign-icon{
  width:35px;
  height:35px;
}

#sign-title{
  font-family: 'Times New Roman', Times, serif;
  font-size: 30px;
  font-weight:600;
}

.aside-title{
  box-sizing: border-box;
  height: 60px;
  width:100%;
  /* 位置 */
  display: flex;
  padding-left: 10px;
  align-items:center;
  /* 字体 */
  font-weight:400;
  font-size:14px;
  color:rgb(81, 92, 107);
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
}

.aside-title:hover{
  background-color: rgb(224, 224, 224);
  color:rgb(89, 97, 249);
  cursor:pointer;
}

.title{
  margin-left:5px;
}

#main-article{
  margin-left: 150px;
  width:calc(100% - 150px);
  background-color:rgb(231, 238, 244);
  overflow: auto;
}

.article-box{
  margin-top:10px;
  box-sizing: border-box;
  height:380px;
  width:100%;
  padding: 10px 20px;
}

.box-title{
  font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 20px;
  color:#555555;
}

.box-content{
  margin-top:5px;
  width:100%;
  height:calc(100% - 10px - 10px - 20px - 5px);
  background-color: #ffffff;
}

.content-header{
  display:flex;
  position:relative;
  z-index:1;
}

.content{
  width:100%;
  box-sizing: border-box;
  padding:20px 20px;
  display:flex;
  flex-direction: space-between;
  overflow: hidden;
}

.content-box{
  flex-basis:20%;
  flex-shrink: 0;
  flex-grow: 0;
  overflow: hidden;
  cursor:pointer;
  box-sizing: border-box;
  padding:0 8px;
}

.header-more{
  position:absolute;
  top:5px;
  right:5px;
}
</style>

<script setup>
import SelectInput from '@/components/SelectInput.vue';
import ToolIcon from '@/components/ToolIcon.vue';
import { onBeforeUnmount, onMounted, ref, watch} from 'vue'
import { menu,tools} from '@/datas/config'
import {uploadFile, updateUserInfo, getBlockList, getKeyWord, getPlatform, getUserInfo, addEyes, getSubscriptionList, updateSubscription} from '@/utils/preRequest'
import { useRouter } from 'vue-router'
import useInfoStore from '@/store/info'
import useSystemStore from '@/store/system'
import {  getList } from '@/utils/preRequest'
import Enter from './enter/Enter.vue';
import { openWindowWithPromise, sendInfoMessage } from '@/utils/broadcast';
import { locateHeight,debounce } from '@/utils/operate'
const menuRef = ref(null)
const boxContentRef = ref(null)
const headerRef = ref(null)
let menuWidth = 1076
const inputRef = ref(null)
const router = useRouter()                        
const infoStore = useInfoStore()
const systemStore = useSystemStore()
const showLogin = ref(false)
const showReset = ref(false)   
const imageUrl = ref('')
const nickName = ref('')
let imgFile
let hashmap = ref(new Map())
const dataList = ref({})


Promise.all([getBlockList(), getKeyWord(), getSubscriptionList() ,getPlatform()]).then(() => {
  // 根据不同的blockID记录展示的关键词和平台的内容
  for (let key in menu) {
    const temp = menu[key]
    // console.log(systemStore.menuTitle.filter((item) => item.blockId == temp.blockId)[0])
    const titleItem = systemStore.menuTitle.filter((item) => item.blockId == temp.blockId)[0]
    if (titleItem) {
      hashmap.value.set(temp.blockId, [titleItem.id, systemStore.platform[0].id])
      getDataList(temp.blockId, systemStore.platform[0].id, titleItem.id)
    }
  }
})



// 如果token有存储在本地，那么可以认为上次用户并未主动退出，期望下次自动登录
if (infoStore.token == '' && localStorage.getItem('token')) {
  getUserInfo()
}

watch(()=>infoStore.id, (val) => {
  if (val > 0) {
    getSubscriptionList()
  }
})
// onMounted(() => {
//   // 这里会出现回到顶部又重新弹回原位置，我推测是由于menuTitle突然重新赋值导致
//   window.addEventListener('scroll', () => console.log(document.documentElement.scrollTop))
//   // document.documentElement.scrollTop = 0
// })

// 前往具体资讯页面
const goPoster = (id) => {
  addEyes(id)
  let routeData = router.resolve({
    path :`/Poster/${id}`
  })
  // openWindowWithPromise(routeData.href).then(() => {
  //   sendInfoMessage()
  // })
  window.open(routeData.href,'_blank')
}

// 根据信息获取对应数据列表
const getDataList = (blockId, sourceId, keyId, current = 1, size = 5, searchText = '') => {
  getList(current, size, sourceId, keyId, searchText).then((data) => {
    if (data) {
      dataList.value[blockId] = data.records
    }
  })
}

const getUpdateList = async(id) => {
  getSubscriptionList().then(() => {
    // console.log(systemStore.subscribeList.filter((x) => x.keywordId === id).length)
    return systemStore.subscribeList.filter((x) => x.keywordId === id).length
    // console.log("state", state.value)
  })
}

// 设置当前点击的平台及关键词
const setCurrent = async(firstId, secondId, thirdId) => {
  hashmap.value.set(thirdId, [firstId, secondId])
  // console.log("存储的Map:",hashmap)
  getDataList(thirdId, secondId, firstId)
  const result = await getUpdateList(firstId)
  if(result) updateSubscription(firstId,0)
}


// 查看更多
const goBlock = (blockId) => {
  const [keyId,sourceId] = hashmap.value.get(blockId)
  router.push(`/block/${blockId}/${keyId}/${sourceId}`)
}

// 修改头像
const handleImgUpload = () => {
  const fileInput = document.getElementById('chooseImg')
  if (fileInput) {
    fileInput.click()
  }
}
const handleFileChange = (event) => {
  imgFile = event.target.files[0]
  event.target.value = ''
  imageUrl.value = URL.createObjectURL(imgFile)
  // console.log(imgFile)
}

// 转换文件/图像
// const transformFile = (file) => new Promise((resolve,reject) => {
//   const fileReader = new FileReader()
//   fileReader.onload = (e) => {
//     resolve(e.target.result)
    
//   }
//   fileReader.onerror = (error) => {
//     reject(error)
//   }
//   fileReader.readAsArrayBuffer(file)
// })

// 上传用户信息
const updateInfo = async () => {
  if (imgFile) {
    // file = await transformFile(imgFile)
    // console.log("转换后的二进制文件:",file)
    uploadFile(imgFile).then((url) => {
      updateUserInfo(nickName.value, url)
    })
  } else {
    if (nickName.value != infoStore.nickName) {
      updateUserInfo(nickName.value, infoStore.avatarUrl)
    }
  }
  imgFile = null
  exitReset()
}

// 点击头像
const touchAvatar = () => {
  showReset.value = true
  nickName.value = infoStore.nickName
  imageUrl.value = infoStore.avatarUrl
}

// 退出重置信息界面
const exitReset = () => {
  showReset.value = false
}

// 点击登录
const touchLogin = () => {
  showLogin.value = true
}

// 关闭登录界面
const showLoginCmpt = () => {
  showLogin.value = false
}

// 设定每个板块menu和搜索框的宽度
const updateWidth = debounce(() => {
  inputRef.value.setInputWidth((headerRef.value.offsetWidth+30)*0.3)
  menuWidth = boxContentRef.value[0].offsetWidth * 0.8
  if (menuRef.value) {
    menuRef.value.forEach((item) => {
      item.setMenuWidth(menuWidth)
    })
  }
}, 100)

// 获取一下scrollTop高度
// const handleScroll = function () {
//   console.log('当前的滚动条高度', document.documentElement.scrollTop)
// }

// 元素挂载后需要执行的操作
onMounted(() => {
  updateWidth()
  window.addEventListener('resize', updateWidth)
  // window.addEventListener('scroll',handleScroll)
})

// 元素销毁前需要执行的操作
onBeforeUnmount(()=>{
  window.removeEventListener('resize', updateWidth)
  // window.removeEventListener('scroll',handleScroll)
})

// 点击 消息/动态/收藏/历史/ 后跳转路由
const jumpTools = (item) => {
  // router.push(item.path)
  if (item.title === '注销') {
    infoStore.clearInfo()
    localStorage.removeItem('token')
    localStorage.removeItem('password')
    sendInfoMessage()
    return
  }
  let routeData = router.resolve({
    path: item.path, // 这里填写的是路由配置中定义的路由路径path或者name
  });
  openWindowWithPromise(routeData.href).then(() => {
    sendInfoMessage()
  })
}


// 停留在首页
const stayMain = () => {
  router.go(0)
}


</script>