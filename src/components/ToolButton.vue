<template>
  <div class="tool-button">
    <SvgIcon id="button-icon" :name="props.name"></SvgIcon>
    <div id="button-font">{{ props.func }}</div>
  </div>
</template>

<style scoped>
.tool-button{
  width:100px;
  box-sizing: border-box;
  padding:5px 5px;
  height:38px;
  border-color: rgb(241, 242, 243);
  border-radius: 10px;
  border-width:1px;
  border-style: solid;
  display:flex;
  justify-content: center;
  align-items:center;
  cursor:pointer;
}

.tool-button:hover{
  background-color: rgb(241, 242, 243);
}

#button-icon{
  font-size: 13px;
}

#button-font{
  margin-left:5px;
  color:rgb(26, 26, 28);
  --v_line_border: #C9CCD0;
  font-size:13px;
  font-weight:400;
  font-family: PingFang SC, HarmonyOS_Regular, Helvetica Neue, Microsoft YaHei, sans-serif;
  cursor:pointer;
}
</style>

<script setup>
import SvgIcon from './SvgIcon.vue'
import { defineProps } from 'vue'

const props = defineProps({
  name: {
    type:String,
  },
  func: {
    type:String,
  }
})

</script>