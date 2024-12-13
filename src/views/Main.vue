<template>
    <header id="main-header">

    </header>
    <div id="main-div">
      <aside id="main-aside">
        <div v-for="(item,index) in menu" :key="index" class="main-title">
          <div :class="item.icon"></div>
          <div class="title">{{item.title}}</div>
        </div>
      </aside>
      <article id="main-article">

      </article>
    </div>
</template>

<style lang="css" scoped>
#main-header{
  width:100%;
  height:64px;
  /* x偏移量 | y偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
  box-shadow: 0 5px 10px -5px rgb(108, 108, 108);
}

#main-div{
  height: calc(100% - 64px - 5px);
  display:flex;
  margin-top:5px;
}

#main-aside{
  width:150px;
  height:100%;
  background-color:rgb(249, 249, 249);
}

.main-title{
  height: 60px;
  width:100%;
  /* 位置 */
  display: flex;
  align-items:center;
  /* 字体 */
  font-weight:400;
  font-size:14px;
  color:rgb(81, 92, 107);
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
}

.main-title:hover{
  background-color: rgb(224, 224, 224);
  color:rgb(89, 97, 249);
  cursor:pointer;
}

.title{
  margin-left:5px;
}
#main-article{
  flex:1;
  height:100%;
  background-color:rgb(231, 238, 244);
}
</style>

<script setup>
const menu = {
  baseKnowledge: {
    title: '基础知识',
    icon: 'iconfont icon-zhishi',
  },
  tool: {
    title: '工具与软件',
    icon:'iconfont icon-ruanjian',
  },
  machineLearning: {
    title: '机器学习',
    icon:'iconfont icon-jiqiren',
  },
  deepLearning: {
    title: '深度学习',
    icon: 'iconfont icon-shenduxuexi',
  },
  computerVision: {
    title: '计算机视觉',
    icon:'iconfont icon-jisuanjishijue',
  },
  naturalLanguageProcessing: {
    title: '自然语言处理',
    icon:'iconfont icon-ziranyuyanchuli',
  }
}
</script>