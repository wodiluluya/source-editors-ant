<template>
  <div>
    <a-button type="primary" @click="optFunc">演示方法</a-button>
    <Preview ref="pdom" :code="code"></Preview>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Preview from '../dist/code-preview'
const pdom = ref()
const code = `<template>
    <div class="test">66666</div>
    <a-config-provider :locale="locale">
      <a-form ref="vForm" :model="formData">
        <a-form-item :label="formData.name.label" :name="[formData.name.field, 'componentProp', 'defaultValue']"
          v-if="!formData.name.componentProp.hidden" :rules="formData.name.rules">
          <a-input v-model:value="formData.name.componentProp.defaultValue" :disabled="formData.name.componentProp.disabled"
            :placeholder="formData.name.componentProp.placeholder" />
        </a-form-item>
        <a-form-item :label="formData.test.label" :name="[formData.test.field, 'componentProp', 'defaultValue']"
          v-if="!formData.test.componentProp.hidden" :rules="formData.test.rules">
          <a-input v-model:value="formData.test.componentProp.defaultValue" :disabled="formData.test.componentProp.disabled"
            :placeholder="formData.test.componentProp.placeholder" />
        </a-form-item>
        <a-form-item :label="formData.region.label" :name="[formData.region.field, 'componentProp', 'defaultValue']"
          v-if="!formData.region.componentProp.hidden" :rules="formData.region.rules">
          <a-select v-model:value="formData.region.componentProp.defaultValue"
            :disabled="formData.region.componentProp.disabled" :placeholder="formData.region.componentProp.placeholder"
            :options="formData.region.componentProp.option">
          </a-select>
        </a-form-item>
        <a-form-item :label="formData.date1.label" :name="[formData.date1.field, 'componentProp', 'defaultValue']"
          v-if="!formData.date1.componentProp.hidden" :rules="formData.date1.rules">
          <a-date-picker v-model:value="formData.date1.componentProp.defaultValue"
            :disabled="formData.date1.componentProp.disabled" :placeholder="formData.date1.componentProp.placeholder"
            show-time type="date" style="width: 100%" />
        </a-form-item>
        <a-form-item :label="formData.delivery.label" :name="[formData.delivery.field, 'componentProp', 'defaultValue']"
          v-if="!formData.delivery.componentProp.hidden" :rules="formData.delivery.rules">
          <a-switch v-model:checked="formData.delivery.componentProp.defaultValue"
            :disabled="formData.delivery.componentProp.disabled"
            :placeholder="formData.delivery.componentProp.placeholder" />
        </a-form-item>
        <a-form-item :label="formData.type.label" :name="[formData.type.field, 'componentProp', 'defaultValue']"
          v-if="!formData.type.componentProp.hidden" :rules="formData.type.rules">
          <a-checkbox-group v-model:value="formData.type.componentProp.defaultValue"
            :disabled="formData.type.componentProp.disabled" :placeholder="formData.type.componentProp.placeholder"
            :options="formData.type.componentProp.option">
          </a-checkbox-group>
        </a-form-item>
        <a-form-item :label="formData.resource.label" :name="[formData.resource.field, 'componentProp', 'defaultValue']"
          v-if="!formData.resource.componentProp.hidden" :rules="formData.resource.rules">
          <a-radio-group v-model:value="formData.resource.componentProp.defaultValue"
            :disabled="formData.resource.componentProp.disabled" :placeholder="formData.resource.componentProp.placeholder"
            :options="formData.resource.componentProp.option">
          </a-radio-group>
        </a-form-item>
        <a-form-item :label="formData.desc.label" :name="[formData.desc.field, 'componentProp', 'defaultValue']"
          v-if="!formData.desc.componentProp.hidden" :rules="formData.desc.rules">
          <a-textarea v-model:value="formData.desc.componentProp.defaultValue"
            :disabled="formData.desc.componentProp.disabled" :placeholder="formData.desc.componentProp.placeholder" />
        </a-form-item></a-form>
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
      type: 'input',
      field: 'name',
      label: '姓名',
      rules: [{ required: true, min: 3, max: 5 }],
      componentProp: {
        placeholder: '請輸入',
        defaultValue: '88888',
        disabled: false,
        hidden: false,
        option: undefined,
      },
    },
    
    test: {
      type: 'input',
      field: 'test',
      label: '测试',
      rules: [{ required: true }],
      componentProp: {
        placeholder: '請輸入',
        defaultValue: '',
        disabled: false,
        hidden: false,
        option: undefined,
      },
    },
    
    region: {
      type: 'select',
      field: 'region',
      label: '取悅阿斯頓',
      rules: [{ required: true }],
      componentProp: {
        placeholder: '請輸入',
        defaultValue: '',
        disabled: false,
        hidden: false,
        option: [
          { label: '上海', value: 1 },
          { label: '北京', value: 2 },
        ],
      },
    },
    
    date1: {
      type: 'datepicker',
      field: 'date1',
      label: '日期',
      rules: [{ required: true }],
      componentProp: {
        placeholder: '請輸入',
        defaultValue: '',
        disabled: false,
        hidden: false,
        option: undefined,
      },
    },
    
    delivery: {
      type: 'switch',
      field: 'delivery',
      label: '切換',
      rules: [{ required: true }],
      componentProp: {
        placeholder: '請輸入',
        defaultValue: false,
        disabled: false,
        hidden: false,
        option: undefined,
      },
    },
    
    type: {
      type: 'checkbox',
      field: 'type',
      label: '多選',
      rules: [{ required: true }],
      componentProp: {
        placeholder: '請輸入',
        defaultValue: [],
        disabled: false,
        hidden: false,
        option: [
          { label: '東西', value: 1 },
          { label: '規劃', value: 2 },
          { label: '規劃啊', value: 2 },
        ],
      },
    },
    
    resource: {
      type: 'radio',
      field: 'resource',
      label: '單選',
      rules: [{ required: true }],
      componentProp: {
        placeholder: '請輸入',
        defaultValue: '',
        disabled: false,
        hidden: false,
        option: [
          { label: '東西', value: 1 },
          { label: '規劃', value: 2 },
          { label: '規劃啊', value: 3 },
        ],
      },
    },
    
    desc: {
      type: 'textarea',
      field: 'desc',
      label: '服務部',
      rules: [{ required: true }],
      componentProp: {
        placeholder: '請輸入',
        defaultValue: '',
        disabled: false,
        hidden: false,
        option: undefined,
      },
    },
    })
    const submitForm = () => {
    return vForm.value.validate()
    }
    defineExpose({
        submitForm,
        formData

})
    <\/script>
    
    <style lang="less" scoped>
    @bc: #f00;
    
    .test {
    color: red;
    font-size: 20px;
    
    &::after {
      content: '';
      display: inline-block;
      width: 20px;
      height: 20px;
      background: @bc;
    }
    }
    </style>
    `

const optFunc = () => {
  // console.log(pdom.value?.getData())
  pdom.value?.setData({
    name: {
      type: 'input',
      field: 'name',
      label: '姓名',
      rules: [{ required: true, min: 3, max: 5 }],
      componentProp: {
        placeholder: '請輸入',
        defaultValue: '值变化了',
        disabled: false,
        hidden: false,
        option: undefined,
      },
    },
  })
  //pdom.value?.validate()
}
</script>
<style lang="scss" scoped></style>
