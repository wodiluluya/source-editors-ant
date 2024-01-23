<script setup lang="ts">
import Message from '../Message.vue'
import { debounce } from '../utils'
import { inject, ref, watch } from 'vue'
import { Store } from '../store'
import MessageToggle from './MessageToggle.vue'
import type { EditorComponentType } from './types'

const SHOW_ERROR_KEY = 'repl_show_error'

const props = defineProps<{
  editorComponent: EditorComponentType
}>()

const editors = ref()
const store = inject('store') as Store
const showMessage = ref(getItem())

const onChange = debounce((code: string) => {
  store.state.activeFile.code = code
}, 250)

function setItem() {
  localStorage.setItem(SHOW_ERROR_KEY, showMessage.value ? 'true' : 'false')
}

function getItem() {
  const item = localStorage.getItem(SHOW_ERROR_KEY)
  return !(item === 'false')
}

function getEditors() {
  return editors.value.getEditor()
}

watch(showMessage, () => {
  setItem()
})

defineExpose({
  getEditors,
})
</script>

<template>
  <div class="editor-container">
    <props.editorComponent
      @change="onChange"
      ref="editors"
      :value="store.state.activeFile.code"
      :filename="store.state.activeFile.filename"
    />
    <Message v-show="showMessage" :err="store.state.errors[0]" />
    <MessageToggle v-model="showMessage" />
  </div>
</template>

<style scoped>
.editor-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
}
</style>
