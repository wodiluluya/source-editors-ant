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
onMounted(async () => {
  const theme = await import('./highlight').then((r) => r.registerHighlighter())
  ready.value = true
  await nextTick()

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
    //   'semanticHighlighting.enabled': false,
    fixedOverflowWidgets: true,
  })
  editor.value = editorInstance

  editor.value.addAction({
    // id
    id: 'formatVueCode',
    // 该菜单键显示文本
    label: '格式化代码',
    // 控制该菜单键显示
    precondition: 'shouldShowSqlRunnerAction',
    // 该菜单键位置
    contextMenuGroupId: 'navigation',
    contextMenuOrder: 1.5,
    // 点击该菜单键后运行
    run: (editor) => {
      console.log(editor)

      debugger
      // "editor.action.formatDocument"
      //onContextMenu
      editor.getAction('editor.action.formatDocument').run()
    },
  })
  editor.value.createContextKey('shouldShowSqlRunnerAction', true)

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

  editorInstance.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
    // ignore save event
  })

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

// const handleExitFullEdit = () => {
//     isFullScreen.value=false
// };

// const handleFullEdit = () => {
//     isFullScreen.value=true
// };

const test = () => {
  includeTemplate()
}
const includeTemplate = () => {
  const template = `
  <template>  <a-input
        v-model:value="999999999999"

      /></template>
    `

  const jsCode = `

    `

  const cssCode = `

    `
  debugger
  // 获取编辑器的模型
  const model = editor.value?.getModel()
  const range = model.findMatches('匹配的字符串或者正则表达式')[0].range
  // 在编辑器中插入模板代码
  model?.applyEdits([
    {
      range: new monaco.Range(0, 0, Infinity),
      text: template,
    },
    {
      range: model.getFullModelRange(),
      text: jsCode,
    },
    {
      range: model.getFullModelRange(),
      text: cssCode,
    },
  ])
}
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
[data-fullscreen='true'] {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  height: 100vh !important;
  width: 100vw !important;
  z-index: 999 !important;
}
.po {
  position: absolute;
  right: 20px;
  top: 0;
  color: #333;
  font-size: 20px;
  z-index: 999999;
}
</style>
