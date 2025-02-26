import axios from "axios"
import { commitMessage } from "@/datas/config"
import router from "@/router"
import useInfoStore from "@/store/info"

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
  else if (responseData.code == 601 || responseData.code == 602) {
    const infoStore = useInfoStore()
    infoStore.clearInfo()
    setTimeout(()=>router.push('/'),3000)
    return Promise.reject('登录超时')
  }
  return Promise.reject(responseData)
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
    req['params']=params
  }
  if (data && Object.keys(data).length != 0) {
    const formdata = new FormData()
    Object.keys(data).forEach((key) => {
      formdata.append(key,data[key])
    })
    req['data']=formdata
  }
  if (token) {
    req['headers'] = {}
    req.headers['access-token'] = `Bearer ${token}`
  }
  console.log('发送的请求体:',req)
  return instance(req).catch((error)=> {
    console.log(error)
    commitMessage('error', error)
    return null
  })
}

export default request