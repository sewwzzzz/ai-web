import axios from "axios"
import { commitMessage } from "./operate"
import useInfoStore from "@/store/info"
import { sendInfoMessage } from "./broadcast"

const instance = axios.create({
  baseURL:'/api',
  timeout: 30 * 1000,
})

instance.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

instance.interceptors.response.use(function (response) {
  // 2xx会触发该步骤
  const responseData = response.data
  if (responseData.code == 200) {
    return responseData
  }
  else if (responseData.code == 203) {
    const infoStore = useInfoStore()
    infoStore.clearInfo()
    sendInfoMessage()
    return Promise.reject('您还未登录，请先登录')
  }
  return Promise.reject(responseData.description)
}, function () {
  return Promise.reject('网络错误')
})

const request = async (config) => {
  const { url, params, method, data, token } = config
  const req = {
    url: url,
    method: method,
  }
  if (params && Object.keys(params).length != 0) {
    const formParams = {}
    Object.keys(params).forEach((key) => {
      if(params[key]) formParams[key] = params[key]
    })
    req['params']=formParams
  }
  if (data && Object.keys(data).length != 0) {
    const formdata = new FormData()
    Object.keys(data).forEach((key) => {
      if(data[key]) formdata.append(key,data[key])
    })
    req['data']=formdata
  }
  if (token) {
    req['headers'] = {}
    req.headers['access-token'] = `Bearer ${token}`
  }
  console.log('发送的请求体:',req)
  return instance(req).catch((error)=> {
    console.log("error的description:",error)
    commitMessage('error', error)
    return null
  })
}

export default request