<template>
  <Form ref="vForm" :rules="rules" :model="formData">
    <FormItem
      :label="formData.name.label"
      name="name"
      v-if="formData.name.showVisible"
    >
      <Input
        v-model:value="formData.name.initialValue"
        :disabled="formData.name.disabled"
      />
    </FormItem>
    <FormItem :wrapper-col="{ span: 14, offset: 4 }">
      <Button type="primary" @click="submitForm">提交</Button>
      <Button style="margin-left: 10px;" @click="resetForm">Reset</Button>
    </FormItem>
  </Form>
</template>

<script lang="ts">
/* 注： 这里不允许使用setup语法 */
import { defineComponent, toRefs, reactive, getCurrentInstance } from "vue"
import {
  ConfigProvider,
  Form,
  Button,
  Radio,
  Checkbox,
  Switch,
  Textarea,
  SelectOption,
  RadioGroup,
  CheckboxGroup,
  FormItem,
  Select,
  DatePicker,
  Input,
} from "ant-design-vue"
import dayjs from "dayjs"
import zhCN from "ant-design-vue/es/locale/zh_CN"
import "dayjs/locale/zh-cn"
dayjs.locale("zh-cn")
export default defineComponent({
  components: {
    ConfigProvider,
    Form,
    Button,
    Radio,
    Checkbox,
    Switch,
    Textarea,
    SelectOption,
    RadioGroup,
    CheckboxGroup,
    FormItem,
    Select,
    DatePicker,
    Input,
  },
  setup() {
    const state = reactive({
      formData: {
        name: {
          label: "姓名",
          disabled: false,
          showVisible: true,
          initialValue: "",
        },
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "change",
          },
          {
            min: 3,
            max: 5,
            message: "Length should be 3 to 5",
            trigger: "blur",
          },
        ],
      },
    })
    const instance = getCurrentInstance()
    const submitForm = () => {
      instance?.ctx?.$refs["vForm"].validate().then((valid) => {
        debugger;
        if (!valid) return;
        //TODO: 提交表单
      });
    }
    const resetForm = () => {
      instance?.ctx?.$refs["vForm"].resetFields();
    }
    return {
      // locale: zhCN,
      ...toRefs(state),
      submitForm,
      resetForm,
    }
  },
});
</script>
<style scoped>
/* 注 TODO: 这里支持less写法，但不建议使用，因为预览解析器暂时没适配*/
</style>
