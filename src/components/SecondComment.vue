<template>
  <div id="second-comment">
    <img id="avatar-comment" :src="props.subComment.user.avatarUrl" />
    <div id="right-comment">
      <div id="comment-header">
        <div id="header-name">
          {{ props.subComment.user.nickname?limitTitle(props.subComment.user.nickname,8):'未知用户' }}
          <span> {{ props.subComment.toComment?`回复 ${props.subComment.toComment.isDelete?'已删除':limitTitle(props.subComment.toComment.user.nickname,8)} :`:': '}}</span>
        </div>
        <div id="header-content">
           {{ props.subComment.content }}
        </div>
      </div>
      <div id="comment-footer">
        <div id="footer-time">{{ limitTime(props.subComment.commentTime) }}</div>
        <!-- <FooterGoods></FooterGoods> -->
        <FooterReply :is-comment="showReply" @reply="updateReplyState"></FooterReply>
        <SvgIcon v-show="props.subComment.user.id == infoStore.id" name="deletecomment" class="delete-icon" @click="visible = true">
        </SvgIcon>
        <div v-show="visible" class="delete-popover" @mouseleave="visible = false" @click="deleteComment">删除</div>
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
        <el-button id="input-button" type="primary" :disabled="textarea === ''?true:false" @click="sendResponse">回复</el-button>
      </div> 
    </div>
  </div>
</template>

<style scoped>
#second-comment{
  width:calc(98% - 60px);
  display:flex;
}
#avatar-comment{
  width:24px;
  height:24px;
  margin-right:10px;
  border-radius: 50%;
  cursor:pointer;
  flex-shrink: 0;
}
#right-comment{
  width: calc(100% - 34px);
}
#comment-header{
  width: 100%;
  display: flex;
}
#header-name{
  font-size: 14px;
  color:#61666D;
  flex-shrink: 0;
}

#header-name span{
  color:#18191c;
}
#header-content{
  line-height: 16px;
  font-size: 16px;
  word-wrap:break-word;
  flex: 1;
}
#comment-footer{
  width:100%;
  display:flex;
  margin-top:15px;
  position:relative;
}

#comment-footer:hover .delete-icon{
  visibility:visible;
}

.delete-icon{
  position:absolute;
  right:0;
  top:0;
  size:16;
  visibility:hidden;
  color:#9499a0;
}

.delete-icon:hover{
  color:#79bbff;
}

.delete-popover{
  position:absolute;
  right:0;
  top:-33px;
  transform: translateX(35%);
  box-sizing:border-box;
  padding:8px 30px;
  border-radius:5px;
  color:rgb(97, 102, 109);
  font-size:14px;
  box-shadow:0 0 1.5px 1.5px #F1F2F3;
}

.delete-popover:hover{
  background-color:rgb(236, 242, 249);
  box-shadow:0 0 1.5px 1.5px #edeef0;
  cursor: pointer;
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
import { ref,defineProps,defineEmits } from 'vue'
import FooterReply from './Footer/FooterReply.vue'
import useInfoStore from '@/store/info'
import { limitTime, limitTitle } from '@/utils/operate'

const infoStore = useInfoStore()
let showReply = ref(false)
let textarea = ref('')
let visible = ref(false)

const emits = defineEmits(['deleteComment','sendResponse'])
const props = defineProps({
  subComment: {
    type: Object,
    // {
    //   "id": 8,
    //   "user": {
    //     "id": 3,
    //     "username": "lindc",
    //     "nickname": "ldc",
    //     "avatarUrl": null,
    //     "status": 0,
    //     "role": 0
    //   },
    //   "rootId": 4,
    //   "toComment": {
    //     "id": 7,
    //     "user": {
    //       "id": 2,
    //       "username": "lizsen",
    //       "nickname": "lizhaosheng",
    //       "avatarUrl": "fake_avaterUrl.jpg",
    //       "status": 0,
    //       "role": 0
    //     },
    //     "rootId": 4,
    //     "content": "my first son comment",
    //     "commentTime": "2025-03-08T05:13:28.000+00:00",
    //     "isDelete": 0
    //   },
    //   "content": "this is also my first son comment",
    //   "commentTime": "2025-03-08T05:15:13.000+00:00"
    // }
  }
})

// 控制评论的'评论拉起/关闭'状态 子组件: ./Footer/FooterReply.vue
const updateReplyState = function (state) {
  showReply.value = state
  if(state)textarea.value = ''
  // console.log(state)
}

// 传递删除消息
const deleteComment = () => {
  emits('deleteComment')
}

// 发送评论
const sendResponse = () => {
  showReply.value = false
  const { toComment, ...targetComment } = props.subComment
  // console.log(id,targetComment) 
  emits('sendResponse', textarea.value, props.subComment.rootId, props.subComment.id, targetComment)
  textarea.value = ''
}
</script>