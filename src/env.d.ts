/// <reference types="vite/client" />

declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const comp: ComponentOptions
  export default comp
}

declare module 'prettier/standalone'
declare module 'prettier/parser-html'
declare module 'prettier/parser-babel'
declare module 'prettier/parser-typescript'
declare module 'prettier/parser-espree'
declare module 'prettier-plugin-vue'
