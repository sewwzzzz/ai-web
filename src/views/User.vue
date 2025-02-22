<template>
  <div id="user">
    <div id="user-header">
      <Header></Header>
    </div>
    <div id="user-profile">
      <img src="" id="profile-avator" />
      <div id="profile-box">
        <div id="box-name">周建辉</div>
        <el-button type="primary" plain id="box-button">设置</el-button>
      </div>
    </div>
    <div id="user-content">
      <div id="content-naw">
        <div class="naw-box" v-for="(item,index) in headerOption" :key="index" @click="changeOption(item.icon)">
          <div class="box-module">
            <SvgIcon class="box-icon" :name="item.icon"></SvgIcon>
            <div :class="[currentOption === item.icon? 'box-name-sure' : 'box-name']">{{item.name}}</div>
          </div>
          <div class="box-line"></div>
        </div>
      </div>
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
  margin-top:20px;
  margin-left:25%;
  width:50%;
  height:200px;
  background-color: white;
  box-sizing: border-box;
  padding:20px 20px;
  display: flex;
}

#profile-avator{
  width:100px;
  height:100px;
}

#profile-box{
  height:100%;
  margin-left:10px;
  flex:1;
  flex-shrink: 0;
  position: relative;
}

#box-name{
  font-size:18px;
  font-weight: 700;
}

#box-button{
  position: absolute;
  right:0;
  bottom:0;
  font-size:16px;
  width:116px;
  height:32px;
  cursor:pointer;
}

#user-content{
  margin-top:20px;
  margin-left:25%;
  width:50%;
  background-color: white;
  height:400px;
}

#content-naw{
  width:100%;
  height:60px;
  display:flex;
  border-bottom: rgb(217, 217, 227) 0.5px solid;
}

.naw-box{
  
}

.box-line{
  width:30px;
  height:0;
  border-bottom: #2992ca 2px solid;
  margin-left:40px;
  overflow: hidden;
}

.box-module{
  box-sizing: border-box;
  width:fit-content;
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
  height:18px;
  font-size:16px;
  color:rgb(144, 144, 158);
}

.box-name-sure{
  margin-left:2px;
  height:18px;
  font-size:16px;
  color:black;
}

.box-name:hover{
  color:#2992ca;
}
</style>

<script setup>
import Header from '@/components/Header.vue'
import SvgIcon from '@/components/SvgIcon.vue'
import { headerOption } from '@/datas/config'
import { ref } from 'vue'

let currentOption = ref('foot')

// 选中栏目
const changeOption = (icon) => {
  currentOption.value = icon
}

</script>