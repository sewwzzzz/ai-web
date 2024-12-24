<template>
  <div id="footer" @click="updateState()">
    <SvgIcon name="footergoods" :class="[isA ? 'footer-goods-sure' : 'footer-goods']"></SvgIcon>
    <div :class="[isA ? 'footer-num-sure' : 'footer-num']">{{ num === 0 ? '点赞' : num }}</div>
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

.footer-goods{
  width:18px;
  height:18px;
  margin-right:3px;
  color:#8a919f;
  transition: color 0.3s linear; 
}

.footer-goods-sure{
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
import { defineProps,ref } from 'vue'
const props = defineProps({
  number: {
    type: Number,
    default:1
  },
  isActive: {
    type: Boolean,
    default:true
  }
})
const num = ref(props.number)
const isA = ref(props.isActive)
const updateState = function(){
  if (isA.value) {
    num.value -= 1
    isA.value = false
  } else {
    num.value += 1
    isA.value = true
  }
}
</script>