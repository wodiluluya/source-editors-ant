import { createApp, h } from 'vue'
// import { Repl, CantStore } from '../src'
//  import MonacoEditor from '../src/editor/MonacoEditor.vue'

import { Cant, CantStore } from '../dist/code-opt'
import MonacoEditor from '../dist/monaco-editor'

import './test.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
;(window as any).process = { env: {} }

const App = {
  setup() {
    const store = new CantStore({})

    return () =>
      h(Cant, {
        store,
        editor: MonacoEditor,
      })
  },
}

createApp(App).use(Antd).mount('#app')
