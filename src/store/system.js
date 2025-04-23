import { defineStore } from "pinia"
const useSystemStore = defineStore('system', {
  state: () => {
    return {
      menuTitle: [
        {
          name: 'Python',
          id: 1,
          blockId: 1
        },
        {
          name: '线性代数',
          id: 2,
          blockId: 1
        },
        {
          name: '概率与统计',
          id: 3,
          blockId: 1
        },
        {
          name: '微积分',
          id: 4,
          blockId: 1
        },
        {
          name: '离散数学',
          id: 5,
          blockId: 1
        },
        {
          name: '优化理论',
          id: 6,
          blockId: 1
        },
        {
          name: 'Numpy',
          id: 7,
          blockId:2
        },
        {
          name: 'Pandas',
          id: 8,
          blockId:2
        },
        {
          name: '数据分析与实战',
          id: 9,
          blockId:2
        },
        {
          name: 'Pytorch',
          id: 10,
          blockId:2
        },
        {
          name: 'TenserFlow',
          id: 11,
          blockId:2
        },
        {
          name: '机器学习理论',
          id: 12,
          blockId:3
        },
        {
          name: '机器学习实战',
          id: 13,
          blockId:3
        },
        {
          name: '深度学习理论',
          id: 14,
          blockId:4
        },
        {
          name: '深度学习实战',
          id: 15,
          blockId:4
        },
        {
          name: '图像分类',
          id: 16,
          blockId:5
        },
        {
          name: '目标检测',
          id: 17,
          blockId:5
        },
        {
          name: '图像分割',
          id: 18,
          blockId:5
        },
        {
          name: '目标跟踪',
          id: 19,
          blockId:5
        },
        {
          name: '图像生成',
          id: 20,
          blockId:5
        },
        {
          name: '文本分类',
          id: 21,
          blockId:6
        },
        {
          name: '文本匹配',
          id: 22,
          blockId:6
        },
        {
          name: '文本生成',
          id: 23,
          blockId:6
        },
        {
          name: '序列标注',
          id: 24,
          blockId:6
        },
      ],
      platform: [
        {
          name: 'Bilibili',
          id: 1
        },
        {
          name: '微信公众号',
          id:2
        },
        {
          name: 'Github',
          id:3
        }
      ]
    }
  },
  getters: {
  },
  actions: {
    setMenuTitle(menuTitle) {
      this.menuTitle = menuTitle
    },
    setPlatform(platform) {
      this.platform = platform
    }
  }
})

export default useSystemStore


