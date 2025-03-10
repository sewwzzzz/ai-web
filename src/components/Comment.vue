<template>
  <div id="comment">
    <img id="avatar-comment" :src="props.comment.user.avatarUrl" />
    <div id="right-comment">
      <div id="comment-name">
        {{ props.comment.user.nickname?props.comment.user.nickname:'未知用户' }}
      </div>
      <div id="comment-content">
        {{ props.comment.content }}
      </div>
      <div id="comment-footer">
        <div id="footer-time">{{ props.comment.commentTime }}</div>
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
#comment{
  width:100%;
  display:flex;
}
#avatar-comment{
  width:40px;
  height:40px;
  margin-right:20px;
  border-radius: 50%;
  cursor:pointer;
  flex-shrink: 0;
}
#right-comment{
  flex:1;
}
#comment-name{
  font-size: 14px;
  color:#61666D;
}
#comment-content{
  width: 100%;
  margin-top:10px;
  font-size: 16px;
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
import { ref,defineProps } from 'vue'
import FooterGoods from './Footer/FooterGoods.vue'
import FooterReply from './Footer/FooterReply.vue'
import useInfoStore from '@/store/info'

const infoStore = useInfoStore()
let showReply = ref(false)
let textarea = ref('')

const props = defineProps({
  comment: {
    type: Array,
    //   {
    //     "id": 6,
    //     "user": {
    //       "id": 2,
    //       "username": "lizsen",
    //       "nickname": "lizhaosheng",
    //       "avatarUrl": "fake_avaterUrl.jpg",
    //       "status": 0,
    //       "role": 0
    //     },
    //     "sonComments": [],
    //     "content": "my third comment",
    //     "commentTime": "2025-03-08T04:43:59.000+00:00"
    //    }
  }
})

// 控制评论的'评论拉起/关闭'状态 子组件: ./Footer/FooterReply.vue
const updateReplyState = function (state) {
  showReply.value = state
  console.log(state)
}
</script>