<template>
  <div id="badge-content" @click="updateState()">
    <SvgIcon name="goods" :class="[isA?'content-icon-sure':'content-icon']"></SvgIcon>
    <div :class="[isA?'content-number-sure':'content-number']">{{ num }}</div>
  </div>
</template>

<style scoped>
#badge-content{
  position:relative;
  background-color: rgb(255, 255, 255);
  height:50px;
  width:50px;
  border-radius: 50%;
  cursor:pointer;
}
#badge-content:hover .content-icon{
  color:rgb(81, 87, 103);
}
.content-icon{
  position:absolute;
  width:20px;
  height:20px;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  color:rgb(194, 200, 209);
}
.content-icon-sure{
  position:absolute;
  width:20px;
  height:20px;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  color:rgb(30, 128, 255);
}
.content-number{
  position:absolute;
  left:70%;
  border-radius: 9px;
  padding:0px 5px;
  background-color: rgb(194, 200, 209);
  font-size: 11px;
  line-height: 17px;
  text-align: center;
  color: white;
}
.content-number-sure{
  position:absolute;
  left:70%;
  border-radius: 9px;
  padding:0px 5px;
  font-size: 11px;
  line-height: 17px;
  text-align: center;
  color: white;
  background-color:rgb(30, 128, 255);
}
</style>

<script setup>
import { defineProps,ref } from 'vue'
import SvgIcon from './SvgIcon.vue'
const props = defineProps({
  number: {
    type: Number,
    default:0,
  },
  name: {
    type:String,
  },
  isActive: {
    type: Boolean,
    default:false
  }
})
let num = ref(props.number)
let isA = ref(props.isActive)
const updateState = function () {
  if (num.value === props.number) {
    num.value += 1
    isA.value = true
  }
  else {
    num.value -= 1
    isA.value = false
  }
}
</script>