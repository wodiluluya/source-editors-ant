// vite.config.ts
import { mergeConfig } from 'file:///D:/repl-main%20(1)/repl-main/node_modules/.pnpm/vite@5.0.12_@types+node@20.11.5_less@4.2.0/node_modules/vite/dist/node/index.js'
import dts from 'file:///D:/repl-main%20(1)/repl-main/node_modules/.pnpm/vite-plugin-dts@3.7.1_@types+node@20.11.5_typescript@5.3.3_vite@5.0.12/node_modules/vite-plugin-dts/dist/index.mjs'

// vite.preview.config.ts
import { defineConfig } from 'file:///D:/repl-main%20(1)/repl-main/node_modules/.pnpm/vite@5.0.12_@types+node@20.11.5_less@4.2.0/node_modules/vite/dist/node/index.js'
import vue from 'file:///D:/repl-main%20(1)/repl-main/node_modules/.pnpm/@vitejs+plugin-vue@5.0.3_vite@5.0.12_vue@3.4.15/node_modules/@vitejs/plugin-vue/dist/index.mjs'
import replace from 'file:///D:/repl-main%20(1)/repl-main/node_modules/.pnpm/@rollup+plugin-replace@5.0.5/node_modules/@rollup/plugin-replace/dist/es/index.js'
import nodeProfill from 'file:///D:/repl-main%20(1)/repl-main/node_modules/.pnpm/vite-plugin-node-stdlib-browser@0.2.1_node-stdlib-browser@1.2.0_vite@5.0.12/node_modules/vite-plugin-node-stdlib-browser/index.cjs'
import path from 'path'
var __vite_injected_original_dirname = 'D:\\repl-main (1)\\repl-main'
var vite_preview_config_default = defineConfig({
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
      '@': path.resolve(__vite_injected_original_dirname, 'src'),
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

// vite.config.ts
import fs from 'node:fs'
import path2 from 'node:path'
var genStub = {
  name: 'gen-stub',
  apply: 'build',
  generateBundle() {
    this.emitFile({
      type: 'asset',
      fileName: 'ssr-stub.js',
      source: `module.exports = {}`,
    })
  },
}
var patchCssFiles = {
  name: 'patch-css',
  apply: 'build',
  writeBundle() {
    const outDir = path2.resolve('dist')
    fs.renameSync(
      path2.resolve(outDir, 'MonacoEditor.css'),
      path2.resolve(outDir, 'monaco-editor.css')
    )
    ;['vue-repl', 'monaco-editor'].forEach((file) => {
      const filePath = path2.resolve(outDir, file + '.js')
      const content = fs.readFileSync(filePath, 'utf-8')
      fs.writeFileSync(
        filePath,
        `import './${file}.css'
${content}`
      )
    })
  },
}
var vite_config_default = mergeConfig(vite_preview_config_default, {
  plugins: [
    dts({
      rollupTypes: false,
    }),
    genStub,
    patchCssFiles,
  ],
  optimizeDeps: {
    // avoid late discovered deps
    include: [
      'typescript',
      'monaco-editor-core/esm/vs/editor/editor.worker',
      'vue/server-renderer',
    ],
  },
  base: './',
  build: {
    target: 'esnext',
    minify: false,
    lib: {
      entry: {
        'vue-repl': './src/index.ts',
        'monaco-editor': './src/editor/MonacoEditor.vue',
      },
      formats: ['es'],
      fileName: () => '[name].js',
    },
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        chunkFileNames: 'chunks/[name]-[hash].js',
      },
      external: ['vue', 'vue/compiler-sfc'],
    },
  },
})
export { vite_config_default as default }
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidml0ZS5wcmV2aWV3LmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHJlcGwtbWFpbiAoMSlcXFxccmVwbC1tYWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxyZXBsLW1haW4gKDEpXFxcXHJlcGwtbWFpblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovcmVwbC1tYWluJTIwKDEpL3JlcGwtbWFpbi92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IFBsdWdpbiwgbWVyZ2VDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnXG5pbXBvcnQgYmFzZSBmcm9tICcuL3ZpdGUucHJldmlldy5jb25maWcnXG5pbXBvcnQgZnMgZnJvbSAnbm9kZTpmcydcbmltcG9ydCBwYXRoIGZyb20gJ25vZGU6cGF0aCdcblxuY29uc3QgZ2VuU3R1YjogUGx1Z2luID0ge1xuICBuYW1lOiAnZ2VuLXN0dWInLFxuICBhcHBseTogJ2J1aWxkJyxcbiAgZ2VuZXJhdGVCdW5kbGUoKSB7XG4gICAgdGhpcy5lbWl0RmlsZSh7XG4gICAgICB0eXBlOiAnYXNzZXQnLFxuICAgICAgZmlsZU5hbWU6ICdzc3Itc3R1Yi5qcycsXG4gICAgICBzb3VyY2U6IGBtb2R1bGUuZXhwb3J0cyA9IHt9YCxcbiAgICB9KVxuICB9LFxufVxuXG4vKipcbiAqIFBhdGNoIGdlbmVyYXRlZCBlbnRyaWVzIGFuZCBpbXBvcnQgdGhlaXIgY29ycmVzcG9uZGluZyBDU1MgZmlsZXMuXG4gKiBBbHNvIG5vcm1hbGl6ZSBNb25hY29FZGl0b3IuY3NzXG4gKi9cbmNvbnN0IHBhdGNoQ3NzRmlsZXM6IFBsdWdpbiA9IHtcbiAgbmFtZTogJ3BhdGNoLWNzcycsXG4gIGFwcGx5OiAnYnVpbGQnLFxuICB3cml0ZUJ1bmRsZSgpIHtcbiAgICAvLyAxLiBNb25hY29FZGl0b3IuY3NzIC0+IG1vbmFjby1lZGl0b3IuY3NzXG4gICAgY29uc3Qgb3V0RGlyID0gcGF0aC5yZXNvbHZlKCdkaXN0JylcbiAgICBmcy5yZW5hbWVTeW5jKFxuICAgICAgcGF0aC5yZXNvbHZlKG91dERpciwgJ01vbmFjb0VkaXRvci5jc3MnKSxcbiAgICAgIHBhdGgucmVzb2x2ZShvdXREaXIsICdtb25hY28tZWRpdG9yLmNzcycpXG4gICAgKVxuXG4gICAgLy8gMi4gaW5qZWN0IGNzcyBpbXBvcnRzIHRvIHRoZSBmaWxlc1xuICAgIDtbJ3Z1ZS1yZXBsJywgJ21vbmFjby1lZGl0b3InXS5mb3JFYWNoKChmaWxlKSA9PiB7XG4gICAgICBjb25zdCBmaWxlUGF0aCA9IHBhdGgucmVzb2x2ZShvdXREaXIsIGZpbGUgKyAnLmpzJylcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBmcy5yZWFkRmlsZVN5bmMoZmlsZVBhdGgsICd1dGYtOCcpXG4gICAgICBmcy53cml0ZUZpbGVTeW5jKGZpbGVQYXRoLCBgaW1wb3J0ICcuLyR7ZmlsZX0uY3NzJ1xcbiR7Y29udGVudH1gKVxuICAgIH0pXG4gIH0sXG59XG5cbmV4cG9ydCBkZWZhdWx0IG1lcmdlQ29uZmlnKGJhc2UsIHtcbiAgcGx1Z2luczogW1xuICAgIGR0cyh7XG4gICAgICByb2xsdXBUeXBlczogZmFsc2UsXG4gICAgfSksXG4gICAgZ2VuU3R1YixcbiAgICBwYXRjaENzc0ZpbGVzLFxuICBdLFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICAvLyBhdm9pZCBsYXRlIGRpc2NvdmVyZWQgZGVwc1xuICAgIGluY2x1ZGU6IFtcbiAgICAgICd0eXBlc2NyaXB0JyxcbiAgICAgICdtb25hY28tZWRpdG9yLWNvcmUvZXNtL3ZzL2VkaXRvci9lZGl0b3Iud29ya2VyJyxcbiAgICAgICd2dWUvc2VydmVyLXJlbmRlcmVyJyxcbiAgICBdLFxuICB9LFxuICBiYXNlOiAnLi8nLFxuICBidWlsZDoge1xuICAgIHRhcmdldDogJ2VzbmV4dCcsXG4gICAgbWluaWZ5OiBmYWxzZSxcbiAgICBsaWI6IHtcbiAgICAgIGVudHJ5OiB7XG4gICAgICAgICd2dWUtcmVwbCc6ICcuL3NyYy9pbmRleC50cycsXG4gICAgICAgICdtb25hY28tZWRpdG9yJzogJy4vc3JjL2VkaXRvci9Nb25hY29FZGl0b3IudnVlJyxcbiAgICAgIH0sXG4gICAgICBmb3JtYXRzOiBbJ2VzJ10sXG4gICAgICBmaWxlTmFtZTogKCkgPT4gJ1tuYW1lXS5qcycsXG4gICAgfSxcbiAgICBjc3NDb2RlU3BsaXQ6IHRydWUsXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIGNodW5rRmlsZU5hbWVzOiAnY2h1bmtzL1tuYW1lXS1baGFzaF0uanMnLFxuICAgICAgfSxcbiAgICAgIGV4dGVybmFsOiBbJ3Z1ZScsICd2dWUvY29tcGlsZXItc2ZjJ10sXG4gICAgfSxcbiAgfSxcbn0pXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXHJlcGwtbWFpbiAoMSlcXFxccmVwbC1tYWluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxyZXBsLW1haW4gKDEpXFxcXHJlcGwtbWFpblxcXFx2aXRlLnByZXZpZXcuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9yZXBsLW1haW4lMjAoMSkvcmVwbC1tYWluL3ZpdGUucHJldmlldy5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgcmVwbGFjZSBmcm9tICdAcm9sbHVwL3BsdWdpbi1yZXBsYWNlJ1xuaW1wb3J0IG5vZGVQcm9maWxsIGZyb20gJ3ZpdGUtcGx1Z2luLW5vZGUtc3RkbGliLWJyb3dzZXInXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgZGVmaW5lOiB7XG4gICAgJ3Byb2Nlc3MuZW52Jzoge31cbiAgfSxcbiAgcGx1Z2luczogW1xuICAgIG5vZGVQcm9maWxsKCksXG4gICAgdnVlKHtcbiAgICAgIHNjcmlwdDoge1xuICAgICAgICBkZWZpbmVNb2RlbDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXG4gICAgICAnQHZ1ZS9jb21waWxlci1kb20nOiAnQHZ1ZS9jb21waWxlci1kb20vZGlzdC9jb21waWxlci1kb20uY2pzLmpzJyxcbiAgICAgICdAdnVlL2NvbXBpbGVyLWNvcmUnOiAnQHZ1ZS9jb21waWxlci1jb3JlL2Rpc3QvY29tcGlsZXItY29yZS5janMuanMnLFxuICAgIH0sXG4gIH0sXG4gIC8vIC8vICAgdnVlQXBpXG4gIHNlcnZlcjoge1xuICAgIGhvc3Q6IHRydWUsXG4gICAgcG9ydDogODA4OSxcbiAgICBvcGVuOiB0cnVlLFxuICAgIHByb3h5OiB7XG4gICAgICAnL3Z1ZUFwaSc6IHtcbiAgICAgICAgdGFyZ2V0OiAnaHR0cHM6Ly9wbGF5LnZ1ZWpzLm9yZycsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgcmV3cml0ZTogKHApID0+IHAucmVwbGFjZSgvXlxcL3Z1ZUFwaS8sICcnKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICBjb21tb25qc09wdGlvbnM6IHtcbiAgICAgIGlnbm9yZTogWyd0eXBlc2NyaXB0J10sXG4gICAgfSxcbiAgfSxcbiAgd29ya2VyOiB7XG4gICAgZm9ybWF0OiAnZXMnLFxuICAgIHBsdWdpbnM6ICgpID0+IFtcbiAgICAgIHJlcGxhY2Uoe1xuICAgICAgICBwcmV2ZW50QXNzaWdubWVudDogdHJ1ZSxcbiAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgJ3Byb2Nlc3MuZW52Lk5PREVfRU5WJzogSlNPTi5zdHJpbmdpZnkoJ3Byb2R1Y3Rpb24nKSxcbiAgICAgICAgfSxcbiAgICAgIH0pLFxuICAgIF0sXG4gIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF3USxTQUFpQixtQkFBbUI7QUFDNVMsT0FBTyxTQUFTOzs7QUNEd1EsU0FBUyxvQkFBb0I7QUFDclQsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sYUFBYTtBQUNwQixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLFVBQVU7QUFKakIsSUFBTSxtQ0FBbUM7QUFLekMsSUFBTyw4QkFBUSxhQUFhO0FBQUEsRUFDMUIsUUFBUTtBQUFBLElBQ04sZUFBZSxDQUFDO0FBQUEsRUFDbEI7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLFlBQVk7QUFBQSxJQUNaLElBQUk7QUFBQSxNQUNGLFFBQVE7QUFBQSxRQUNOLGFBQWE7QUFBQSxNQUNmO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBLE1BQ2xDLHFCQUFxQjtBQUFBLE1BQ3JCLHNCQUFzQjtBQUFBLElBQ3hCO0FBQUEsRUFDRjtBQUFBO0FBQUEsRUFFQSxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxXQUFXO0FBQUEsUUFDVCxRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsYUFBYSxFQUFFO0FBQUEsTUFDM0M7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsaUJBQWlCO0FBQUEsTUFDZixRQUFRLENBQUMsWUFBWTtBQUFBLElBQ3ZCO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sUUFBUTtBQUFBLElBQ1IsU0FBUyxNQUFNO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixtQkFBbUI7QUFBQSxRQUNuQixRQUFRO0FBQUEsVUFDTix3QkFBd0IsS0FBSyxVQUFVLFlBQVk7QUFBQSxRQUNyRDtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBQ0YsQ0FBQzs7O0FEbERELE9BQU8sUUFBUTtBQUNmLE9BQU9BLFdBQVU7QUFFakIsSUFBTSxVQUFrQjtBQUFBLEVBQ3RCLE1BQU07QUFBQSxFQUNOLE9BQU87QUFBQSxFQUNQLGlCQUFpQjtBQUNmLFNBQUssU0FBUztBQUFBLE1BQ1osTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLElBQ1YsQ0FBQztBQUFBLEVBQ0g7QUFDRjtBQU1BLElBQU0sZ0JBQXdCO0FBQUEsRUFDNUIsTUFBTTtBQUFBLEVBQ04sT0FBTztBQUFBLEVBQ1AsY0FBYztBQUVaLFVBQU0sU0FBU0MsTUFBSyxRQUFRLE1BQU07QUFDbEMsT0FBRztBQUFBLE1BQ0RBLE1BQUssUUFBUSxRQUFRLGtCQUFrQjtBQUFBLE1BQ3ZDQSxNQUFLLFFBQVEsUUFBUSxtQkFBbUI7QUFBQSxJQUMxQztBQUdDLEtBQUMsWUFBWSxlQUFlLEVBQUUsUUFBUSxDQUFDLFNBQVM7QUFDL0MsWUFBTSxXQUFXQSxNQUFLLFFBQVEsUUFBUSxPQUFPLEtBQUs7QUFDbEQsWUFBTSxVQUFVLEdBQUcsYUFBYSxVQUFVLE9BQU87QUFDakQsU0FBRyxjQUFjLFVBQVUsYUFBYSxJQUFJO0FBQUEsRUFBVSxPQUFPLEVBQUU7QUFBQSxJQUNqRSxDQUFDO0FBQUEsRUFDSDtBQUNGO0FBRUEsSUFBTyxzQkFBUSxZQUFZLDZCQUFNO0FBQUEsRUFDL0IsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLE1BQ0YsYUFBYTtBQUFBLElBQ2YsQ0FBQztBQUFBLElBQ0Q7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUFBLEVBQ0EsY0FBYztBQUFBO0FBQUEsSUFFWixTQUFTO0FBQUEsTUFDUDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE1BQU07QUFBQSxFQUNOLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxJQUNSLEtBQUs7QUFBQSxNQUNILE9BQU87QUFBQSxRQUNMLFlBQVk7QUFBQSxRQUNaLGlCQUFpQjtBQUFBLE1BQ25CO0FBQUEsTUFDQSxTQUFTLENBQUMsSUFBSTtBQUFBLE1BQ2QsVUFBVSxNQUFNO0FBQUEsSUFDbEI7QUFBQSxJQUNBLGNBQWM7QUFBQSxJQUNkLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGdCQUFnQjtBQUFBLE1BQ2xCO0FBQUEsTUFDQSxVQUFVLENBQUMsT0FBTyxrQkFBa0I7QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIiwgInBhdGgiXQp9Cg==
