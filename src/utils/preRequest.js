import request from "./request"
import useInfoStore from "@/store/info"
const infoStore = useInfoStore()
import { commitMessage } from "@/datas/config"

// result要么是null要么是code = 200

// 注册
async function register(userName, password) {
  const data = {
    username: userName,
    password: password
  }
  const config = {
    url: '/user/register',
    data: data,
    method: 'POST'
  }
  const result = await request(config)
  console.log('register响应结果:', result)
  if (result) {
    commitMessage('success', result.message)
  }
}


// 登录
async function login(userName, password) {
  const data = {
    username: userName,
    password: password
  }
  const config = {
    url:'/user/login',
    data: data,
    method: 'POST'
  }
  const result = await request(config)
  console.log('login响应结果:', result)
  if (result) {
    infoStore.setToken(result.data)
    localStorage.setItem('token', result.data)
    getUserInfo()
    commitMessage('success', result.message)
    return true
  }
  return false
}

// 获取当前用户信息
async function getUserInfo() {
  const config = {
    url: '/user/loginUserInfo',
    method: 'GET',
    token: infoStore.token,
  }
  const result = await request(config)
  console.log('getUserInfo响应结果:', result)
  if (result) {
    const data = result.data
    infoStore.setUserName(data.username)
    infoStore.setAvatarUrl(data.avatarUrl)
    infoStore.setNickName(data.nickname)
    infoStore.setId(data.id)
  }
}


export{
  register,
  login,
  getUserInfo,
}