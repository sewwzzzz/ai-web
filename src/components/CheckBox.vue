<template>
  <div :class="[isCheck ? 'check-box-sure' : 'check-box']" @click="changeCheckState()">
    <SvgIcon class="box-sure-svg" v-show="isCheck" name="tick"></SvgIcon>
  </div>  
</template>

<style scoped>
.check-box{
  height:100%;
  width:100%;
  border-width: 2px;
  border-style:solid;
  border-radius: 3px;
  cursor:pointer;
  transition: all 0.3s ease-in-out;
  z-index: 1;
}

.check-box:hover{
  border-color: rgb(0, 170, 255);
}

.check-box-sure{
  position:relative;
  height:15px;
  width:15px;
  border-width: 0.5px;
  border-color: rgb(0, 170, 255);
  background-color: rgb(0, 170, 255);
  border-style:solid;
  border-radius: 3px;
  cursor:pointer;
  transition: all 0.3s ease-in-out;

}

.box-sure-svg{
  position:absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
}
</style>

<script setup>
import { ref } from 'vue'
import SvgIcon from './SvgIcon.vue';
let isCheck = ref(false)

// 更新单选框状态
const changeCheckState = () => {
  isCheck.value = !isCheck.value
}
</script>