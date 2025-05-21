import { scrollData } from "@/datas/config"

// 锚点滚动
const locateHeight = function (targetHeight) {
  let nowHeight = document.documentElement.scrollTop
  const direction = nowHeight < targetHeight ? 1 : -1 
  let restDistance = Math.abs(nowHeight - targetHeight)
  document.documentElement.scrollTop += direction * (restDistance % scrollData.metaScrollHeight)
  restDistance -= restDistance % scrollData.metaScrollHeight
  let interval = setInterval(() => {
    document.documentElement.scrollTop += direction * scrollData.metaScrollHeight
    restDistance -= scrollData.metaScrollHeight
    if (restDistance <= 0) {
      clearInterval(interval)
      document.documentElement.scrollTop = targetHeight
    }
  }, scrollData.metaScrollTime)
}

const debounce = function(fn,delay) {
  let timer = null
  return function () {
    const context = this
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(context,arguments)
    }, delay)
  }
}

const commitMessage = (type, msg) => {
  ElMessage({
    message: msg,
    type: type,
  })
}

const limitTitle = (title, len = 20) => {
  if (title.length > len) {
    title = title.slice(0, len + 1)
    title += '...'
  }
  return title
}

const limitTime = (time) => {
  const arr = time.slice(0, 19)
  return arr.replace('T',' ')
}

const popupMessageBox = (content, title, okCallback ,type = 'warning' , cancelCallback=()=>{}) => {
  ElMessageBox.confirm(
    content,
    title,
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: type,
    }
  )
    .then(() => {
      okCallback()
    })
    .catch(() => {
      cancelCallback()
    })
}



export {
  locateHeight,
  limitTitle,
  limitTime,
  commitMessage,
  debounce,
  popupMessageBox,
}
