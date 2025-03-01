<template>
  <div id="message">
    <div id="message-header">
      <Header></Header>
    </div>
    <div id="message-content">
      <div id="content-left">
        <div id="left-subject">
          <SvgIcon name="send" id="subject-icon"></SvgIcon>
          <span>消息中心</span>
        </div>
        <ul id="left-box">
          <li :class="[item.EMenu === currentMenu ? 'box-item-active' : 'box-item']" v-for="(item,index) in messageMenu" :key="index">{{ item.CMenu }}</li>
        </ul>
      </div>
      <div id="content-right">
        <div id="right-title">{{ currentMenu }}</div>
        <RouterView class="right-content"></RouterView> 
      </div>
    </div>
  </div>
  
</template>

<style scoped>
#message{
  background-color:rgb(199, 230, 229);
  overflow:hidden; 
  display:flex;
  flex-direction:column;
  width:100%;
  height:100%;
}
#message-header{
  width:100%;
  z-index:1;
}
#message-content{
  flex:1;
  margin:auto;
  width:70%;
  background-color:rgb(235, 245, 244);
  display: flex;
}
#content-left{
  width:140px;
  background-color:rgb(247, 251, 251);
  font-size:14px;
  font-weight:700;
  font-family:"Microsoft YaHei", "Microsoft Sans Serif", "Microsoft SanSerf", "微软雅黑";
}
#left-subject{
  width:100%;
  height:62px;
  display:flex;
  align-items:center;
  justify-content:center;
  color:rgb(51,51,51);
}
#subject-icon{
  width:20px;
  height:20px;
  margin-right:5px;
}
#left-box{
  margin:0;
  padding-left:20px;
  width:100%;
  box-sizing:border-box;
}
.box-item{
  height:40px;
  width:100%;
  color:rgb(107, 117, 127);
  cursor:pointer;
  display:flex;
  align-items:center;
}
.box-item::before{
  content:'●';
  width:10px;
  height:20px;
  margin-right: 10px;
  text-align:center;

}
.box-item-active{
  height:40px;
  width:100%;
  cursor:pointer;
  display:flex;
  align-items:center;
  color:rgb(47, 174, 227);
}
.box-item-active::before{
  content:'●';
  width:10px;
  height:20px;
  margin-right: 10px;
  text-align:center;

}
.box-item:hover{
  color:rgb(47, 174, 227);
}
#content-right{
  flex:1;
  box-sizing: border-box;
  padding: 10px 10px 0;
}
#right-title{
  box-sizing: border-box;
  width:100%;
  height:52px;
  background-color: white;
  border-width: 10px;
  border-radius: 5px;
  box-shadow: 0 0px 10px -5px rgb(134, 134, 137);
  padding: 15px 16px;
  color:rgb(102, 102, 102);
}
.right-content{
  width:100%;
  margin-top:10px;
  height:calc(100% - 62px);
}
</style>

<script setup>
import SvgIcon from '@/components/SvgIcon.vue'
import { messageMenu } from '@/datas/config'
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
let ul = ref(null)
let currentMenu = ref('')

// 元素挂载后需要执行的操作
onMounted(() => {
  ul.value = document.getElementById('left-box')
  ul.value.addEventListener('click',jump)
})

// 元素销毁前需要执行的操作
onUnmounted(() => {
  ul.value.removeEventListener('click',jump)
})


// 更新页面主题
// const setMenu = (messageCode) => {
//   currentMenu.value = messageCode
// }
// watch(
//   route,
//   (newVal) => {
//     setMenu(newVal.meta.messageCode)
//   },
//   {immediate:true,deep:true}
// )

// 点击菜单，跳转路由
const jump = (event) => {
  // console.log(messageMenu[event.target.innerText])
  if (messageMenu[event.target.innerText].EMenu !== currentMenu.value) {
    // 更新页面主题
    currentMenu.value = messageMenu[event.target.innerText].EMenu
    router.push(messageMenu[event.target.innerText].path)
  }
}
</script>