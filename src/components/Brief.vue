<template>
  <div id="brief-content">
    <div id="content-header">
      <img id="header-avator" />
      <div id="header-name">
        周建辉zjh
      </div>
    </div>
    <div id="content-article">
      <div class="article-data">
        <div>
          114
        </div>
        <div class="data-name">
          贡献
        </div>
      </div>
      <div class="article-data">
        <div>
          114
        </div>
        <div class="data-name">
          贡献
        </div>
      </div>
      <div class="article-data">
        <div>
          114
        </div>
        <div class="data-name">
          贡献
        </div>
      </div>
    </div>
    <el-button id="content-footer" :type="state" @click="updateState()">
      <el-icon v-if="state === ''">
        <i-ep-check></i-ep-check>
      </el-icon>
      <div :class="[state === '' ? 'footer-text' : '']">
        {{ state === '' ? '已订阅' : '订阅' }}
      </div>
    </el-button>
    
  </div>
</template>

<style scoped>
#brief-content{
  padding:20px;
  box-sizing: content-box;
  height:170px;
  width:300px;
  background-color: white;
  display: flex;
  flex-direction: column;
}
#content-header{
  width:100%;
  height: 50px;
  display:flex;
}
#header-avator{
  width:50px;
  height:50px;
  border-radius: 50%;
}
#header-name{
  width:calc(100% - 70px);
  height:30px;
  font-size: 18px;
  margin-left:20px;
}
#content-footer{
  height:40px;
  width:80%;
  margin:auto;
  font-size: 20px;
}
.footer-text{
  margin-left: 5px;
}
#content-article{
  flex:1;
  width:100%;
  display:flex;
  align-items: center;
  justify-content: space-around;
}
.article-data{
  width:60px;
  height:60%;
  font-size:15px;
  text-align: center;
  position: relative;
}
.data-name{
  position:absolute;
  bottom:0%;
  width:100%;
  border-width: 1px;
  border-style: solid;
  border-color: black;
}
</style>

<script setup>
import { defineProps,ref } from 'vue'
const props = defineProps({
  avator: {
    type:String,
  },
  name: {
    type:String,
  },
  number: {
    type:Array
  },
  address: {
    type:Array
  },
  isSubscribe:{
    type: Boolean,
    default:false,
  }
})
let state = props.isSubscribe ? ref('') : ref('primary')
const updateState = function () {
  state.value = state.value === '' ? 'primary' : ''
}
</script>