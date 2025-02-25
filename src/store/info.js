import { defineStore } from "pinia"
const useInfoStore = defineStore('info', {
  state: () => {
    return {
      userName:'',
      nickName: '',
      avatarUrl: '',
      token: '',
      id: 0,
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
    clearInfo() {
      this.token = this.avatarUrl = this.nickName = this.userName = ''
      this.id = 0
    }
  }
})

export default useInfoStore