## 源码编辑器

### 支持ant-design-vue v4 less 全局汉化 内网环境等 必须全局引入ant-design-vue

- main文件中

```js
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
app.use(Antd)
```

- 组件中

```vue
<script setup>
import { Repl, ReplStore } from 'source-editors'
import Monaco from 'source-editors/monaco-editor'
// const store = = new ReplStore({})
// store可获取实例信息
// repl.value.getEditor() 获取编辑器  getData
// repl.value.state
</script>

<template>
  <Repl :editor="Monaco" :store="store" ref="repl" />
</template>
```
