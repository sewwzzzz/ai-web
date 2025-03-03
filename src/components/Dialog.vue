<template>
  <div class="dialog-header">
    <div id="header-name">
      {{ props.title }}
    </div>
    <SvgIcon name="exit" id="header-exit" @click="exit"></SvgIcon>
  </div>
  <slot name="dialog-content"></slot>
  <div class="dialog-footer">
    <el-button type="primary" plain size="large" @click="exit">取消</el-button>
    <el-button type="primary" plain size="large" @click="act">确认</el-button>
  </div>
</template>

<style scoped>
.dialog-header{
  position:relative;
  width:100%;
  height:40px;
  border-bottom: 1px solid #79bbff;
}

#header-name{
  position:absolute;
  display:inline-block;
  font-family: "Noto Sans SC";
  color: rgb(84, 82, 82);
  font-size:18px;
  left:5px;
  top:10px;
}

#header-exit{
  position:absolute;
  right:2px;
  top:5px;
  font-size:30px;
  color:rgb(90, 88, 88);
  cursor: pointer;
}

#header-exit:hover{
  color:#79bbff;
}

.dialog-footer{
  border-top:1px solid #79bbff;
  display: flex;
  flex-direction: row-reverse;
  gap:10px;
  padding:5px 5px;
}
</style>

<script setup>
import { defineProps,defineEmits } from 'vue'
const props = defineProps({
  title: {
    type:String,
  },
})
const emits = defineEmits(['exit', 'act'])
function exit() {
  emits('exit')
}

function act() {
  emits('act')
}

</script>