const menu = {
  '基础知识': {
    title: '基础知识',
    blockId:1,
    icon: 'iconfont icon-zhishi',
    scrollHeight: 0,
  },
  '工具与软件': {
    title: '工具与软件',
    blockId:2,
    icon: 'iconfont icon-ruanjian',
    scrollHeight:390,
  },
  '机器学习': {
    title: '机器学习',
    blockId:3,
    icon: 'iconfont icon-jiqiren',
    scrollHeight:780,
  },
  '深度学习': {
    title: '深度学习',
    blockId:4,
    icon: 'iconfont icon-shenduxuexi',
    scrollHeight:1170,
  },
  '计算机视觉': {
    title: '计算机视觉',
    blockId:5,
    icon: 'iconfont icon-jisuanjishijue',
    scrollHeight:1560,
  },
  '自然语言处理': {
    title: '自然语言处理',
    blockId:6,
    icon: 'iconfont icon-ziranyuyanchuli',
    scrollHeight:1893,
  }
}

const tools = [
  {
    name: 'notices',
    title: '消息',
    path:'/message'
  },
  {
    name: 'dynamics',
    title: '动态',
  },
  {
    name: 'collections',
    title:'收藏'
  },
  {
    name: 'histories',
    title: '历史',
    path:'/history'
  }
]

const scrollData = {
  metaScrollHeight: 15,//滚动高度
  metaScrollTime: 8,//最小间隔时间
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

const show = [
  '贡献','获赞','订阅量'
]

const messageMenu = {
  '回复我的':{
    EMenu: 'reply',
    CMenu: '回复我的' ,
    path: '/message/reply'
  },
  '@我的':{
    EMenu: 'at',
    CMenu: '@我的',
    path:'/message/at'
  },
  '收到的赞':{
    EMenu: 'love',
    CMenu: '收到的赞',
    path:'/message/love',
  },
  '系统通知':{
    EMenu: 'system',
    CMenu: '系统通知',
    path:'/message/system'
  }
}

const headerOption = [
  {
    'icon':'foot',
    'name':'足迹',
  },
  {
    'icon':'collectable',
    'name':'收藏集',
  },
  {
    'icon':'follow',
    'name':'关注'
  }
]

const commitMessage = (type, msg) => {
  ElMessage({
    message: msg,
    type: type,
  })
}

export{
  menu,
  tools,
  scrollData,
  debounce,
  show,
  messageMenu,
  headerOption,
  commitMessage,
}