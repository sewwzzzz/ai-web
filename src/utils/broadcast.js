import useInfoStore from "@/store/info"
import useSystemStore from "@/store/system"
import { menu } from "@/datas/config"
  
const infoStore = useInfoStore()
const systemStore = useSystemStore()
const channel = new BroadcastChannel('store-channel')

// msg必须为对象
const sendStoreMessage = (msg) => {
  console.log(msg)
  channel.postMessage(msg)
}

channel.onmessage = function(event){
  const type = event.data.type
  const data = event.data.data
  if (type == 'info') {
    infoStore.setAvatarUrl(data.avatarUrl)
    infoStore.setUserName(data.username)
    infoStore.setNickName(data.nickname)
    infoStore.setId(data.id)
    infoStore.setToken(data.token)
  }
  else if (type == 'system-block') {
    for (let key in menu) {
      menu[key].blockId = data.key 
    }
  }
  else if (type == 'system-keyword') {
    const temp = []
    for (let i in data) {
      temp.push(data[i])
    }
    systemStore.setMenuTitle(temp)
  }
  else if (type == 'system-platform') {
    const temp = []
    for (let i in data) {
      temp.push(data[i])
    }
    systemStore.setPlatform(temp)
  }
  console.log(event.data)
}

const sendInfoMessage = () => {
  sendStoreMessage(
    {
      type: 'info',
      data: {
        avatarUrl: infoStore.avatarUrl,
        username: infoStore.userName,
        nickname: infoStore.nickName,
        id: infoStore.id,
        token: infoStore.token
      }
    }
  )
}

const sendBlockMessage = () => {
  const data = {}
  for (let key in menu) {
    data[key] = menu[key].blockId
  }
  sendStoreMessage(
    {
      type: 'system-block',
      data: data
    }
  )
}

const sendKeywordMessage = () => {
  const data = {}, menuTitle = systemStore.menuTitle
  for (let i in menuTitle) {
    const temp = {
      name: menuTitle[i].name,
      id: menuTitle[i].id,
      blockId:menuTitle[i].blockId
    }
    data[i] = temp
  }
  sendStoreMessage(
    {
      type: 'system-keyword',
      data: data
    }
  )
}

const sendPlatformMessage = () => {
  const data = {}, platform = systemStore.platform
  for (let i in platform) {
    const temp = {
      name: platform[i].name,
      id: platform[i].id,
    }
    data[i] = temp
  }
  sendStoreMessage(
    {
      type: 'system-platform',
      data: data
    }
  )
}

// 监控window是否加载完成
function openWindowWithPromise(url) {
  return new Promise((resolve, reject) => {
    const newWindow = window.open(url, '_blank');

    if (!newWindow) {
      reject(new Error('Failed to open new window'));
    } else {
      newWindow.addEventListener('load', () => {
        resolve();
      }, false);
      newWindow.addEventListener('error', () => {
        reject(new Error('Window load error'));
      }, false);
    }
  });
}

export {
  sendBlockMessage,
  sendInfoMessage,
  sendKeywordMessage,
  sendPlatformMessage,
  openWindowWithPromise,
  
}