<script setup lang="ts">
import { watch, ref } from 'vue'
import Render from './output/Render.vue'

const props = defineProps(['code'])
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
watch(() => props.code, updateRender)
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
      :code="code"
    ></Render>
  </div>
</template>

<style scoped>
.iframe-container {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
