<template>
  <div :class="[props.isCheck ? 'check-box-sure' : 'check-box']">
    <SvgIcon class="box-sure-svg" v-show="props.isCheck" name="tick"></SvgIcon>
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
  border-width: 2px;
  border-color: rgb(234, 222, 222)!important;
  background-color: rgb(0, 170, 255);
  border-style:solid;
  border-radius: 3px;
  cursor:pointer;
  transition: all 0.3s ease-in-out;
  z-index: 1;
}

.box-sure-svg{
  position:absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
}
</style>

<script setup>
import SvgIcon from './SvgIcon.vue';
import { defineProps} from 'vue'

const props = defineProps({
  isCheck: {
    type:Boolean
  }
})

</script>