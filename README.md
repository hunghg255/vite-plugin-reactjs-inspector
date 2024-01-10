<p align="center">
<a href="https://www.npmjs.com/package/vite-plugin-reactjs-inspector" target="_blank" rel="noopener noreferrer">
<img src="https://api.iconify.design/bi:plugin.svg?color=%23a985ff" alt="logo" width='100'/></a>
</p>

<p align="center">
  A plugin inspector reactjs element for <a href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer">Vitejs</a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vite-plugin-reactjs-inspector" target="_blank" rel="noopener noreferrer"><img src="https://badge.fury.io/js/vite-plugin-reactjs-inspector.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/vite-plugin-reactjs-inspector" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/npm/dt/vite-plugin-reactjs-inspector.svg?logo=npm" alt="NPM Downloads" /></a>
  <a href="https://bundlephobia.com/result?p=vite-plugin-reactjs-inspector" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/bundlephobia/minzip/vite-plugin-reactjs-inspector" alt="Minizip" /></a>
  <a href="https://github.com/hunghg255/vite-plugin-reactjs-inspector/graphs/contributors" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/all_contributors-1-orange.svg" alt="Contributors" /></a>
  <a href="https://github.com/hunghg255/vite-plugin-reactjs-inspector/blob/main/LICENSE" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/github/license/hunghg255/vite-plugin-reactjs-inspector" alt="License" /></a>
</p>

<p align="center">
<a href="https://stackblitz.com/edit/vitejs-vite-vqjpeq?file=src%2FApp.jsx"><img src="https://developer.stackblitz.com/img/open_in_stackblitz.svg" alt=""></a>
</p>

## 📖 Introduction

A vite plugin which provides the ability that to jump to the local IDE when you click the element of browser automatically.

![demo](https://raw.githubusercontent.com/hunghg255/vite-plugin-reactjs-inspector/main/public/demo.gif)

## 📦 Installation

```bash
npm install vite-plugin-reactjs-inspector -D
```

## 🦄 Usage

### Configuration Vite

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import VitePluginReactInspector from 'vite-plugin-reactjs-inspector/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePluginReactInspector()],
})
```
