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
  const token = infoStore.token ? infoStore.token : localStorage.getItem('token')
  if (!token) {
    commitMessage('warning', '请登录后再操作')
    return
  } 
  const config = {
    url: '/user/loginUserInfo',
    method: 'GET',
    token: token,
  }
  const result = await request(config)
  console.log('getUserInfo响应结果->', result)
  if (result) {
    const data = result.data
    infoStore.setToken(token)
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

// 获取历史记录
async function getHistory(current, size, keyword) {
  if (!infoStore.token) {
    commitMessage('warning', '请登录后再操作')
    return
  } 
  const params = {
    current: current,
    size:size,
  }
  const data = {
    userId: infoStore.id,
    keyword:keyword
  }
  const config = {
    url: '/browsingHistory/page',
    method: 'PUT',
    params: params,
    data: data,
    token:infoStore.token
  }
  const result = await request(config)
  if (result) return result.data
}

// 删除某个历史记录
async function deleteHistory(id) {
  const config = {
    url: `/browsingHistory/${id}`,
    token: infoStore.token,
    method:'DELETE'
  }
  const result = await request(config)
  console.log(result)
}

// 修改收藏夹名称
async function editCollectName(id, name) {
  const data = {
    id: id,
    name: name
  }
  const config = {
    url: '/collection',
    method: 'PUT',
    token: infoStore.token,
    data: data
  }
  const result = await request(config)
  console.log("修改收藏夹名称:", result)
}

// 新建收藏夹
async function newCollect(name) {
  if (!infoStore.token) {
    commitMessage('warning', '请登录后再操作')
    return
  } 
  const data = {
    name: name,
    userId:infoStore.id
  }
  const config = {
    url: '/collection',
    method: 'POST',
    token: infoStore.token,
    data:data
  }
  const result = await request(config)
  console.log("新建收藏夹:",result)
}

// 根据收藏夹id获取当前内容

// 删除收藏夹
async function deleteCollect(id) {
  const config = {
    url: `/collection/${id}`,
    method: 'DELETE',
    token: infoStore.token,
  }
  const result = await request(config)
  console.log('删除收藏夹结果:',result)
}

// 移动到另一个收藏夹
async function moveCollect(id, destCollectionId) {
  const data = {
    id: id,
    destCollectionId:destCollectionId
  }
  const config = {
    url: '/collectionResource/move',
    token: infoStore.token,
    method: 'POST',
    data:data
  }
  const result = await request(config)
  console.log("移动到另一收藏夹:",result)
}

// 删除收藏夹内容
const deleteCollectList = async(id) => {
  const config = {
    url: `/collectionResource/${id}`,
    token: infoStore.token,
    method:'DELETE'
  }
  const result = await request(config)
  console.log("删除收藏夹内容:",result)
} 

// 收藏内容
const collect = async (resourceId, collectionId) => {
  if (!infoStore.token) {
    commitMessage('warning', '请登录后再操作')
    return
  } 
  const data = {
    resourceId: resourceId,
    collectionId:collectionId
  }
  const config = {
    url: '/collectionResource',
    token: infoStore.token,
    method: 'POST',
    data:data
  }
  const result = await request(config)
  console.log("收藏内容:",result)
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
  getHistory,
  deleteHistory,
  editCollectName,
  newCollect,
  deleteCollect,
  moveCollect,
  deleteCollectList,
  collect
}