/// <reference types="vite/client" />

declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const comp: ComponentOptions
  export default comp
}

declare module 'prettier/standalone'
declare module 'prettier/parser-html'
declare module 'prettier/parser-babel'
