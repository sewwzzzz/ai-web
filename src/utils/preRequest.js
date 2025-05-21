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
async function register(userName, password,checkPassword) {
  const params = {
    username: userName,
    password: password,
    checkPassword:checkPassword,
  }
  const config = {
    url: '/user/register',
    params: params,
    method: 'POST'
  }
  const result = await request(config)
  // console.log('register响应结果->', result)
  if (result) {
    commitMessage('success', '注册成功')
  }
}


// 登录
async function login(userName, password) {
  const params = {
    username: userName,
    password: password
  }
  const config = {
    url:'/user/login',
    params: params,
    method: 'POST'
  }
  const result = await request(config)
  // console.log('login响应结果->', result)
  if (result) {
    if(!infoStore.token) commitMessage('success', '登陆成功')
    infoStore.setToken(result.data)
    localStorage.setItem('token', result.data)
    localStorage.setItem('password',password)
    getUserInfo()
    return true
  }
  return false
}

// 获取当前用户信息
async function getUserInfo() {
  const token = infoStore.token ? infoStore.token : localStorage.getItem('token')
  if (token === null) {
    return;
  }
  const config = {
    url: '/user/current',
    method: 'GET',
    token: token,
  }
  const result = await request(config)
  // console.log('getUserInfo响应结果->', result)
  if (result) {
    const data = result.data
    infoStore.setToken(token)
    infoStore.setUserName(data.username)
    infoStore.setAvatarUrl(data.avatarUrl)
    infoStore.setNickName(data.nickname)
    infoStore.setId(data.id)
    infoStore.setRole(data.role)
    infoStore.setStatus(data.status)
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
  // console.log('uploadFile响应结果->', result)
  if (result) {
    return result.data
  }
}


// 修改登录用户信息
async function updateUserInfo(nickName , avatarUrl) {
  const params = {
    id: infoStore.id,
    nickname: nickName,
    avatarUrl : avatarUrl
  }
  const config = {
    url: '/user/update',
    method: 'PUT',
    token: infoStore.token,
    params:params
  }
  const result = await request(config)
  if (result) {
    await login(infoStore.userName, localStorage.getItem('password'))
    getUserInfo()
    // infoStore.nickName = nickName
    // infoStore.avatarUrl = avatarUrl

  }
}

// 获取所有资讯模块
async function getBlockList() {
  const config = {
    url: '/block/list',
    method: 'GET',
    token:infoStore.token
  }
  const result = await request(config)
  if (result) {
    const data = result.data
    // console.log(data)
    data.forEach((item) => {
      if (menu[item.name]) {
        menu[item.name].blockId = item.id
      }
      // 后来新加的板块
      else {
        menu[item.name] = {
          title: item.name,
          blockId: item.id,
          icon: 'iconfont icon-new',
          scrollHeight: 1893
        }
      }
    })
    return 
  }
}

// 获取所有关键字
async function getKeyWord() {
  const config = {
    url: '/keyword/list',
    method: 'GET',
    token:infoStore.token
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
    token:infoStore.token
  }
  const result = await request(config)
  if (result) {
    systemStore.setPlatform(result.data)
    // console.log("平台信息",result);
    return
  }
}

// 根据分页条件获取资源
async function getList(current, size, sourceId, keywordId, searchText) {
  if(sourceId === null) return
  const params = {
    current: current,
    size: size,
    keywordId: keywordId,
    searchText: searchText,
    sourceId:sourceId
  }
  const config = {
    url: '/resource/list',
    method: 'GET',
    params: params,
    token:infoStore.token
  }
  const result = await request(config)
  // console.log("getList响应结果:",result)
  if (result) return result.data
}

// 浏览量+1
async function addEyes(id) {
  const params = {
    id:id
  }
  const config = {
    url: '/resource/view/increase',
    method: 'PUT',
    params:params
  }
  const result = await request(config)
  // console.log("浏览量+1:",result)
}

// 获取资源具体展示信息
async function getResource(id) {
  const config = {
    url: `/resource/${id}`,
    method: 'GET',
    token:infoStore.token,
  }
  const result = await request(config)
  if(result) return result.data
}


// 获取历史记录
async function getHistory(current, size, searchText) {
  const params = {
    current: current,
    size: size,
    userId: infoStore.id,
    searchText:searchText
  }
  const config = {
    url: '/browsingHistory/list',
    method: 'GET',
    params: params,
    token:infoStore.token
  }
  const result = await request(config)
  if (result) return result.data
}

// 增加浏览历史记录
async function addHistory(id) {
  if (infoStore.id <= 0) {
    return;
  }
  const data = {
    resourceId: id,
    userId:infoStore.id
  }
  const config = {
    url: '/browsingHistory',
    token: infoStore.token,
    method: 'POST',
    data: data,
    type:'application/json'
  }
  const result = await request(config)
  // console.log("添加一条历史记录",result)
}

// 删除某个历史记录
async function deleteHistory(ids) {
  const config = {
    url: '/browsingHistory',
    token: infoStore.token,
    method: 'DELETE',
    params: {
      ids:ids.join(',')
    }
  }
  const result = await request(config)
  // console.log("删除一堆历史记录",result)
}

// 获取用户所有收藏夹
async function getAllCollect() {
  if (infoStore.id <= 0) {
    return;
  }
  const config = {
    url: '/collection/list',
    method: 'GET',
    token: infoStore.token,
    params: {
      userId:infoStore.id
    }
  }
  const result = await request(config)
  // console.log("所有收藏夹", result)
  if (result) {
    return result.data
  }
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
    data: data,
    type:'application/json'
  }
  const result = await request(config)
  // console.log("修改收藏夹名称:", result)
}

