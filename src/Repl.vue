<script setup lang="ts">
import SplitPane from './SplitPane.vue'
import Output from './output/Output.vue'
import { Store, CantStore } from './store'
import { provide, ref, toRef, computed } from 'vue'
import type { EditorComponentType } from './editor/types'
import EditorContainer from './editor/EditorContainer.vue'

export interface Props {
  theme?: 'dark' | 'light'
  editor: EditorComponentType
  store?: Store
  layout?: 'horizontal'
}

const props = withDefaults(defineProps<Props>(), {
  store: () => new CantStore(),
  theme: 'light',
})

if (!props.editor) {
  throw new Error('The "editor" prop is now required.')
}

const outputRef = ref<InstanceType<typeof Output>>()
const edopt = ref()
const { store } = props

store.init()

const editorSlotName = computed(() => 'left')
const outputSlotName = computed(() => 'right')

provide('store', store)
provide('theme', toRef(props, 'theme'))
/**
 * Reload the preview iframe
 */
function getData() {
  return outputRef.value?.getData()
}

function getEditor() {
  return edopt.value?.getEditors()
}
defineExpose({ getEditor, getData })
</script>

<template>
  <div class="code-opt">
    <SplitPane :layout="layout">
      <template #[editorSlotName]>
        <EditorContainer ref="edopt" :editorComponent="editor" />
      </template>
      <template #[outputSlotName]>
        <Output ref="outputRef" :editorComponent="editor" />
      </template>
    </SplitPane>
  </div>
</template>

<style>
.code-opt {
  --bg: #fff;
  --bg-soft: #f8f8f8;
  --border: #ddd;
  --text-light: #888;
  --font-code: Menlo, Monaco, Consolas, 'Courier New', monospace;
  --color-branding: #42b883;
  --color-branding-dark: #416f9c;
  --header-height: 38px;
  text-align: left;
  height: 100%;
  margin: 0;
  overflow: hidden;
  font-size: 13px;
  background-color: var(--bg-soft);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 1px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  min-height: 450px;
  border: 1px solid rgba(221, 225, 227, 1);
}
</style>
