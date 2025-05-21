import { defineStore } from "pinia"
const useInfoStore = defineStore('info', {
  state: () => {
    return {
      userName:'',
      nickName: '',
      avatarUrl: '',
      token: '',
      id: -1,
      role: 0,
      status: 0,
    }
  },
  getters: {
  },
  actions: {
    setUserName(name) {
      this.userName = name
    },
    setNickName(name) {
      this.nickName = name
    },
    setAvatarUrl(url) {
      this.avatarUrl = url
    },
    setToken(token) {
      this.token = token
    },
    setId(id) {
      this.id = id
    },
    setRole(role) {
      this.role = role
    },
    setStatus(status) {
      this.status = status
    },
    
    clearInfo() {
      this.token = this.avatarUrl = this.nickName = this.userName = ''
      this.id = this.role = this.status = -1
    }
  }
})

export default useInfoStore