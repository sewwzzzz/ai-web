<template>
  <div id="poster">
    <div id="poster-header">
      <Header></Header>
    </div>
    <div id="poster-content">
      <div id="content-left">
        <BadgeGoods>
        </BadgeGoods>
        <BadgeComments>
        </BadgeComments>
        <BadgeStores>
        </BadgeStores>
      </div>
      <div id="content-right">
        <Brief></Brief>
      </div>
    </div>
    <div id="poster-comments">
      <div id="comments-title">评论 {{commentNum}}</div>
      <div id="comments-input">
        <img id="input-avator"/>
        <el-input
            v-model="textarea"
            type="textarea"
            :autosize="{ minRows: 5, maxRows:5 }"
            placeholder="Please input"
            maxlength="1000"
            show-word-limit
          >
        </el-input>
        <el-button id="input-button" type="primary" :disabled="textarea === ''?true:false">发送</el-button>
      </div>
      <div id="comments-sort">
        <div :class="[select?'sort-sure':'sort']" @click="updateHotSelect()">最热</div>
        <div id="sort-divider">|</div>
        <div :class="[select?'sort':'sort-sure']" @click="updateNewSelect()">最新</div>
      </div>
      <div id="comments">
        <Comment></Comment>
      </div>
    </div>
    <div id="poster-bottom"></div>
  </div>
</template>

<style scoped>
#poster{
  background-color: rgb(242, 243, 245);
  overflow:hidden;/* 父子之间margin重叠问题 */
}
#poster-header{
  position:fixed;
  width:100%;
  top:0;
  z-index:1;
}
#content-left{
  position: fixed;
  top:160px;
  margin-left:-85px;
  display:flex;
  flex-direction: column;
  gap:28px;
}
#content-right{
  position:fixed;
  top:100px;
  left:68%;
  transform: translateX(35px);
}
#poster-content{
  margin-top:100px;
  margin-left:18%;
  width:50%;
  height:800px;
  background-color:white;
}
#poster-comments{
  box-sizing: border-box;
  margin-top: 30px;
  margin-left: 18%;
  width:50%;
  background-color:white;
  padding:20px 30px;
}
#comments-title{
  width:100%;
  height:30px;
  font-size:18px;
  line-height: 30px;
  font-family:-apple-system, system-ui, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial !important;
  color:rgb(37, 41, 51);
  font-weight: 600;
}
#comments-input{
  margin-top:20px;
  width:100%;
  height:115px;
  display:flex;
}
#input-avator{
  width:50px;
  height:50px;
  border-radius: 50%;
  cursor:pointer;
}
.el-textarea{
  z-index:0;
  margin-left: 20px;
  width:calc(100% - 50px - 20px - 100px);
  height:100%; 
}
.el-textarea__inner{
  width:100%;
}
#input-button{
  position: relative;
  margin-left:20px;
  width:80px;
  top:100%;
  transform:translateY(-100%);
}
#comments-sort{
  margin-top: 20px;
  height: 20px;
  width: 100px;
  display:flex;
  justify-content: space-between;
}
.sort{
  cursor:pointer;
  color:rgb(81, 87, 103);
}
.sort-sure{
  cursor:pointer;
  color:rgb(30, 128, 255);
}
#sort-divider{
  color:rgb(194, 188, 188);
  font-weight:100;
}
#comments{
  width:100%;
  margin-top:20px;
}
#poster-bottom{
  margin-left:18%;
  width:50%;
  height: 180px;
}
</style>


<script setup>
import BadgeComments from '@/components/Badge/BadgeComments.vue';
import BadgeGoods from '@/components/Badge/BadgeGoods.vue'
import BadgeStores from '@/components/Badge/BadgeStores.vue';
import Brief from '@/components/Brief.vue';
import Comment from '@/components/Comment.vue';
import Header from '@/components/Header.vue'
import { show } from '@/datas/config'
import { ref } from 'vue'
let commentNum = ref(5)
let textarea = ref('')
let select = ref(true)
const updateHotSelect = function () {
  if(select.value) return
  select.value = !select.value
}
const updateNewSelect = function () {
  if (!select.value) return
  select.value = !select.value
}
</script>