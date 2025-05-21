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
  // console.log("request拦截响应器",response)
  if (responseData.code == 200) {
    return responseData
  }
  else if (responseData.code == 203) {
    return null
  }
  else if(responseData.description){
    // const infoStore = useInfoStore()
    // infoStore.clearInfo()
    // sendInfoMessage()
    return Promise.reject(responseData.description)
  }
  else {
    return Promise.reject(responseData.message)
  }
  // return Promise.reject(responseData.message)
}, function () {
  return Promise.reject('网络错误')
})

const request = async (config) => {
  const { url, params, method, data, token,type } = config
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
    req['data'] = formdata
    // console.log(data)
  }
  if (token || type) {
    req['headers'] = {}
    if (token) req.headers['access-token'] = token
    if(type) req.headers['content-type'] = type
  }
  // console.log('发送的请求体:',req)
  return instance(req).catch((error)=> {
    // console.log("error的description:",error)
    commitMessage('error', error)
    return null
  })
}

export default request