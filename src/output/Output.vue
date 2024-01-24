<script setup lang="ts">
import { FolderViewOutlined } from '@ant-design/icons-vue'
import Preview from './Preview.vue'
import { ref } from 'vue'

const previewRef = ref<InstanceType<typeof Preview>>()
const getData = () => {
  return previewRef.value?.getData()
}
const open = ref<boolean>(false);

const showModal = () => {
  open.value = true;
};
const handleOk = (e: MouseEvent) => {
  console.log(e);
  open.value = false;
};
defineExpose({
  getData,
})

</script>

<template>
  <div class="output-container">
    <FolderViewOutlined class="opt" @click="showModal" />
    <Preview ref="previewRef" />
    <a-modal
      v-model:open="open"
      title="表单预览"
      width="1000px"
      :footer="null"
      @ok="handleOk"
    >
     <Preview ref="previewRef" />
    </a-modal>
  </div>
</template>

<style scoped>
.opt{
  position: absolute;
    right: 14px;
    top: 2px;
    font-size: 18px;
    cursor: pointer;
}
.output-container {
  height: 100%;
  overflow: hidden;
  position: relative;
}
.full-modal {
  .ant-modal {
    max-width: 100%;
    top: 0;
    padding-bottom: 0;
    margin: 0;
  }
  .ant-modal-content {
    display: flex;
    flex-direction: column;
    height: calc(100vh);
  }
  .ant-modal-body {
    flex: 1;
  }
}
</style>
