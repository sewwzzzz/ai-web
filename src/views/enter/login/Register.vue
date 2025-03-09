<template>
  <div id="box-input">
    <el-form
      ref="registerFormRef"
      :model="registerForm"
      status-icon
      :rules="rules"
      label-width="80px"
      id="register-form"
      label-position="left"
    >
      <el-form-item label="账号" prop="account">
        <el-input v-model="registerForm.account" type="text" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input v-model="registerForm.pass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          v-model="registerForm.checkPass"
          type="password"
          autocomplete="off"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit"
          >注册</el-button
        >
        <el-button @click="exit">返回登录</el-button>
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
#register-form{
  margin-top:10px;
  margin-left:10px;
  margin-right:10px;
}
</style>

<script setup>
import { ref, reactive, defineEmits } from 'vue'
import { register } from '@/utils/preRequest'

const emit = defineEmits(["exitRegister"])

// 退出注册模式
const exit = () => {
  emit('exitRegister')
  if (!registerFormRef.value) return
  registerFormRef.value.resetFields()
}

const registerFormRef = ref()
const registerForm = reactive({
  account:'',
  pass: '',
  checkPass:''
})

const validatePass = (rule, value, callback) => {
  if (value.length < 6 || value.length > 15) {
    callback(('长度请控制在 6 到 15 个字符'))
  }
  if (registerForm.checkPass !== '') {
    if (!registerFormRef.value) return
    registerFormRef.value.validateField('checkPass', () => null)
  }
  callback()
}

const validateCheckPass = (rule, value, callback) => {
  if (value !== registerForm.pass) {
    callback(('两次输入密码不一致'))
  } else {
    callback()
  }
}

const rules = reactive({
  account: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {min:3,max:15,message:'长度请控制在 3 到 15 个字符', trigger:'blur'}
  ],
  pass: [
    { required: true, message: '请输入登录密码', trigger: 'blur' },
    {trigger:'blur',validator:validatePass}
  ],
  checkPass: [
    { required: true,message: '请再次输入密码', trigger: 'blur' },
    { validator:validateCheckPass,trigger:'blur'}
  ]
})

const submit = () => {
  if (!registerFormRef.value) return
  registerFormRef.value.validate(async (valid) => {
    if (valid) {
      // console.log(registerForm)
      register(registerForm.account, registerForm.pass, registerForm.checkPass)
    }
  })
}
</script>