// 新建收藏夹
async function newCollect(name) {
  if (infoStore.id <= 0) {
    return;
  }
  const data = {
    name: name,
    userId:infoStore.id
  }
  const config = {
    url: '/collection',
    method: 'POST',
    token: infoStore.token,
    data: data,
    type:'application/json'
  }
  const result = await request(config)
  // console.log("新建收藏夹:", result)
}

// 删除收藏夹
async function deleteCollect(id) {
  const config = {
    url: `/collection/${id}`,
    method: 'DELETE',
    token: infoStore.token,
  }
  const result = await request(config)
  // console.log('删除收藏夹结果:',result)
}

// 根据收藏夹id获取当前内容
async function getCollectList(collectionId,searchText,current,size) {
  const params = {
    collectionId: collectionId,
    searchText: searchText,
    current: current,
    size:size,
  }

  const config = {
    url: '/collectionResource/list',
    method: 'GET',
    params: params,
    token:infoStore.token
  }
  const result = await request(config)
  // console.log("获得的收藏夹内容", result)
  return result.data
}

// 移动到另一个收藏夹
async function moveCollect(resourceIds,sourceCollectionId, destCollectionId) {
  const params = {
    resourceIds: resourceIds.join(),
    destCollectionId: destCollectionId,
    sourceCollectionId:sourceCollectionId
  }
  const config = {
    url: '/collectionResource/move',
    token: infoStore.token,
    method: 'POST',
    params:params
  }
  const result = await request(config)
  // console.log("移动到另一收藏夹:",result)
}

// 删除收藏夹内容
const deleteCollectList = async (collectionId, resourceIds) => {
  const params = {
    collectionId: collectionId,
    resourceIds:resourceIds.join(',')
  }
  const config = {
    url: '/collectionResource',
    token: infoStore.token,
    method: 'DELETE',
    params:params
  }
  const result = await request(config)
  // console.log("删除收藏夹内容:", result)
} 

// 收藏内容
const collect = async (resourceId, collectionId) => {
  const params = {
    resourceId: resourceId,
    collectionId:collectionId
  }
  const config = {
    url: '/collectionResource',
    token: infoStore.token,
    method: 'POST',
    params:params
  }
  const result = await request(config)
  // console.log("收藏内容:", result)
  if(result) commitMessage('success','收藏成功')
}

// 点赞资讯
async function likeResource(resourceId) {
  const params = {
    resourceId: resourceId,
    userId:infoStore.id
  }
  const config = {
    url: '/resourceLike',
    params: params,
    token: infoStore.token,
    method:'POST'
  }
  const result = await request(config)
  // console.log("点赞资讯结果:", result)
  if(result) return true
}

// 取消点赞资讯
async function unlikeResource(resourceId) {
  const params = {
    resourceId: resourceId,
    userId:infoStore.id
  }
  const config = {
    url: '/resourceLike',
    params: params,
    token: infoStore.token,
    method:'DELETE'
  }
  const result = await request(config)
  // console.log("取消点赞资讯结果:", result)
  if(result) return true
}

// 获取资讯评论
async function getCommentList(current, resourceId, size) {
  const params = {
    current: current,
    resourceId: resourceId,
    size:size
  }
  const config = {
    url: '/resourceComment/list',
    params: params,
    method: 'GET',
    token:infoStore.token
  }
  const result = await request(config)
  if(result) return result.data
}

