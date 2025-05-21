<template>
  <div id="box-input">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      status-icon
      :rules="rules"
      label-width="50px"
      id="login-form"
      label-position="left"
    >
      <el-form-item label="账号" prop="account">
        <el-input v-model="loginForm.account" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="loginForm.pass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit"
          >登录</el-button
        >
        <el-button @click="enter">返回注册</el-button>
      </el-form-item>
    </el-form>
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
#login-form{
  margin-top:10px;
  margin-left:10px;
  margin-right:10px;
}
</style>

<script setup>
import { ref, defineEmits, reactive } from 'vue'
import { login } from '@/utils/preRequest'

const emit = defineEmits(['enterRegister','exit'])
const loginFormRef = ref()
const loginForm = reactive({
  account:'',
  pass: ''
})

const validateAccount = (rule, value, callback)=>{
  if (!value) {
    callback('账户不可为空')
  }
  callback()
}

const validatePass = (rule, value, callback)=>{
  if (!value) {
    callback('密码不可为空')
  }
  callback()
}

const rules = reactive({
  account: [
    {trigger:'blur',validator:validateAccount}
  ],
  pass: [
    {trigger:'blur',validator:validatePass}
  ],
})

// 进入注册组件
const enter = () => {
  emit('enterRegister')
  if (!loginFormRef.value) return
  loginFormRef.value.resetFields()
}

const submit = () => {
  if (!loginFormRef.value) return
  loginFormRef.value.validate((valid) => {
    if (valid) {
      // console.log(loginForm)
      login(loginForm.account, loginForm.pass).then((code) => {
        if (code) {
          emit('exit')
        }
      })
    } 
  })
}
</script>