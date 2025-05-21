<template>
  <!-- <div id="store-edit" v-show="showStore">
      <Dialog @exit="cancelDialog" title="收藏资讯" @act="storeFavlist">
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
  <div id="store-mask" v-show="showStore"></div> -->
  <el-dialog v-model="showStore" title="收藏资讯" width="500">
    <div id="dialog-list">
      <div :class="[checked == item.id?'list-sure':'list']" v-for="(item) in storeList" :key="item.id" @click="selectId(item.id)">
        <SvgIcon name="folder" class="icon"></SvgIcon>
        <div>
          {{ limitTitle(item.name) }}
        </div>
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancelDialog">Cancel</el-button>
        <el-button type="primary" @click="storeFavlist">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
  <div id="poster">
    <div id="poster-header">
      <Header></Header>
    </div>
    <div id="poster-content">
      <div id="content-left">
        <BadgeGoods @like="likeOrUnlike" :number="goodNum" :is-active="isActive">
        </BadgeGoods>
        <BadgeComments :number="commentNum" @go-comment="goComment">
        </BadgeComments>
        <BadgeStores @go-store="judgeStore(showDialog)">
        </BadgeStores>
      </div>
      <div id="content-right">
        <Brief :keywordId="keywordId"></Brief>
      </div>
      <div id="content-title">
        {{ limitTitle(title,100)}}
      </div>
      <div id="content-tips">
        <div>{{ limitTime(publishTime) }}</div>
        <div>
          <SvgIcon id="tips-icon" name="look"></SvgIcon>
          <div>{{ viewNum }}</div>
        </div>
      </div>
      <el-tooltip content="点击跳转" placement="top">
        <img v-if="coverUrl" id="content-img" :src="realUrl" @click="jump">
        <SvgIcon v-else :name="realUrl?realUrl:''" id="content-img" @click="jump"></SvgIcon>
      </el-tooltip>
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
      <div id="comments">
        <div v-for="(item) in commentList" :key="item.id">
          <Comment class="comment" :comment="item" @deleteComment="popupMessageBox('删除评论后，评论下所有回复都会被删除,是否继续?','删除评论',()=>deleteBothComment(item.id,item.rootId))" @sendResponse="commentOrReply">
          </Comment>
          <SecondComment class="second-comment" v-for="(subItem) in item.sonComments" :key="subItem.id" :sub-comment="subItem" @deleteComment="popupMessageBox('删除评论后，评论下所有回复都会被删除,是否继续?','删除评论',()=>deleteBothComment(subItem.id,subItem.rootId))" @sendResponse="commentOrReply"></SecondComment>
          <div class="comment-line"></div>
        </div>
        <Pagination v-show="commentList.length" id="comments-pagination" :paging="paging" layout="prev,pager,next" @currentChange="currentChange"></Pagination>
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
  width:450px;
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
  height: 200px;
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
import { collect, getResource,addHistory, getAllCollect, likeResource, unlikeResource, getCommentList, deleteComment, comment, getCommentById, getPlatform, selectLike} from '@/utils/preRequest';
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import useInfoStore from '@/store/info'
import { commitMessage, limitTime, limitTitle, locateHeight, popupMessageBox } from '@/utils/operate';
import SecondComment from '@/components/SecondComment.vue';

let goodNum = ref(0)
let isActive = ref(false)
let commentNum = ref(0)
let authorName = ref('')
let viewNum = ref(1839)
let url = ''
let coverUrl = ref('')
let publishTime = ref('2025-2-28')
let title = ref('')
let keywordId = ref(0) 
let sourceId = ref(1)

const commentRef = ref(null)
let textarea = ref('')
let select = ref(true)
const route = useRoute()
const infoStore = useInfoStore()

let checked = ref(1)
// 记录当前收藏的收藏夹id
let checkResult = 0
let showStore = ref(false)
let storeList = ref([]) // 收藏夹数组

const commentList = ref([])
let paging = reactive({
  currentPage: 1,
  pageSize: 10, // 固定
  totalCount:0
})
let id = ref(parseInt(route.params.id))

const getDataList = (current) => {
  getCommentList(current, id.value, paging.pageSize).then((data) => {
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
  // console.log(content, rootId, toId, toComment)
  let cId = null
  cId = await comment(content, id.value, toId, rootId)
  let result = null
  if (cId) {
    result = await getCommentById(cId)
  }
  if (result) {
    if (rootId == null) {
      commentList.value.unshift(result)
    }
    else {
      result['toComment'] = toComment
      for (let i = 0; i < commentList.value.length; i++){
        if (commentList.value[i].id == result.rootId) {
          if (!commentList.value[i].sonComments) commentList.value[i].sonComments = []
          commentList.value[i].sonComments.unshift(result)
          break
        }
      }
    }
  }
}

// 取消收藏
// const cancelStore = () => {
//   storeState.value = false
//   deleteCollectList(checkResult,[id.value])
//   console.log("删除的posterid:", id.value)
// }

// 判断是进行哪个回调
const judgeStore = (falseCallback) => {
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
    if (storeList.value.length === 0) {
      commitMessage('warning','请先创建收藏夹')
      return
    }  
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
  collect(id.value,checked.value)
  // console.log(checked.value)
  showStore.value = false
}

onMounted(() => {
  // window.addEventListener('scroll', () => console.log(document.documentElement.scrollTop))
  // document.documentElement.scrollTop = 0
})

// 判断当前根据id获取当前具体内容
const getPoster = () => {
  // console.log(infoStore.id)
  if (infoStore.id > 0) {
    addHistory(id.value)
    selectLike(id.value).then((val) => {
      isActive.value = val
    })
  }
  getResource(id.value).then((data) => {
    // console.log(data)
    coverUrl.value = data.coverUrl
    authorName.value = data.authorName
    publishTime.value = data.publishTime
    goodNum.value = data.likeCount
    viewNum.value = data.viewCount
    commentNum.value = data.commentCount
    title.value = data.title
    url = data.url
    sourceId.value = data.sourceId
    keywordId.value = data.keywordId
})
}
getPlatform()
import useSystemStore from '@/store/system'
const systemStore = useSystemStore()
const realUrl = computed(() => {
  if (sourceId.value > 0 && systemStore.platform.length === 5) {
    return coverUrl.value ? coverUrl.value : systemStore.platform.filter((x) => {
      // console.log(x)
      return x.id === sourceId.value
    })[0].name
  }
  return null
}) 

// 刚开始进入页面时先请求一次
getPoster()

// 参考b站只要登陆状态发生变化且id存在就重新发送浏览请求帮后台刷新历史记录
watch(()=>infoStore.id, (val) => {
  if (val > 0) {
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
// const updateHotSelect = function () {
//   if(select.value) return
//   select.value = !select.value
// }

// // 点击显示最新评论
// const updateNewSelect = function () {
//   if (!select.value) return
//   select.value = !select.value
// }

// 点赞或取消点赞
const likeOrUnlike = (type,num) => {
  if (type) {
    likeResource(id.value).then((val) => {
      if (val) {
        goodNum.value = num
        isActive.value = type
      }
    })
  } else {
    unlikeResource(id.value).then((val) => {
      if (val) {
        goodNum.value = num
        isActive.value = type
      }
    })
  }
}

// 删除某条评论
const deleteBothComment = (id,rootId) => {
  // console.log('删除id为：', id,rootId)
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