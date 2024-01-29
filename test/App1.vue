<template>
  <Cant :editor="MonacoEditor" :store="store"></Cant>
</template>

<script setup>
import { Cant, CantStore } from '../src'
import MonacoEditor from '../src/editor/MonacoEditor.vue'

const store = new CantStore({})
</script>

<style lang="scss" scoped></style>
