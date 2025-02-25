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
          id: 1,
          blockId:2
        },
        {
          name: 'Pandas',
          id: 2,
          blockId:2
        },
        {
          name: '数据分析与实战',
          id: 3,
          blockId:2
        },
        {
          name: 'Pytorch',
          id: 4,
          blockId:2
        },
        {
          name: 'TenserFlow',
          id: 5,
          blockId:2
        },
        {
          name: '机器学习理论',
          id: 1,
          blockId:3
        },
        {
          name: '机器学习实战',
          id: 2,
          blockId:3
        },
        {
          name: '深度学习理论',
          id: 1,
          blockId:4
        },
        {
          name: '深度学习实战',
          id: 2,
          blockId:4
        },
        {
          name: '图像分类',
          id: 1,
          blockId:5
        },
        {
          name: '目标检测',
          id: 2,
          blockId:5
        },
        {
          name: '图像分割',
          id: 3,
          blockId:5
        },
        {
          name: '目标跟踪',
          id: 4,
          blockId:5
        },
        {
          name: '图像生成',
          id: 5,
          blockId:5
        },
        {
          name: '文本分类',
          id: 1,
          blockId:6
        },
        {
          name: '文本匹配',
          id: 2,
          blockId:6
        },
        {
          name: '文本生成',
          id: 3,
          blockId:6
        },
        {
          name: '序列标注',
          id: 4,
          blockId:6
        },
      ]
    }
  },
  getters: {
  },
  actions: {
    setMenuTitle(menuTitle) {
      this.menuTitle = menuTitle
    },
  }
})

export default useSystemStore


