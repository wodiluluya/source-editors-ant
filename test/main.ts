import { createApp } from 'vue'
import App from './App1.vue'

import './test.css'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
;(window as any).process = { env: {} }

createApp(App).use(Antd).mount('#app')
