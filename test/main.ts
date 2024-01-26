import { createApp, h } from 'vue'
// import { Repl, ReplStore } from '../src'
//  import MonacoEditor from '../src/editor/MonacoEditor.vue'

import { Repl, ReplStore } from '../dist/vue-repl'
import MonacoEditor from '../dist/monaco-editor'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
;(window as any).process = { env: {} }

const App = {
  setup() {
    const store = new ReplStore({})

    return () =>
      h(Repl, {
        store,
        editor: MonacoEditor,
      })
  },
}

createApp(App).use(Antd).mount('#app')
