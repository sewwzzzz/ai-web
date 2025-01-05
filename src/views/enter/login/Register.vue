<template>
  <div id="box-input">
    <div id="input-account">
      <div>账号</div>
      <input class="account-input" placeholder="请输入账号" type="text"/> 
    </div>
    <div id="input-password">
      <PasswordInput title="密码" default-des="请输入密码" :input-width="inputWidth"></PasswordInput>
    </div>
    <div id="input-check">
      <PasswordInput title="确认" default-des="请确认密码" :input-width="inputWidth"></PasswordInput>
    </div>
  </div>
  <div id="box-button">
    <div id="button-left" @click="exit()">
      返回登陆
    </div>
    <div id="button-right">
      注册
    </div>
  </div>
</template>

<style scoped>
#box-input{
  width:100%;
  border-radius:10px;
  border-style:solid;
  border-width: 1px;
  border-color:rgb(227, 229, 231);
}
#input-account{
  height:60px;
  width:100%;
  border-bottom: rgb(227, 229, 231) 1px solid;
  display:flex;
  align-items: center;
  box-sizing:border-box;
  padding-left:40px;
}

.account-input{
  margin-left:20px;
  width:350px;
}

#input-password{
  height:60px;
  width:100%;
  display:flex;
  align-items: center;
  border-bottom: rgb(227, 229, 231) 1px solid;
  box-sizing:border-box;
  padding-left:40px;
}

#input-check{
  height:60px;
  width:100%;
  display:flex;
  align-items: center;
  box-sizing:border-box;
  padding-left:40px;
}


#box-button{
  position:relative;
  margin-top:30px;
  width:100%;
  height:40px;
}

#button-left{
  position:absolute;
  left:0;
  height:100%;
  border-radius:10px;
  border-style:solid;
  border-width: 1px;
  border-color:rgb(227, 229, 231);
  width:200px;
  cursor:pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

#button-right{
  position:absolute;
  right:0;
  height:100%;
  border-radius:10px;
  border-style:solid;
  border-width: 1px;
  border-color:rgb(127, 214, 245);
  background-color: rgb(127, 214, 245);
  width:200px;
  cursor:pointer;
  color:white;
  display: flex;
  justify-content: center;
  align-items: center;
}

#button-right-active{
  position:absolute;
  right:0;
  height:100%;
  border-radius:10px;
  border-style:solid;
  border-width: 1px;
  border-color:rgb(0, 174, 236);
  background-color: rgb(0, 174, 236);
  width:200px;
  cursor:pointer;
  color:white;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<script setup>
import PasswordInput from '@/components/PasswordInput.vue'
import { ref, defineEmits } from 'vue'

const emit = defineEmits(["exitRegister"])
const inputWidth = ref(330)

// 退出注册模式
const exit = () => {
  emit('exitRegister')
}
</script>