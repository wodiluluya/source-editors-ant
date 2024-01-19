<template>
  <Suspense @resolve="finish">
    <template #default>
      <previewComp ref="asyncCom"></previewComp>
    </template>
    <template #fallback>
      <h1>Loading...</h1>
    </template>
  </Suspense>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, shallowRef, ref, nextTick } from 'vue'
import * as Vue from 'vue'
import * as Antd from 'ant-design-vue'
import * as Less from 'less'
import { loadModule } from 'vue3-sfc-loader'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import dayLocale from 'dayjs/locale/zh-cn'
const asyncCom = ref()
const previewComp = shallowRef()
const props = defineProps({
  code: String,
})

const emits = defineEmits(['loadFinish'])

const init = () => {
  try {
    const options = {
      moduleCache: {
        dayjs: dayjs,
        vue: Vue,
        'ant-design-vue': Antd,
        'ant-design-vue/es/locale/zh_CN': zhCN,
        'dayjs/locale/zh-cn': dayLocale,
        less: Less,
      },
      async getFile() {
        return props.code
      },
      addStyle(textContent: any) {
        const style = Object.assign(document.createElement('style'), {
          textContent,
        })
        const ref = document.head.getElementsByTagName('style')[0] || null
        document.head.insertBefore(style, ref)
      },
    }

    const comp = defineAsyncComponent(() =>
      loadModule('myComponent.vue', options)
    )

    previewComp.value = comp
  } catch (err) {
    console.error(err)
  }
}
init()
const finish = () => {
  nextTick(() => {
    // 组件加载完成
    emits('loadFinish')
  })
}
const setData = (obj: any) => {
  asyncCom.value.formData = obj
}
const getData = () => {
  return JSON.stringify(asyncCom.value.formData)
}
const validate = () => {
  return asyncCom.value.submitForm()
}
defineExpose({
  getData,
  setData,
  validate,
})
</script>
