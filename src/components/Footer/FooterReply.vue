<template>
  <div id="footer" @click="updateState()">
    <SvgIcon name="footerreply" :class="[isComment ? 'footer-reply-sure' : 'footer-reply']"></SvgIcon>
    <div :class="[isComment ? 'footer-num-sure' : 'footer-num']">{{ isComment ? '取消回复' : (num === 0 ? '评论' : num) }}</div>
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
  height:18px;
  color:#8a919f;
  transition: color 0.3s linear;
}
.footer-num-sure{
  height:18px;
  color:rgb(30, 128, 255);
  transition: color 0.3s linear;
}

</style>

<script setup>
import { defineProps,ref,defineEmits } from 'vue'
const props = defineProps({
  number: {
    type: Number,
    default:1
  },
})
const emit = defineEmits(['reply'])
let num = ref(props.number)
let isComment = ref(false)
const updateState = function(){
  if (isComment.value) {
    isComment.value = false
    emit('reply',false)

  } else {
    isComment.value = true
    emit('reply',true)
  }
}
</script>