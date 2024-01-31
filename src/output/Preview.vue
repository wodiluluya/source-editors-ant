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
const setData = (obj: any) => {
  return asynccode.value?.setData(obj)
}

const validate = () => {
  return asynccode.value?.validate()
}
const finish = () => {}
watch(() => store.state.activeFile.code, updateRender)
defineExpose({
  getData,
  setData,
  validate,
})
</script>

<template>
  <div class="iframe-container">
    <Render
      ref="asynccode"
      :key="random"
      @loadFinish="finish"
      :code="store.state.activeFile.code"
    ></Render>
  </div>
</template>

<style scoped>
.iframe-container {
  width: 100%;
  height: 100%;
  padding-top: 25px;
  border: none;
  background-color: #fff;
}
.iframe-container.dark {
  background-color: #1e1e1e;
}
</style>
