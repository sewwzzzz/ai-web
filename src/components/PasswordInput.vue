<template>
  <div>{{ props.title }}</div>
  <input class="password-input" :style="{width:props.inputWidth + 'px'}" :placeholder="props.defaultDes" :type="passwordState"/>
  <SvgIcon class="password-icon" :name="passwordState === 'password' ? 'unlook' : 'look'" @click="changePasswordState()"></SvgIcon>
</template>

<style scoped>
.password-input{
  margin-left:20px;
}

.password-icon{
  font-size:25px;
  margin-left:5px;
  color:rgb(148, 153, 160);
  cursor:pointer;
}

.password-icon:hover{
  color:rgb(48, 179, 222);
}
</style>

<script setup>
import { ref,defineProps } from 'vue'
import SvgIcon from './SvgIcon.vue';

const props = defineProps({
  title: {
    type: String,
  },
  defaultDes: {
    type:String,
  },
  inputWidth: {
    type:Number,
  },
})
let passwordState = ref("password")

// 点击改变密码图标状态
const changePasswordState = () => {
  passwordState.value = passwordState.value === 'password' ? 'text' : 'password'
}

</script>