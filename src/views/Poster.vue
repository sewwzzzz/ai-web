<template>
  <div id="store-edit" v-show="showStore">
      <Dialog @exit="cancelDialog" @act="storeFavlist">
        <template v-slot:dialog-content>
          <div id="dialog-list">
            <div :class="[checked == item.id?'list-sure':'list']" v-for="(item) in storeList" :key="item.id" @click="selectId(item.id)">
              <SvgIcon name="folder" class="icon"></SvgIcon>
              <div>
                {{ limitTitle(item.name) }}
              </div>
            </div>
          </div>
        </template>
      </Dialog>
    </div>
  <div id="store-mask" v-show="showStore"></div>
  <div id="poster">
    <div id="poster-header">
      <Header></Header>
    </div>
    <div id="poster-content">
      <div id="content-left">
        <BadgeGoods v-model:number="goodNum" @like="likeOrUnlike">
        </BadgeGoods>
        <BadgeComments :number="commentNum" @go-comment="goComment">
        </BadgeComments>
        <BadgeStores :is-active="storeState" @go-store="judgeStore(cancelStore,showDialog)">
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
        <el-button id="input-button" type="primary" :disabled="textarea === ''?true:false" @click="commentOrReply(textarea),textarea = ''">发送</el-button>
      </div>
      <div id="comments-sort">
        <div :class="[select?'sort-sure':'sort']" @click="updateHotSelect()">最热</div>
        <div id="sort-divider">|</div>
        <div :class="[select?'sort':'sort-sure']" @click="updateNewSelect()">最新</div>
      </div>
      <div id="comments">
        <div v-for="(item) in commentList" :key="item.id">
          <Comment class="comment" :comment="item" @deleteComment="popupMessageBox('删除评论后，评论下所有回复都会被删除,是否继续?','删除评论',()=>deleteBothComment(item.id,item.rootId))" @sendResponse="commentOrReply">
          </Comment>
          <SecondComment class="second-comment" v-for="(subItem) in item.sonComments" :key="subItem.id" :sub-comment="subItem" @deleteComment="popupMessageBox('删除评论后，评论下所有回复都会被删除,是否继续?','删除评论',()=>deleteBothComment(subItem.id,subItem.rootId))" @sendResponse="commentOrReply"></SecondComment>
          <div class="comment-line"></div>
        </div>
        <Pagination id="comments-pagination" :paging="paging" layout="prev,pager,next" @currentChange="currentChange"></Pagination>
      </div>
    </div>
    <div id="poster-bottom"></div>
  </div>
</template>

<style scoped>
#store-edit{
  position:fixed;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  width:300px;
  z-index:3;
  background-color: #ffffff;
  border-radius: 5px;
}

#store-mask{
  position:fixed;
  top:0;
  left:0;
  height:100%;
  width:100%;
  background-color: #555555;
  z-index:2;
  opacity: 0.6;
}

#dialog-list{
  height: 300px;
  margin:20px 0;
  padding:0 20px;
  overflow:auto;
}

#dialog-list::-webkit-scrollbar {
  display: none;  /* Chrome, Safari, Opera*/
}

.list{
  display: flex;
  align-items: center;
  gap:20px;
  color: rgb(108, 115, 120);
  cursor:pointer;
  padding:10px 20px;
}

.list:hover{
  color:#337ecc;
}

.list-sure{
  display:flex;
  align-items: center;
  gap:20px;
  color:#337ecc;
  cursor:pointer;
  padding:10px 20px;
}
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
  position: relative;
  padding-bottom:60px;
}

#comments-pagination{
  position:absolute;
  bottom:0;
  left:50%;
  transform:translateX(-50%);
}

.comment{
  margin-top:22px;
  margin-bottom: 5px;
}

.second-comment{
  margin-left: 65px;
  padding:10px 0;
}

