<template>
  <!-- <SvgIcon id="x" name="comments"></SvgIcon> -->
  <div>
    <div id="bilibili-content">
      <img id="content-img" :src="records.coverUrl">
      <div id="content-count">
        <div class="count-box">
          <SvgIcon class="box-icon" name="view"></SvgIcon>
          <div>{{ records.viewCount }}</div>
        </div>
        <div class="count-box">
          <SvgIcon class="box-icon" name="comment"></SvgIcon>
          <div>{{ records.commentCount }}</div>
        </div>
        <div class="count-box">
          <SvgIcon class="box-icon" name="like"></SvgIcon>
          <div>{{ records.likeCount }}</div>
        </div>
      </div>
    </div>
    <div id="bilibili-title">{{ limitTitle(records.title )}}</div>
    <div id="bilibili-footer">
      <SvgIcon class="box-icon" name="bilibili"></SvgIcon>
      <div id="footer-name">{{ records.authorName }}</div>
      <div id="footer-time">{{ records.publishTime }}</div>
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
  border-radius: 8px;
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
  display: flex;
  position:relative;
  width:100%;
  margin-top:4px;
  font-size:13px;
  color:#9499A0;
}

#footer-name{
  margin-left:5px;
}

#footer-time{
  position:absolute;
  right:0;
}
</style>

<script setup>

import { limitTitle } from '@/utils/operate';
import { defineProps } from 'vue'
const props = defineProps({
  // resources: {
  //   type: Object,
  // }
})

const records = {
  "id": 1,
  "title": "黑马程序员DeepSeek最新保姆级新手教程，AI大模型应用开发合集直播🤬",
  "coverUrl": "https://fastly.picsum.photos/id/46/100/100.jpg?hmac=V3N0AGkYVGYKQEWzJVngQWVZl2b351l2LXRs8xkdyjQ",
  "authorName": "zjh",
  "url": "https://www.bilibili.com/video/BV1iQNueoEBD/",
  "publishTime": "8-24",
  "viewCount": 1839,
  "likeCount": 50,
  "commentCount": 70,
  "keywordId": 1,
  "sourceId": 1
}
</script>
