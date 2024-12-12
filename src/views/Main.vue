<template>
  <header id="main-header">

  </header>
  <div id="main-div">
    <aside id="main-aside">

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
  height:100%;
  display:flex;
  margin-top:5px;
}

#main-aside{
  width:100px;
  height:100%;
  background-color:rgb(249, 249, 249);
}

#main-article{
  flex:1;
  height:100%;
  background-color:rgb(231, 238, 244);
}
</style>

<script setup>

</script>