.comment-line{
  margin:0 0 0 65px;
  padding:0 0 14px;
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
import { collect, deleteCollectList, getResource,addHistory, getAllCollect, likeResource, unlikeResource, getCommentList, deleteComment, comment, getCommentById} from '@/utils/preRequest';
import { onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import useInfoStore from '@/store/info'
import { limitTitle, locateHeight, popupMessageBox } from '@/utils/operate';
import SecondComment from '@/components/SecondComment.vue';

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

let checked = ref(1)
// 记录当前收藏的收藏夹id
let checkResult = 0
let storeState = ref(false)
let showStore = ref(false)
let storeList = ref([]) // 收藏夹数组

const commentList = ref([])
let paging = reactive({
  currentPage: 1,
  pageSize: 10, // 固定
  totalCount:100
})

const getDataList = (current) => {
  getCommentList(current, route.params.id, paging.pageSize).then((data) => {
    if (data) {
      commentList.value = data.records
      paging.currentPage = data.current
      paging.totalCount = data.total 
    }
  })
}

getDataList(1)

// 根据点击的currentPage请求新的数据
const currentChange = (val) => {
  paging.currentPage = val
  getDataList(val)
}

// 进行评论
const commentOrReply = async (content,rootId,toId,toComment) => {
  console.log(content, rootId, toId,toComment)
  const id = await comment(content, route.params.id, toId, rootId)
  const result = await getCommentById(id)
  if (result) {
    if (rootId == null) {
      commentList.value.unshift(result)
    }
    else {
      result['toComment'] = toComment
      for (let i = 0; i < commentList.value.length; i++){
        if (commentList.value[i].id == result.rootId) {
          commentList.value[i].sonComments.unshift(result)
          break
        }
      }
    }
  }
}

// 取消收藏
const cancelStore = () => {
  storeState.value = false
  deleteCollectList(checkResult,[route.params.id])
  console.log("删除的posterid:", route.params.id)
}

// 判断是进行哪个回调
const judgeStore = (trueCallback,falseCallback) => {
  if (storeState.value) {
    trueCallback()
    return
  }
  falseCallback()
}

// 选中某个收藏夹
const selectId = (id) => {
  checked.value = id
}

// 显示框
const showDialog = () => {
  getAllCollect().then((data) => {
    storeList.value = data
    checked.value = storeList.value[0].id
    showStore.value = true
  })
}

// 取消框
const cancelDialog = () => {
  showStore.value = false
}

// 收藏到指定收藏夹
const storeFavlist = () => {
  // 调用接口
  checkResult = checked.value
  collect(route.params.id,checked.value)
  console.log(checked.value)
  storeState.value = true
  showStore.value = false
}

onMounted(() => {
  // window.addEventListener('scroll', () => console.log(document.documentElement.scrollTop))
  // document.documentElement.scrollTop = 0
})

// 判断当前根据id获取当前具体内容
const getPoster = () => {
  console.log(infoStore.id)
  if(infoStore.id) addHistory(route.params.id)
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

// 刚开始进入页面时先请求一次
getPoster()

// 参考b站只要登陆状态发生变化且id存在就重新发送浏览请求帮后台刷新历史记录
watch(()=>infoStore.id, (val) => {
  if (val) {
    getPoster()
  }
})

const jump = () => {
  window.open(url)
}

// 移动到评论区位置
const goComment = () => {
  locateHeight(commentRef.value.offsetTop - 64)
}

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

// 点赞或取消点赞
const likeOrUnlike = (type) => {
  if (type) {
    likeResource(route.params.id)
  } else {
    unlikeResource(route.params.id)
  }
}

// 删除某条评论
const deleteBothComment = (id,rootId) => {
  console.log('删除id为：', id,rootId)
  // 接口
  deleteComment(id)
  // example
  if (rootId) {
    for (let i = 0; i < commentList.value.length; i++){
      const item = commentList.value[i]
      if (item.id == rootId) {
        const subs = item.sonComments
        for (let j = 0; j < subs.length; j++){
          if (subs[j].id == id) {
            commentList.value[i].sonComments.splice(j, 1)
            break
          }
        }
        break
      }
    }
  }
  else {
    for (let i = 0; i < commentList.value.length; i++){
      if (commentList.value[i].id == id) {
        commentList.value.splice(i,1)
        break
      }
    }
  }
}
</script>