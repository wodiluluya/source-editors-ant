<script lang="ts" setup>
import {
  onMounted,
  onBeforeUnmount,
  ref,
  shallowRef,
  nextTick,
  inject,
  watch,
  computed,
  type Ref,
} from 'vue'
import * as monaco from 'monaco-editor-core'
import { initMonaco } from './env'
import { getOrCreateModel } from './utils'
import { Store } from '../store'
import type { PreviewMode } from '../editor/types'
import prettier from 'prettier/standalone'
// import parserHtml from 'prettier/parser-html'
// import parserBabel from 'prettier/parser-babel'
// import parserEspree from 'prettier/parser-espree'
// import parserTypescript from 'prettier/parser-typescript'
import prettierVue from 'prettier-plugin-vue'
const props = withDefaults(
  defineProps<{
    filename: string
    value?: string
    readonly?: boolean
    mode?: PreviewMode
  }>(),
  {
    readonly: false,
  }
)
const formatProvider: any = {
  provideDocumentFormattingEdits: (model: any) => {
    const code = model.getValue()
    const formattedCode = prettier.format(code, {
      plugins: [prettierVue],
      parser: 'vue',
      // 允许vue脚本
      // vueIndentScriptAndStyle: false,
      // singleQuote: true,
      // semi: true,
      // printWidth: 180,
      // tabWidth: 2,
    })
    return [
      {
        range: model.getFullModelRange(),
        text: formattedCode,
      },
    ]
  },
}
const emit = defineEmits<{
  (e: 'change', value: string): void
}>()

const containerRef = ref<HTMLDivElement>()
const ready = ref(false)
const editor = shallowRef<monaco.editor.IStandaloneCodeEditor>()
const store = inject<Store>('store')!

initMonaco(store)

const lang = computed(() => (props.mode === 'css' ? 'css' : 'javascript'))
const isFullScreen = ref(false)
const replTheme = inject<Ref<'dark' | 'light'>>('theme')!
monaco.languages.registerDocumentFormattingEditProvider('vue', formatProvider)
onMounted(async () => {
  const theme = await import('./highlight').then((r) => r.registerHighlighter())
  ready.value = true
  await nextTick(() => {})

  if (!containerRef.value) {
    throw new Error('Cannot find containerRef')
  }

  const editorInstance = monaco.editor.create(containerRef.value, {
    ...(props.readonly
      ? { value: props.value, language: lang.value }
      : { model: null }),
    fontSize: 16,
    tabSize: 2,
    // contextmenu:false,
    theme: replTheme.value === 'light' ? theme.light : theme.dark,
    readOnly: props.readonly,
    automaticLayout: true,
    scrollBeyondLastLine: false,
    minimap: {
      enabled: false,
    },
    inlineSuggest: {
      enabled: false,
    },
    formatOnPaste: true,
    formatOnType: true,
    // formatOnSave: true,
    // 'semanticHighlighting.enabled': true,
    fixedOverflowWidgets: true,
  })

  editor.value = editorInstance

  // Support for semantic highlighting
  const t = (editorInstance as any)._themeService._theme
  t.getTokenStyleMetadata = (
    type: string,
    modifiers: string[],
    _language: string
  ) => {
    const _readonly = modifiers.includes('readonly')
    switch (type) {
      case 'function':
      case 'method':
        return { foreground: 12 }
      case 'class':
        return { foreground: 11 }
      case 'variable':
      case 'property':
        return { foreground: _readonly ? 21 : 9 }
      default:
        return { foreground: 0 }
    }
  }

  watch(
    () => props.value,
    (value) => {
      //  editorInstance.getAction('editor.action.formatDocument').run()
      if (editorInstance.getValue() === value) return
      editorInstance.setValue(value || '')
    },
    { immediate: true }
  )

  watch(lang, (lang) =>
    monaco.editor.setModelLanguage(editorInstance.getModel()!, lang)
  )

  if (!props.readonly) {
    watch(
      () => props.filename,
      (_, oldFilename) => {
        if (!editorInstance) return
        const file = store.state.files[props.filename]
        if (!file) return null
        const model = getOrCreateModel(
          monaco.Uri.parse(`file:///${props.filename}`),
          file.language,
          file.code
        )

        const oldFile = oldFilename ? store.state.files[oldFilename] : null
        if (oldFile) {
          oldFile.editorViewState = editorInstance.saveViewState()
        }

        editorInstance.setModel(model)

        if (file.editorViewState) {
          editorInstance.restoreViewState(file.editorViewState)
          editorInstance.focus()
        }
      },
      { immediate: true }
    )
  }

  // editorInstance.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
  //   // ignore save event
  // })

  editorInstance.onDidChangeModelContent(() => {
    emit('change', editorInstance.getValue())
  })

  // update theme
  watch(replTheme, (n) => {
    editorInstance.updateOptions({
      theme: n === 'light' ? theme.light : theme.dark,
    })
  })
})

onBeforeUnmount(() => {
  editor.value?.dispose()
})

defineExpose({
  editor,
})
</script>

<template>
  <!-- <FullscreenOutlined
    class="po"
    @click="handleExitFullEdit"
    v-if="isFullScreen"
  />
  <FullscreenExitOutlined class="po" v-else @click="handleFullEdit" /> -->
  <div class="editor" :data-fullScreen="isFullScreen" ref="containerRef"></div>
</template>

<style>
.editor {
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
