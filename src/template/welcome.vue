<template>
  <Form ref="vForm" :rules="rules" :model="formData">
    <FormItem
      :label="formData.name.label"
      :name="formData.name.field"
      v-if="!formData.name.componentProp.hidden"
    >
      <Input
        v-model:value="formData.name.componentProp.defaultValue"
        :disabled="formData.name.componentProp.disabled"
      />
    </FormItem>
    <FormItem :wrapper-col="{ span: 14, offset: 4 }">
      <Button type="primary" @click="submitForm">提交</Button>
      <Button style="margin-left: 10px;" @click="resetForm">Reset</Button>
    </FormItem>
  </Form>
</template>

<script lang="ts">
/* 注： 这里不建议使用setup语法 */
import { defineComponent, toRefs, reactive, getCurrentInstance } from "vue";
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
} from "ant-design-vue";
import dayjs from "dayjs";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
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
          id: "xdhsg",
          type: "input",
          field: "name",
          label: "姓名" /*必须*/,
          componentProp: {
            defaultValue: "12323",
            disabled: false,
            hidden: false,
          },
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
    });
    const instance = getCurrentInstance();
    const submitForm = () => {
      instance?.ctx?.$refs["vForm"].validate().then((valid) => {
        debugger;
        if (!valid) return;
        //TODO: 提交表单
      });
    };
    const resetForm = () => {
      instance?.ctx?.$refs["vForm"].resetFields();
    };
    return {
      locale: zhCN,
      ...toRefs(state),
      submitForm,
      resetForm,
    };
  },
});
</script>
<style scoped>
/* 注 DOEN: 这里支持less写法*/
</style>
