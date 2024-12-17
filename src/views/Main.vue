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
        <div class="main-box">
          <div class="box-title">
            基础知识
          </div>
          <div class="box-content">
            <el-menu
              ellipsis
              class="el-menu-popper-demo"
              mode="horizontal"
              :popper-offset="0"
              style="width: 600px"
            >
              <el-menu-item index="1">Processing Center</el-menu-item>
              <el-sub-menu index="2">
                <template #title>Workspace</template>
                <el-menu-item index="2-1">item one</el-menu-item>
                <el-menu-item index="2-2">item two</el-menu-item>
                <el-menu-item index="2-3">item three</el-menu-item>
              </el-sub-menu>
            </el-menu>
          </div>
        </div>
      </article>
    </div>
</template>

<style lang="css" scoped>
#main-header{
  width:100%;
  min-width: 950px;
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
  flex-shrink:0; /*使得不被flex:1的div压缩 */
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

.main-box{
  margin-top:10px;
  box-sizing: border-box;
  height:380px;
  width:100%;
  min-width: 800px;
  padding: 10px 20px;
}

.box-title{
  font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 20px;
  color:#555555;
}

.box-content{
  margin-top:5px;
  width:100%;
  height:calc(100% - 10px - 10px - 20px - 5px);
  background-color: #ffffff;
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