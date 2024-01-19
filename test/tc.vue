<template>
  <a-config-provider :locale="locale">
    <a-form ref="vForm" :model="formData">
      <a-form-item
        :label="formData.name.label"
        :name="[formData.name.field, 'componentProp', 'defaultValue']"
        v-if="!formData.name.componentProp.hidden"
        :rules="[{ required: true, min: 3, max: 5 }]"
      >
        <a-input
          v-model:value="formData.name.componentProp.defaultValue"
          :disabled="formData.name.componentProp.disabled"
        />
      </a-form-item>
    </a-form>
  </a-config-provider>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import dayjs from 'dayjs'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn')
const vForm = ref()
const locale = ref(zhCN)
const formData = reactive({
  name: {
    //type: "input",
    field: 'name',
    label: '姓名' /*必须*/,
    componentProp: {
      defaultValue: '12323',
      disabled: false,
      hidden: false,
    },
  },
})
const submitForm = () => {
  return vForm.value.validate()
}
</script>
<style scoped>
/* 注 DOEN: 这里支持less写法*/
</style>
