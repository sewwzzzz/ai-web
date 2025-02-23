import axios from "axios"

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
  return response.data
}, function (error) {
  return Promise.reject(error)
})

const request = async (config) => {
  const { url, params, method, data } = config
  const req = {
    url: url,
    method: method,
  }
  if (Object.keys(params).length != 0) {
    req['params']=params
  }
  if (Object.keys(data).length != 0) {
    req['data']=data
  }
  return instance(req).catch((error)=> {
    console.log(error)
  })
}

export default request