<template>
  <div id="brief-content">
    <div id="content-header">
      <!-- <img id="header-avatar"/> -->
      {{ keyWord?keyWord.name:'' }}
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
  height:100px;
  width:300px;
  background-color: white;
  display: flex;
  flex-direction: column;
}
#content-header{
  width:100%;
  height: 50px;
  display:flex;
  justify-content: center;
  align-items: center;
}
#header-avatar{
  width:50px;
  height:50px;
  border-radius: 50%;
  cursor:pointer;
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
  font-size: 15px;
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
import { computed, defineProps, ref } from 'vue'
import useSystemStore from '@/store/system'
import { updateSubscription } from '@/utils/preRequest';


const systemStore = useSystemStore();

const props = defineProps({
  keywordId: {
    type:Number,
  }
})
let keyWord = ref(systemStore.menuTitle.filter((x)=> x.id === props.keywordId)[0])
console.log("keyword",keyWord.value)
let state = computed(() => {
  return keyWord.value.status ? '' : 'primary'
})

// 更新作者简介的'订阅'状态
const updateState = function () {
  keyWord.value.status = !keyWord.value.status
  updateSubscription(keyWord.value.subscribeId, keyWord.value.status);
}
</script>