// 查看用户是否点赞某条资讯
async function selectLike(resourceId) {
  if (infoStore.id <= 0) {
    return 
  }
  const params = {
    resourceId: resourceId,
    userId: infoStore.id
  }
  const config = {
    url: '/resourceLike/clicked',
    params: params,
    method: 'GET',
    token:infoStore.token
  }
  const result = await request(config)
  if(result) return result.data
}

// 添加评论
async function comment(content, resourceId, toId, rootId) {
  if (infoStore.id <= 0) {
    commitMessage('warning', '请先登录')
    return
  }
  const params = {
    content: content,
    resourceId: resourceId,
    toId: toId,
    rootId: rootId,
    userId: infoStore.id
  }
  const config = {
    url: '/resourceComment',
    method: 'POST',
    params: params,
    token: infoStore.token
  }
  const result = await request(config)
  if(result) return result.data
}

// 根据id获取评论
async function getCommentById(id) {
  const params = {
    id:id
  }
  const config = {
    url: '/resourceComment',
    method: 'GET',
    token: infoStore.token,
    params:params
  }
  const result = await request(config)
  // console.log("根据id获取评论：", result)
  if(result) return result.data
}

// 删除评论
async function deleteComment(id) {
  const config = {
    url: `/resourceComment/${id}`,
    method: 'DELETE',
    token:infoStore.token
  }
  const result = await request(config)
  // console.log("删除评论：",result)
}

// 分页获取消息
async function getMessage(current, size) {
  const params = {
    current: current,
    size: size,
    userId:infoStore.id
  }
  const config = {
    url: '/message',
    method: 'GET',
    token: infoStore.token,
    params:params
  }
  const result = await request(config)
  if(result) return result.data
}

// 修改消息状态
async function readedState(id) {
  const data = {
    id: id,
    status:1
  }
  const config = {
    url: "/message",
    method: 'PUT',
    token: infoStore.token,
    data: data,
    type:'application/json'
  }
  const result = await request(config)
  if(result) return result.data
}

// 删除消息
async function deleteNotice(id) {
  const data = {
    id:id
  }
  const config = {
    url: '/message',
    method: 'DELETE',
    token: infoStore.token,
    data: data,
    type:'application/json'
  }
  const result = await request(config)
  if (result) {
    commitMessage('success','删除成功')
  }
}

// 查看用户订阅状态
async function getSubscriptionList() {
  if (infoStore.id <= 0) {
    return;
  }
  const params = {
    userId:infoStore.id
  }
  const config = {
    url: "/subscription",
    method: 'GET',
    token: infoStore.token,
    params: params,
  }
  const result = await request(config);
  if (result) {
    systemStore.subscribeList = result.data
    // systemStore.subscribeList.forEach((item) => {
    //   item.status = 1
    // })
    // console.log("订阅列表",result.data)
  }
}

// 订阅关键字
async function subscribe(id) {
  if (infoStore.id <= 0) {
    commitMessage('warning','请先登录')
    return;
  }
  const data = {
    keywordId: id,
    userId: infoStore.id
  }
  const config = {
    url: '/subscription',
    method: 'POST',
    data: data,
    token: infoStore.token,
    type:'application/json'
  }
  const result = await request(config)
  // console.log("订阅关键字",result)
}

// 取消订阅状态
async function unSubsribe(id) {
  if (infoStore.id <= 0) {
    commitMessage('warning','请先登录')
    return;
  }
  const config = {
    url: `/subscription/${id}`,
    method: 'DELETE',
    token:infoStore.token
  }
  const result = await request(config)
  // console.log('取消订阅状态',result)
}

// 修改订阅状态
async function updateSubscription(id, status) {
  if(infoStore.id <= 0) return 
  const data = {
    id: id,
    status: status
  }
  const config = {
    url: '/subscription',
    method: 'PUT',
    data: data,
    token: infoStore.token,
     type:'application/json'
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
  addEyes,
  getResource,

  getHistory,
  addHistory,
  deleteHistory,

  getAllCollect,
  editCollectName,
  newCollect,
  deleteCollect,

  getCollectList,
  moveCollect,
  deleteCollectList,
  collect,

  likeResource,
  unlikeResource,
  selectLike,

  comment,
  deleteComment,
  getCommentList,
  getCommentById,

  getMessage,
  readedState,
  deleteNotice,

  getSubscriptionList,
  subscribe,
  unSubsribe,
  updateSubscription
}