<template>
  <div id="footer" @click="updateState()">
    <SvgIcon name="footerreply" :class="[props.isComment ? 'footer-reply-sure' : 'footer-reply']"></SvgIcon>
    <div :class="[props.isComment ? 'footer-num-sure' : 'footer-num']">{{ props.isComment ? '取消回复' : '回复'}}</div>
  </div>
</template>

<style scoped>
#footer{
  height:18px;
  display:flex;
  padding:0 10px;
  cursor: pointer;
}

#footer:hover > *{
  color:rgb(30, 128, 255);
}

.footer-reply{
  width:18px;
  height:18px;
  margin-right:3px;
  color:#8a919f;
  transition: color 0.3s linear; 
}

.footer-reply-sure{
  width:18px;
  height:18px;
  margin-right:3px;
  color:rgb(30, 128, 255);
  transition: color 0.3s linear;
}
.footer-num{
  font-size:14px;
  color:#8a919f;
  transition: color 0.3s linear;
}
.footer-num-sure{
  font-size:14px;
  color:rgb(30, 128, 255);
  transition: color 0.3s linear;
}

</style>

<script setup>
import {  defineEmits,defineProps } from 'vue'
const props = defineProps({
  isComment: {
    type:Boolean
  }
})

const emit = defineEmits(['reply'])

// 控制评论的'评论拉起/关闭'状态
const updateState = function(){
    emit('reply',!props.isComment)
}
</script>