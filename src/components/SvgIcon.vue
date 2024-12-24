<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="`#icon-${props.name}`"></use>
  </svg>
</template>

<style scoped>
.svg-icon{
  width: 1em;
  height: 1em;
  vertical-align: middle; /*由于SVG图标默认可能与周围文本基线对齐，这可能导致图标看起来要么太高要么太低。通过设置一个负值（-0.15em），可以微调图标的位置，使其看起来更和谐地与文本或其他元素对齐。 */
  fill: currentColor; /*继承父元素color */
  overflow: hidden;
}
</style>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required:true
  },
})
</script>