<template>
  <div id="badge-content" @click="updateState()">
    <SvgIcon name="goods" :class="[props.isActive?'content-icon-sure':'content-icon']"></SvgIcon>
    <div :class="[props.isActive?'content-number-sure':'content-number']">{{ props.number }}</div>
  </div>
</template>

<style scoped>
#badge-content{
  position:relative;
  background-color: rgb(255, 255, 255);
  height:48px;
  width:48px;
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
  transition: color 0.5s linear; 
}
.content-icon-sure{
  position:absolute;
  width:20px;
  height:20px;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
  color:rgb(30, 128, 255);
  transition: color 0.5s linear; 
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
import { defineProps, defineEmits, ref} from 'vue'
import SvgIcon from '../SvgIcon.vue'
import useInfoStore from '@/store/info'
import { commitMessage } from '@/utils/operate'

const infoStore = useInfoStore()
const props = defineProps({
  number: {
    type: Number,
    default:0,
  },
  isActive: {
    type: Boolean,
    default:false
  },
})

const emits = defineEmits(['update:number','like'])
// 点击后更新'点赞'徽章状态
const updateState = function () {
  if (infoStore.id <= 0) {
    commitMessage('warning','请先登录')
    return
  }
  // console.log("infoStore的id",infoStore.id)
  let num = props.number + (!props.isActive?1:-1)
  emits('like',!props.isActive,num)
}
</script>