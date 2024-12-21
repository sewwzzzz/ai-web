const menuItem = ['Bilibili', '微信公众号', 'Github','huggingface']
const menu = {
  baseKnowledge: {
    title: '基础知识',
    icon: 'iconfont icon-zhishi',
    menuTitle: ['Python', '数学基础'],
    menuItem: ['Bilibili', '微信公众号', 'Github', 'huggingface'],
    scrollHeight: 0,
  },
  tool: {
    title: '工具与软件',
    icon: 'iconfont icon-ruanjian',
    menuTitle: ['Numpy', 'Pandas', '数据分析与实战','Pytorch','TenserFlow'],
    menuItem: ['Bilibili', '微信公众号', 'Github', 'huggingface'],
    scrollHeight:390,
  },
  machineLearning: {
    title: '机器学习',
    icon: 'iconfont icon-jiqiren',
    menuTitle: ['机器学习理论', '机器学习实战'],
    menuItem: ['Bilibili', '微信公众号', 'Github', 'huggingface'],
    scrollHeight:780,
  },
  deepLearning: {
    title: '深度学习',
    icon: 'iconfont icon-shenduxuexi',
    menuTitle: ['深度学习理论', '深度学习实战'],
    menuItem: ['Bilibili', '微信公众号', 'Github', 'huggingface'],
    scrollHeight:1170,
  },
  computerVision: {
    title: '计算机视觉',
    icon: 'iconfont icon-jisuanjishijue',
    menuTitle: ['图像分类', '目标检测','图像分割','目标跟踪','图像生成'],
    menuItem: ['Bilibili', '微信公众号', 'Github', 'huggingface'],
    scrollHeight:1560,
  },
  naturalLanguageProcessing: {
    title: '自然语言处理',
    icon: 'iconfont icon-ziranyuyanchuli',
    menuTitle: ['文本分配', '文本匹配','文本生成','序列标注'],
    menuItem: ['Bilibili', '微信公众号', 'Github', 'huggingface'],
    scrollHeight:1893,
  }
}

const tools = [
  {
    name: 'notices',
    title: '消息'
  },
  {
    name: 'dynamics',
    title:'动态'
  },
  {
    name: 'collections',
    title:'收藏'
  },
  {
    name: 'histories',
    title:'历史'
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

export{
  menuItem,
  menu,
  tools,
  scrollData,
  debounce
}