import { createApp, h } from 'vue'
import { Repl, ReplStore } from '../src'
import MonacoEditor from '../src/editor/MonacoEditor.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
;(window as any).process = { env: {} }

const App = {
  setup() {
    const store = ((window as any).store = new ReplStore({}))

    return () =>
      h(Repl, {
        store,
        editor: MonacoEditor,
      })
  },
}

createApp(App).use(Antd).mount('#app')
