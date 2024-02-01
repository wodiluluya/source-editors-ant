import { reactive, watchEffect } from 'vue'
import * as defaultCompiler from 'vue/compiler-sfc'
import { compileFile } from './transform'
import type { editor } from 'monaco-editor-core'
import welcomeCode from './template/welcome.vue?raw'

const defaultMainFile = 'src/App.vue'

export const importMapFile = 'import-map.json'
export const tsconfigFile = 'tsconfig.json'

const tsconfig = {
  compilerOptions: {
    allowJs: true,
    checkJs: true,
    jsx: 'Preserve',
    target: 'ESNext',
    module: 'ESNext',
    moduleResolution: 'Bundler',
    allowImportingTsExtensions: true,
  },
  vueCompilerOptions: {
    target: 3.3,
  },
}

export class File {
  filename: string
  code: string
  hidden: boolean
  compiled = {
    js: '',
    css: '',
    ssr: '',
  }
  editorViewState: editor.ICodeEditorViewState | null = null

  constructor(filename: string, code = '', hidden = false) {
    this.filename = filename
    this.code = code
    this.hidden = hidden
  }

  get language() {
    if (this.filename.endsWith('.vue')) {
      return 'vue'
    }
    if (this.filename.endsWith('.html')) {
      return 'html'
    }
    if (this.filename.endsWith('.css')) {
      return 'css'
    }
    if (this.filename.endsWith('.ts')) {
      return 'typescript'
    }
    return 'javascript'
  }
}

export interface StoreState {
  mainFile: string
  files: Record<string, File>
  activeFile: File
  errors: (string | Error)[]
  typescriptVersion: string
  typescriptLocale?: string | undefined
}

export interface Store {
  state: StoreState
  compiler: typeof defaultCompiler
  init: () => void
  setActive: (filename: string) => void
  getTsConfig?: () => any
}

export interface StoreOptions {
  welcomeFileTemplate?: string
}

export class CantStore implements Store {
  state: StoreState
  compiler = defaultCompiler
  welcomeFileTemplate: string
  constructor({ welcomeFileTemplate = welcomeCode }: StoreOptions = {}) {
    const files: StoreState['files'] = {}

    this.welcomeFileTemplate = welcomeFileTemplate
    setFile(files, defaultMainFile, this.welcomeFileTemplate)

    let mainFile = defaultMainFile
    if (!files[mainFile]) {
      mainFile = Object.keys(files)[0]
    }
    this.state = reactive({
      mainFile,
      files,
      activeFile: files[mainFile],
      errors: [],
      typescriptVersion: 'latest',
      typescriptLocale: undefined,
    })

    this.initTsConfig()
  }

  // don't start compiling until the options are set
  init() {
    watchEffect(() =>
      compileFile(this, this.state.activeFile).then(
        (errs) => (this.state.errors = errs)
      )
    )

    this.state.errors = []
    for (const file in this.state.files) {
      if (file !== defaultMainFile) {
        compileFile(this, this.state.files[file]).then((errs) =>
          this.state.errors.push(...errs)
        )
      }
    }
  }

  private initTsConfig() {
    if (!this.state.files[tsconfigFile]) {
      this.setTsConfig(tsconfig)
    }
  }

  setTsConfig(config: any) {
    this.state.files[tsconfigFile] = new File(
      tsconfigFile,
      JSON.stringify(config, undefined, 2)
    )
  }

  getTsConfig() {
    try {
      return JSON.parse(this.state.files[tsconfigFile].code)
    } catch {
      return {}
    }
  }

  setActive(filename: string) {
    this.state.activeFile = this.state.files[filename]
  }
}

function setFile(
  files: Record<string, File>,
  filename: string,
  content: string
) {
  // prefix user files with src/
  // for cleaner Volar path completion when using Monaco editor
  const normalized = addSrcPrefix(filename)
  files[normalized] = new File(normalized, content)
}

function addSrcPrefix(file: string) {
  return file === importMapFile ||
    file === tsconfigFile ||
    file.startsWith('src/')
    ? file
    : `src/${file}`
}
