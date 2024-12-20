<template>
  <div id="poster-header">
    <Header></Header>
  </div>
  <div id="poster-view">
    <Badge class="view-badge">
    </Badge>
  </div>
</template>

<style scoped>
#poster-header{
  position:fixed;
  width:100%;
}
#poster-view{
  width:100%;
  height:100%;
  background-color: rgb(242, 243, 245);
}
.view-badge{
  position:absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
}
</style>

<script setup>
import Badge from '@/components/Badge.vue'
import Header from '@/components/Header.vue'


</script>