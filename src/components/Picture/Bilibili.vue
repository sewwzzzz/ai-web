<template>
  <!-- <SvgIcon id="x" name="comments"></SvgIcon> -->
  <div>
    <div id="bilibili-content">
      <img v-if="props.records.coverUrl" id="content-img" :src="coverUrl">
      <SvgIcon v-else :name="coverUrl" id="content-img"></SvgIcon>
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
      <div>{{ limitTitle(props.records.authorName,10) }}</div>
      <div>{{ limitTime(props.records.publishTime) }}</div>
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
  bottom: 0px;
  width:100%;
  height:25px;
  display:flex;
  align-items:center;
  background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .5) 100%);
}

.count-box{
  display:flex;
  margin-right:10px;
  gap:3px;
  color:rgb(255, 255, 255);
  font-family: PingFang SC, HarmonyOS_Medium, Helvetica Neue, Microsoft YaHei, sans-serif;
  font-size: 14px;
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

import { limitTime, limitTitle } from '@/utils/operate';
import { computed, defineProps } from 'vue'
import useSystemStore from '@/store/system'
const systemStore = useSystemStore();
const props = defineProps({
  records: {
    type:Object,
  }
})


const coverUrl = computed(() => {
  if (systemStore.platform.length === 5) {
    return props.records.coverUrl ? props.records.coverUrl : systemStore.platform.filter((x) => {
      return x.id === props.records.sourceId
    })[0].name
  }
  return ''
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