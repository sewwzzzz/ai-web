<template>
  <div id="second-comment">
    <img id="avatar-comment" :src="infoStore.avatarUrl" />
    <div id="right-comment">
      <div id="comment-header">
        <div id="header-name">
          {{ infoStore.nickName?infoStore.nickName:'未知用户' }}:
        </div>
        <div id="header-content">
           “春招真的寄了”
        </div>
      </div>
      <div id="comment-footer">
        <div id="footer-time"> 10月前</div>
        <FooterGoods></FooterGoods>
        <FooterReply @reply="updateReplyState"></FooterReply>
      </div>
      <div id="footer-input" v-show="showReply">
        <el-input
        v-model="textarea"
        :autosize="{ minRows: 5, maxRows: 5 }"
        type="textarea"
        placeholder="Please input"
        maxlength="1000"
        show-word-limit
        >
        </el-input>
        <el-button id="input-button" type="primary" :disabled="textarea === ''?true:false">回复</el-button>
      </div> 
    </div>
  </div>
</template>

<style scoped>
#second-comment{
  width:100%;
  display:flex;
}
#avatar-comment{
  width:50px;
  height:50px;
  margin-right:15px;
  border-radius: 50%;
  cursor:pointer;
  flex-shrink: 0;
}
#right-comment{
  flex:1;
  padding-top:10px;
}
#comment-header{
  display:flex;
  align-items: center;
}
#header-name{
  height:14px;
  line-height:14px;
  font-size: 14px;
}
#header-content{
  line-height: 16px;
  height:16px;
  font-size: 16px;
  margin-left:5px;
}
#comment-footer{
  width:100%;
  display:flex;
  margin-top:10px;
}
#footer-time{
  height:100%;
  margin-right: 10px;
  color:#8a919f;
}
#footer-input{
  width:100%;
  display:flex;
  height:115px;
  margin-top:5px;
}
.el-textarea{
  z-index:0;
  width:calc(100% - 100px);
  height:100%; 
}
.el-textarea__inner{
  width:100%;
}
#input-button{
  position: relative;
  margin-left:20px;
  width:80px;
  top:100%;
  transform:translateY(-100%);
}
</style>

<script setup>
import { ref } from 'vue'
import FooterGoods from './Footer/FooterGoods.vue'
import FooterReply from './Footer/FooterReply.vue'
import useInfoStore from '@/store/info'

const infoStore = useInfoStore()
let showReply = ref(false)
let textarea = ref('')

// 控制评论的'评论拉起/关闭'状态 子组件: ./Footer/FooterReply.vue
const updateReplyState = function (state) {
  showReply.value = state
  console.log(state)
}
</script>