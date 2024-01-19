<script setup lang="ts">
import Monaco from '../monaco/Monaco.vue'
import type { EditorEmits, EditorProps } from './types'
import { ref } from 'vue'
defineProps<EditorProps>()
const emit = defineEmits<EditorEmits>()
const monacos = ref()
defineOptions({
  editorType: 'monaco',
})

const onChange = (code: string) => {
  emit('change', code)
}
const getEditor = () => {
  return monacos.value.editor
}
defineExpose({
  getEditor,
})
</script>

<template>
  <Monaco
    ref="monacos"
    @change="onChange"
    :filename="filename"
    :value="value"
    :readonly="readonly"
    :mode="mode"
  />
</template>
