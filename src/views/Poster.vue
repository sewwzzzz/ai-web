<template>
  <div id="poster-header">
    <Header></Header>
  </div>
  <div id="view-content">
    <div id="view-left">
      <BadgeGoods>
      </BadgeGoods>
      <BadgeComments>
      </BadgeComments>
      <BadgeStores>
      </BadgeStores>
    </div>
    <div id="view-right">
      <Brief></Brief>
    </div>
  </div>
  <div id="content-bottom"></div>
</template>

<style>
html body{
  background-color: rgb(242, 243, 245);
}
</style>

<style scoped>
#poster-header{
  position:fixed;
  width:100%;
  top:0;
}
#view-left{
  position: fixed;
  top:160px;
  margin-left:-85px;
  display:flex;
  flex-direction: column;
  gap:28px;
}
#view-right{
  position:fixed;
  top:100px;
  left:68%;
  transform: translateX(35px);
}
#view-content{
  margin-top:100px;
  margin-left:18%;
  width:50%;
  height:800px;
  background-color:white;
}
#content-bottom{
  margin-left:18%;
  width:50%;
  height: 100px;
}
</style>


<script setup>
import BadgeComments from '@/components/Badge/BadgeComments.vue';
import BadgeGoods from '@/components/Badge/BadgeGoods.vue'
import BadgeStores from '@/components/Badge/BadgeStores.vue';
import Brief from '@/components/Brief.vue';
import Header from '@/components/Header.vue'
import { show } from '@/datas/config'

</script>