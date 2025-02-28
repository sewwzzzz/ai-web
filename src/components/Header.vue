<template>
  <div id="main-login" v-show="showLogin">
    <Enter @exit-login="showLoginCmpt"></Enter>
  </div>
  <div id="main-reset" v-show="showReset">
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
  </div>
  <div id="main-mask" v-show="showLogin || showReset">
  </div>
  <div id="header">
    <div id="aside-sign" @click="backMain()">
      <svg-icon id="sign-icon" name="aiweb"></svg-icon>
      <div id="sign-title">AI资讯</div>
    </div>
    <div ref="headerRef" id="article-header">
      <SelectInput ref="inputRef" id="header-input" :platform="systemStore.platform"></SelectInput>
      <div id="header-right">
        <img v-if="infoStore.id" id="right-avatar" @click="touchAvatar" :src="infoStore.avatarUrl">
        <div  v-else id="right-avatar" @click="touchLogin">登录</div>
        <ToolIcon v-for="(item,index) in tools" :key="index" :name="item.name" :title="item.title" @click="jumpTools(item)">
        </ToolIcon>
      </div>
    </div>
  </div>
</template>


<style scoped>
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
#header{
  display:flex;
}
#aside-sign{
  display:flex;
  justify-content: center;
  align-items: center;
  width:150px;
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

#article-header{
  position:relative;
  width:calc(100% - 150px);
  height:64px;
  background: linear-gradient(to right, #4b9ff3, #f6c533); /* 初始渐变 */
  /* 动画名称 | 持续时间 | 循环次数 | 动画方向 */
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
</style>

<script setup>
import SelectInput from './SelectInput.vue'
import ToolIcon from './ToolIcon.vue'
import { tools } from '@/datas/config' 
import { debounce } from '@/utils/operate'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import useSystemStore from '@/store/system'
import useInfoStore from '@/store/info'
import { uploadFile, updateUserInfo } from '@/utils/preRequest'
import Enter from '@/views/enter/Enter.vue'
import { openWindowWithPromise, sendInfoMessage } from '@/utils/broadcast'
const router = useRouter()
const inputRef = ref(null)
const headerRef = ref(null)
const systemStore = useSystemStore()
const infoStore = useInfoStore()
const showLogin = ref(0)
const showReset = ref(0)   
const imageUrl = ref('')
const nickName = ref('')
let imgFile
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
  console.log(imgFile)
}

// 转换文件/图像
const transformFile = (file) => new Promise((resolve,reject) => {
  const fileReader = new FileReader()
  fileReader.onload = (e) => {
    resolve(String.fromCharCode.apply(null, new Uint8Array(e.target.result)))
    
  }
  fileReader.onerror = (error) => {
    reject(error)
  }
  fileReader.readAsArrayBuffer(file)
})

// 上传用户信息
const updateInfo = async () => {
  let file = ''
  if (imgFile) {
    file = await transformFile(imgFile)
    // console.log("转换后的二进制文件:",file)
    uploadFile(file).then((url) => {
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
  showReset.value = 1
  nickName.value = infoStore.nickName
  imageUrl.value = infoStore.avatarUrl
}

// 退出重置信息界面
const exitReset = () => {
  showReset.value = 0
}

// 点击登录
const touchLogin = () => {
  showLogin.value = 1
}

// 关闭登录界面
const showLoginCmpt = () => {
  showLogin.value = 0
}


// 元素挂载后需要执行的操作
onMounted(() => {
  updateWidth()
  window.addEventListener('resize',updateWidth)
})

// 元素销毁前需要执行的操作
onBeforeUnmount(() => {
  window.removeEventListener('resize',updateWidth)
})

// 设定搜索框的宽度
const updateWidth = debounce(() => {
  inputRef.value.setInputWidth(headerRef.value.offsetWidth*0.3)
})

// 点击 消息/动态/收藏/历史/ 后跳转路由
const jumpTools = (item) => {
  // router.push(item.path)
  let routeData = router.resolve({
    path: item.path, // 这里填写的是路由配置中定义的路由路径path或者name
  });
  openWindowWithPromise(routeData.href).then(() => {
    sendInfoMessage()
  })
}

// 刷新首页
const backMain = () => {
  router.push('/')
}
</script>