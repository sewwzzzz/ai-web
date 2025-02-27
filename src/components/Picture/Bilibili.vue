<template>
  <!-- <SvgIcon id="x" name="comments"></SvgIcon> -->
  <div>
    <div id="bilibili-content">
      <img id="content-img" :src="props.records.coverUrl">
      <div id="content-count">
        <div class="count-box">
          <SvgIcon class="box-icon" name="view"></SvgIcon>
          <div>{{ props.records.viewCount }}</div>
        </div>
        <div class="count-box">
          <SvgIcon class="box-icon" name="comment"></SvgIcon>
          <div>{{ props.records.commentCount }}</div>
        </div>
        <div class="count-box">
          <SvgIcon class="box-icon" name="like"></SvgIcon>
          <div>{{ props.records.likeCount }}</div>
        </div>
      </div>
    </div>
    <div id="bilibili-title">{{ limitTitle(props.records.title )}}</div>
    <div id="bilibili-footer">
      <SvgIcon class="box-icon" name="bilibili"></SvgIcon>
      <div>{{ props.records.authorName }}</div>
      <div>{{ props.records.publishTime }}</div>
    </div>
  </div>
</template>

<style scoped>

#bilibili-content{
  width:100%;
  height:140px;
  position:relative;
}

#content-img{
  width:100%;
  height:100%;
}

#content-count{
  position:absolute;
  left:0;
  bottom:5px;
  display:flex;
}

.count-box{
  display:flex;
  margin-right:10px;
  gap:3px;
  color:aliceblue;
  font-family: PingFang SC, HarmonyOS_Medium, Helvetica Neue, Microsoft YaHei, sans-serif;
  font-size: 13px;
  margin-left: 5px;
}

.box-icon{
  width:16px;
  height:16px;
}

#bilibili-title{
  width:100%;
  height:44px;
  margin-top:10px;
  font-family: 'Noto Sans SC';
  color:#18191C;
  font-size:15px;
  font-weight:450;
}

#bilibili-footer{
  width:100%;
  margin-top:4px;
  display:flex;
  gap:5px;
  font-size:13px;
  color:#9499A0;
}
</style>

<script setup>

import { limitTitle } from '@/datas/config';
import { defineProps, defineEmits } from 'vue'
const props = defineProps({
  records: {
    type:Object,
  }
})

</script>

<!-- 
title,
coverUrl,
authorName,
publishTime,
viewCount,
likeCount,
commentCount,
-->