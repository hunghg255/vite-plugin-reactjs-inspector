
<p align="center">
<a href="https://www.npmjs.com/package/vite-plugin-reactjs-inspector"><img src="https://raw.githubusercontent.com/hunghg255/vite-plugin-reactjs-inspector/main/logo.svg" width="180" alt="vite-plugin-reactjs-inspector"></a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vite-plugin-reactjs-inspector" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/npm/v/vite-plugin-reactjs-inspector" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/vite-plugin-reactjs-inspector" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/npm/dt/vite-plugin-reactjs-inspector" alt="NPM Downloads" /></a>
  <a href="https://www.npmjs.com/package/vite-plugin-reactjs-inspector/blob/master/LICENSE" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/github/license/hunghg255/vite-plugin-reactjs-inspector" alt="License" /></a>
</p>

<p align="center">
<a href="https://stackblitz.com/edit/vitejs-vite-vqjpeq?file=src%2FApp.jsx"><img src="https://developer.stackblitz.com/img/open_in_stackblitz.svg" alt=""></a>
</p>

## 📖 Introduction

A vite plugin which provides the ability that to jump to the local IDE when you click the element of browser automatically.

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
