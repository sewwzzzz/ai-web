<template>
  <div id="tool-icon">
    <svg-icon id="icon-name" :name="props.name"></svg-icon>
    <div id="icon-title">{{ props.title }}</div>
  </div>
</template>

<style scoped>
#tool-icon{
  display:flex;
  flex-direction: column;
  color: aliceblue;
}
#tool-icon:hover{
  color: #1E88F5;
  cursor: pointer;
}
#icon-name{
  width:25px;
  height:25px;
}
#icon-title{
  font-size: 12px;
}
</style>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  name: {
    type:String
  },
  title: {
    type:String
  }
})
</script>