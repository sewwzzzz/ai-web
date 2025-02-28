import request from "./request"
import useInfoStore from "@/store/info"
import { menu } from "@/datas/config"
import { commitMessage } from "./operate"
import useSystemStore from "@/store/system"
import { sendInfoMessage, } from "./broadcast"
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
    sendInfoMessage()
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
    sendInfoMessage()
  }
}

// 获取所有资讯模块
async function getBlockList() {
  const config = {
    url: '/block/list',
    method: 'GET',
  }
  const result = await request(config)
  if (result) {
    const data = result.data
    console.log(data)
    data.forEach((item) => {
      menu[item.name].blockId = item.id
    })
    return 
  }
}

// 获取所有关键字
async function getKeyWord() {
  const config = {
    url: '/keyword/list',
    method: 'GET',
  }
  const result = await request(config)
  if (result) {
    systemStore.setMenuTitle(result.data)
    return
  }
}

// 获取所有平台信息
async function getPlatform() {
  const config = {
    url: '/source/list',
    method: 'GET',
  }
  const result = await request(config)
  if (result) {
    systemStore.setPlatform(result.data)
    return
  }
}

// 根据分页条件获取资源
async function getList(current, size, sourceId, keyword) {
  const params = {
    current: current,
    size:size
  }
  const data = {
    sourceId: sourceId,
    keyword: keyword
  }
  const config = {
    url: '/resource/list',
    method: 'POST',
    params: params,
    data:data
  }
  const result = await request(config)
  console.log("getList响应结果:",result)
  if (result) return result.data
}

// 获取资源具体展示信息
async function getResource(id) {
  const params = {}
  if (infoStore.id) {
    params['userId'] = infoStore.id
  }
  const config = {
    url: `/resource/${id}`,
    method: 'GET',
    params: params,
    token:infoStore.token,
  }
  const result = await request(config)
  if(result) return result.data
}

export{
  register,
  login,
  getUserInfo,
  uploadFile,
  updateUserInfo,
  getBlockList,
  getKeyWord,
  getPlatform,
  getList,
  getResource,

}