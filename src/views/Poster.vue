<template>
  <div id="poster">
    <div id="poster-header">
      <Header></Header>
    </div>
    <div id="poster-content">
      <div id="content-left">
        <BadgeGoods v-model:number="goodNum">
        </BadgeGoods>
        <BadgeComments :number="commentNum" @go-comment="goComment">
        </BadgeComments>
        <BadgeStores>
        </BadgeStores>
      </div>
      <div id="content-right">
        <Brief :name="authorName"></Brief>
      </div>
      <div id="content-title">
        {{ limitTitle(title,100)}}
      </div>
      <div id="content-tips">
        <div>{{ publishTime }}</div>
        <div>
          <SvgIcon id="tips-icon" name="look"></SvgIcon>
          <div>{{ viewNum }}</div>
        </div>
      </div>
      <img :src="coverUrl" id="content-img" @click="jump">
    </div>
    <div id="poster-comments" ref="commentRef">
      <div id="comments-title">评论 {{commentNum}}</div>
      <div id="comments-input">
        <img id="input-avatar" :src="infoStore.avatarUrl">
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
#content-title{
  font-family: -apple-system, system-ui, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, BlinkMacSystemFont, Helvetica Neue, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial ;
  width:100%;
  font-size: 25px;
  font-weight:550;
  padding:10px 0;
}

#content-tips{
  display:flex;
  width:100%;
  color:#8A919F;
  gap:20px;
  align-items: center;
  padding:10px 0;
}

#content-tips div:nth-child(2){
  display:flex;
  align-items: center;
  gap:8px;
}

#tips-icon{
  height:18px;
  width:18px;
}

#content-img{
  width:100%;
  height:500px;
  margin-top:30px;
  cursor: pointer;
}
#poster{
  background-color: rgb(242, 243, 245);
  /* 父子之间margin重叠问题 */
  overflow:hidden;
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
  margin-left:-110px;
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
  background-color:white;
  box-sizing: border-box;
  padding:30px 25px;
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
#input-avatar{
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
import { getResource } from '@/utils/preRequest';
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import useInfoStore from '@/store/info'
import { limitTitle, locateHeight } from '@/utils/operate';

let goodNum = ref(0)
let commentNum = ref(0)
let authorName = ref('')
let viewNum = ref(1839)
let url = ''
let coverUrl = ref('')
let publishTime = ref('2025-2-28')
let title = ref('')

const commentRef = ref(null)
let textarea = ref('')
let select = ref(true)
const route = useRoute()
const infoStore = useInfoStore()

onMounted(() => {
  // window.addEventListener('scroll', () => console.log(document.documentElement.scrollTop))
  // document.documentElement.scrollTop = 0
})

const goComment = () => {
  locateHeight(commentRef.value.offsetTop - 64)
}

// 判断当前根据id获取当前具体内容
const getPoster = () => {
  getResource(route.params.id).then((data) => {
    // console.log(data)
    coverUrl.value = data.coverUrl
    authorName.value = data.authorName
    publishTime.value = data.publishTime
    goodNum.value = data.likeCount
    viewNum.value = data.viewCount
    commentNum.value = data.commentCount
    title.value = data.title
    url = data.url
})
}

const jump = () => {
  window.open(url)
}

getPoster()

// 参考b站只要登陆状态发生变化就重新发送浏览请求帮后台刷新历史记录
watch(()=>infoStore.id, (val) => {
    getPoster()
})



// 点击显示最热评论
const updateHotSelect = function () {
  if(select.value) return
  select.value = !select.value
}

// 点击显示最新评论
const updateNewSelect = function () {
  if (!select.value) return
  select.value = !select.value
}
</script>