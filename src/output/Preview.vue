<script setup lang="ts">
import { inject, watch, ref } from 'vue'
import Render from './Render.vue'
import { Store } from '../store'

const store = inject('store') as Store
const random = ref()
const asynccode = ref()
const updateRender = () => {
  random.value = new Date().getTime()
}
const getData = () => {
  return asynccode.value?.getData()
}
watch(() => store.state.activeFile.code, updateRender)
defineExpose({
  getData,
})
</script>

<template>
  <div class="iframe-container">
    <Render
      ref="asynccode"
      :key="random"
      :code="store.state.activeFile.code"
    ></Render>
  </div>
</template>

<style scoped>
.iframe-container {
  width: 100%;
  height: 100%;
  border: none;
  background-color: #fff;
}
.iframe-container.dark {
  background-color: #1e1e1e;
}
</style>
