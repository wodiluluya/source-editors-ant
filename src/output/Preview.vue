<script setup lang="ts">
import { inject } from 'vue'
import Render from './Render.vue'
import { Store } from '../store'

const store = inject('store') as Store

const loadFinish = () => {}

function reload() {}

defineExpose({ reload })
</script>

<template>
  <div class="iframe-container">
    <Render
      ref="asynccode"
      @loadFinish="loadFinish"
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
