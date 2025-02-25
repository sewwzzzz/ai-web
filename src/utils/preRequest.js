import request from "./request"
import useInfoStore from "@/store/info"
import { menu } from "@/datas/config"
import { commitMessage } from "@/datas/config"
import useSystemStore from "@/store/system"
const infoStore = useInfoStore()
const systemStore = useSystemStore()

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
  console.log('register响应结果->', result)
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
  console.log('login响应结果->', result)
  if (result) {
    infoStore.setToken(result.data)
    localStorage.setItem('token', result.data)
    getUserInfo()
    getBlockList()
    getKeyWord()
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
  console.log('getUserInfo响应结果->', result)
  if (result) {
    const data = result.data
    infoStore.setUserName(data.username)
    infoStore.setAvatarUrl(data.avatarUrl)
    infoStore.setNickName(data.nickname)
    infoStore.setId(data.id)
  }
}

// 上传文件
async function uploadFile(file) {
  const config = {
    url: '/file/upload',
    token: infoStore.token,
    method: 'post',
    data: {
      file:file
    }
  }
  const result = await request(config)
  console.log('uploadFile响应结果->', result)
  if (result) {
    return result.data
  }
}


// 修改登录用户信息
async function updateUserInfo(nickName , avatarUrl) {
  const data = {
    id: infoStore.id,
    nickname: nickName,
    avatar : avatarUrl
  }
  const config = {
    url: '/user',
    method: 'PUT',
    token: infoStore.token,
    data:data
  }
  const result = await request(config)
  if (result) {
    commitMessage('success', '信息更新成功')
    infoStore.nickName = nickName
    infoStore.avatarUrl = avatarUrl
  }
}

// 获取所有资讯模块
async function getBlockList() {
  const config = {
    url: '/block/list',
    method: 'GET',
    token: infoStore.token,
  }
  const result = await request(config)
  if (result) {
    const data = result.data
    console.log(data)
    data.forEach((item) => {
      menu[item.name].blockId = item.id
    })
    console.log("Block栏->",menu)
  }
}

// 获取所有关键字
async function getKeyWord() {
  const config = {
    url: '/keyword/list',
    method: 'GET',
    token : infoStore.token
  }
  const result = await request(config)
  if (result) {
    const data = result.data
    systemStore.setMenuTitle(data)
  }
}


export{
  register,
  login,
  getUserInfo,
  uploadFile,
  updateUserInfo,
  getBlockList,
  getKeyWord,
}