<script setup lang="ts">
import SplitPane from './SplitPane.vue'
import Output from './output/Output.vue'
import { Store, ReplStore, SFCOptions } from './store'
import { provide, ref, toRef, computed } from 'vue'
import type { EditorComponentType } from './editor/types'
import EditorContainer from './editor/EditorContainer.vue'

export interface Props {
  theme?: 'dark' | 'light'
  editor: EditorComponentType
  store?: Store
  autoResize?: boolean
  showCompileOutput?: boolean
  showImportMap?: boolean
  showTsConfig?: boolean
  clearConsole?: boolean
  sfcOptions?: SFCOptions
  layout?: 'horizontal' | 'vertical'
  layoutReverse?: boolean
  ssr?: boolean
  previewOptions?: {
    headHTML?: string
    bodyHTML?: string
    placeholderHTML?: string
    customCode?: {
      importCode?: string
      useCode?: string
    }
  }
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'light',
  store: () => new ReplStore(),
  autoResize: true,
  showCompileOutput: true,
  showImportMap: true,
  showTsConfig: true,
  clearConsole: true,
  layoutReverse: false,
  ssr: false,
  previewOptions: () => ({
    headHTML: '',
    bodyHTML: '',
    placeholderHTML: '',
    customCode: {
      importCode: '',
      useCode: '',
    },
  }),
})

if (!props.editor) {
  throw new Error('The "editor" prop is now required.')
}

const outputRef = ref<InstanceType<typeof Output>>()
const edopt = ref()
const { store } = props
const sfcOptions = (store.options = props.sfcOptions || {})
if (!sfcOptions.script) {
  sfcOptions.script = {}
}
// @ts-ignore only needed in 3.3
sfcOptions.script.fs = {
  fileExists(file: string) {
    if (file.startsWith('/')) file = file.slice(1)
    return !!store.state.files[file]
  },
  readFile(file: string) {
    if (file.startsWith('/')) file = file.slice(1)
    return store.state.files[file].code
  },
}

store.init()

const editorSlotName = computed(() => (props.layoutReverse ? 'right' : 'left'))
const outputSlotName = computed(() => (props.layoutReverse ? 'left' : 'right'))

provide('store', store)
provide('autoresize', props.autoResize)
provide('import-map', toRef(props, 'showImportMap'))
provide('tsconfig', toRef(props, 'showTsConfig'))
provide('clear-console', toRef(props, 'clearConsole'))
provide('preview-options', props.previewOptions)
provide('theme', toRef(props, 'theme'))
/**
 * Reload the preview iframe
 */
function reload() {
  outputRef.value?.reload()
}

function getEditor() {
  return edopt.value?.getEditors()
}
defineExpose({ getEditor })
</script>

<template>
  <div class="vue-repl">
    <SplitPane :layout="layout">
      <template #[editorSlotName]>
        <EditorContainer ref="edopt" :editorComponent="editor" />
      </template>
      <template #[outputSlotName]>
        <Output
          ref="outputRef"
          :editorComponent="editor"
          :showCompileOutput="props.showCompileOutput"
          :ssr="!!props.ssr"
        />
      </template>
    </SplitPane>
  </div>
</template>

<style>
.vue-repl {
  --bg: #fff;
  --bg-soft: #f8f8f8;
  --border: #ddd;
  --text-light: #888;
  --font-code: Menlo, Monaco, Consolas, 'Courier New', monospace;
  --color-branding: #42b883;
  --color-branding-dark: #416f9c;
  --header-height: 38px;

  height: 100%;
  margin: 0;
  overflow: hidden;
  font-size: 13px;
  background-color: var(--bg-soft);
  box-shadow:
    0 1px 2px 0 rgba(0, 0, 0, 0.1),
    0 1px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  min-height: 450px;
  border: 1px solid rgba(221, 225, 227, 1);
}
</style>
