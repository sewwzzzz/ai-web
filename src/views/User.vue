<template>
  <div id="user">
    <div id="user-header">
      <Header></Header>
    </div>
    <div id="user-profile">
      <img :src="infoStore.avatarUrl" id="profile-avatar" />
      <div id="profile-box">
        <div id="box-name">{{ infoStore.nickName}}</div>
      </div>
      <div id="profile-naw">
        <div class="box-module" v-for="(item,index) in headerOption" :key="index" @click="changeOption(item)">
          <SvgIcon class="box-icon" :name="item.icon"></SvgIcon>
          <div :class="[currentOption === item.menu? 'box-name-sure' : 'box-name']">{{item.name}}</div>
        </div>
      </div>
    </div>
    <div id="user-content">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<style scoped>
#user{
  width:100%;
  height:100%;
  background-color: rgb(244, 245, 247);
}
#user-header{
  width:100%;
  z-index:1;
}

#user-profile{
  margin-top:5px;
  width:100%;
  background-color: white;
  box-sizing: border-box;
  padding:20px 20px;
  display: flex;
  position:relative;
}

#profile-avatar{
  width:90px;
  height:90px;
  border-radius: 5px;
  border-color: rgb(234, 230, 230);
  border-style:dashed;
}

#profile-box{
  height:100%;
  margin-left:10px;
  width:fit-content;
  flex-shrink: 0;
  position: relative;
}

#box-name{
  font-size:30px;
  font-weight: 700;
}

#user-content{
  margin-top:20px;
  box-sizing: border-box;
  padding:10px 10px;
  background-color: white;
}

#profile-naw{
  position:absolute;
  right:20px;
  bottom:20px;
  display:flex;
  /* border-bottom: rgb(217, 217, 227) 0.5px solid; */
}

.box-module{
  box-sizing: border-box;
  width:fit-content;
  height:fit-content;
  padding:0 20px;
  display:flex;
  align-items: center;
  cursor:pointer;
  overflow: hidden;
}

.box-icon{
  font-size:25px;
}

.box-name{
  margin-left:2px;
  font-size:16px;
  color:rgb(144, 144, 158);
}

.box-name-sure{
  margin-left:2px;
  height:18px;
  font-size:16px;
  color:black;
}

.box-module:hover .box-name{
  color:#2992ca;
}
</style>

<script setup>
import Header from '@/components/Header.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { headerOption } from '@/datas/config'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useInfoStore from '@/store/info'


const infoStore = useInfoStore()
let currentOption = ref()
const router = useRouter()
const route = useRoute()

// 通过route.meta设置当前菜单，可以防止刷新的情况
const setMenuCode = (menuCode) => {
  currentOption.value = menuCode
}

watch(route, (newVal) => {
  // console.log(newVal.path)
  setMenuCode(newVal.meta.messageCode)
},
{ immediate: true, deep: true })


// 选中栏目
const changeOption = (item) => {
  if(item.menu != currentOption.value)
  router.push(item.path)
}

</script>