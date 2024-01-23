import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import replace from '@rollup/plugin-replace'
import nodeProfill from 'vite-plugin-node-stdlib-browser'
import path from 'path'
export default defineConfig({
  define: {
    'process.env': {},
  },
  plugins: [
    nodeProfill(),
    vue({
      script: {
        defineModel: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@vue/compiler-dom': '@vue/compiler-dom/dist/compiler-dom.cjs.js',
      '@vue/compiler-core': '@vue/compiler-core/dist/compiler-core.cjs.js',
    },
  },
  // //   vueApi
  server: {
    host: true,
    port: 8089,
    open: true,
    proxy: {
      '/vueApi': {
        target: 'https://play.vuejs.org',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/vueApi/, ''),
      },
    },
  },
  build: {
    commonjsOptions: {
      ignore: ['typescript'],
    },
  },
  worker: {
    format: 'es',
    plugins: () => [
      replace({
        preventAssignment: true,
        values: {
          'process.env.NODE_ENV': JSON.stringify('production'),
        },
      }),
    ],
  },
})
