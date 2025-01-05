<template>
  <div id="login">
    <SvgIcon name="exit" id="login-exit" @click="commitLogin()"></SvgIcon>
    <img id="login-img" src="../../assets/img/AIWeb.png" />
    <div id="login-line"></div>
    <div id="login-box">
      <!-- v-show不能使用在自定义组件上 -->
      <div v-show="loginState===1">
        <Register @exit-register="changeLoginState"></Register>
      </div>
      <div v-show="loginState===0">
        <Login @enter-register="changeLoginState"></Login>
      </div>
    </div>
  </div>
</template>

<style scoped>
#login{
  height:100%;
  width:100%;
  background-color: white;
  display:flex;
  align-items: center;
  border-radius: 10px;
  position:relative;
}

#login-exit{
  position:absolute;
  right:2px;
  top:2px;
  font-size:30px;
  color:rgb(90, 88, 88);
  cursor: pointer;
}

#login-exit:hover{
  color:rgb(0, 174, 236);
}

#login-img{
  height:300px;
  width:250px;
  margin-left:30px;
  /* margin-top是相对于父元素的width，不是height?! */
}

#login-line{
  height:300px;
  width:0px;
  margin-left:40px;
  border-style:solid;
  border-width: 1px;
  border-color:rgb(227, 229, 231);
}

#login-box{
  height:300px;
  width:500px;
  margin-left:40px;
  font-size:16px;
  font-weight:445;
  color:#212121;
}
</style>

<script setup>
import { ref,defineEmits } from 'vue'
import Login from './login/Login.vue'
import Register from './login/Register.vue'
import SvgIcon from '@/components/SvgIcon.vue';

let loginState = ref(0)
const emit = defineEmits(['exitLogin'])

// 进入登录/注册模式
const changeLoginState = () => {
  loginState.value = loginState.value ^ 1
}

// 关闭登录界面
const commitLogin = () => {
  emit('exitLogin')
}
</script>