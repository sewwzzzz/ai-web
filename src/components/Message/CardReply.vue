<template>
    <div class="reply">
      <img class="reply-avatar" src="../../assets/img/AIWeb.png">
      <div class="reply-content">
        <div class="content-header">
          <span class="review-name">{{ props.nickName }}</span>
          <span class="review-font">回复了我的评论</span>
          <div class="review-reply">{{ props.reply }}</div>
          <div class="header-source">{{ props.source }}</div>
        </div>
        <div class="content-footer">
          <div class="footer-time">10月前</div>
          <FooterGoods></FooterGoods>
          <FooterReply @reply=changeReplyState></FooterReply>
        </div>
        <div class="footer-input" v-show="showReply">
          <el-input
          v-model="textarea"
          :autosize="{ minRows: 5, maxRows: 5 }"
          type="textarea"
          placeholder="Please input"
          maxlength="1000"
          show-word-limit
          >
          </el-input>
          <el-button class="input-button" type="primary" :disabled="textarea === ''?true:false">回复</el-button>
      </div> 
      </div>
    </div>
</template>

<style scoped>
.reply{
  width:100%;
  height:fit-content;
  display:flex;
  box-sizing: border-box;
  padding:20px 10px;
}
.reply-avatar{
  width:46px;
  height:46px;
  border-radius: 50%;
  margin-right:20px;
}

.reply-content{
  flex:1;
  height:fit-content;
}

.content-header{
  width:100%;
  position:relative;
}

.review-name{
  font-weight:bold;
  font-family: "Microsoft YaHei", "Microsoft Sans Serif", "Microsoft SanSerf", "微软雅黑";
  font-size: 16px;
}

.review-font{
  margin-left:10px;
  color:#505050;
  size:12px;
  font-family: "Microsoft YaHei", "Microsoft Sans Serif", "Microsoft SanSerf", "微软雅黑";
}

.review-reply{
  font-family: "Microsoft YaHei", "Microsoft Sans Serif", "Microsoft SanSerf", "微软雅黑";
  font-size:14px;
  margin-top:10px;
  width:fit-content;
}

.header-source{
  position:absolute;
  right:0;
  top :0;
  height:60px;
  width:60px;
}

.content-footer{
  margin-top: 10px;
  display:flex;
  gap:10px;
}

.footer-time{
  height:100%;
  margin-right: 10px;
  color:#8a919f;
}

.footer-input{
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
.input-button{
  position: relative;
  margin-left:20px;
  width:80px;
  top:100%;
  transform:translateY(-100%);
}
</style>

<script setup>
import { defineProps, ref } from 'vue'
const props = defineProps({
  avatar: {
    type:String,
  },
  nickName: {
    type: String,
    default:'周建辉'
  },
  reply: {
    type: String,
    default:'他回复了我的评论区信息'
  },
  source: {
    type: String,
    default:'吕德华真滴C！！！'
  }
})

const showReply = ref(false)
const changeReplyState = (type) => {
  showReply.value = type
}
</script>