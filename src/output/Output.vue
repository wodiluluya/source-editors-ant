<script setup lang="ts">
import Preview from './Preview.vue'
import { ref } from 'vue'

const previewRef = ref<InstanceType<typeof Preview>>()
const getData = () => {
  return previewRef.value?.getData()
}
defineExpose({
  getData,
})
</script>

<template>
  <div class="output-container">
    <Preview ref="previewRef" />
  </div>
</template>

<style scoped>
.output-container {
  height: 100%;
  overflow: hidden;
  position: relative;
}
</style>
