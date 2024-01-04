
<p align="center">
<a href="https://github.com/hunghg255/vite-plugin-reactjs-inspector"><img src="./logo.svg" width="180" alt="vite-plugin-reactjs-inspector"></a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/vite-plugin-reactjs-inspector" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/npm/v/vite-plugin-reactjs-inspector" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/vite-plugin-reactjs-inspector" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/npm/dt/vite-plugin-reactjs-inspector" alt="NPM Downloads" /></a>
  <a href="https://github.com/hunghg255/vite-plugin-reactjs-inspector/blob/master/LICENSE" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/github/license/hunghg255/vite-plugin-reactjs-inspector" alt="License" /></a>
</p>

<p align="center">
<a href="https://stackblitz.com/edit/stackblitz-starters-hp6zdq?file=src%2FApp.tsx"><img src="https://developer.stackblitz.com/img/open_in_stackblitz.svg" alt=""></a>
</p>

## 📖 Introduction

A vite plugin which provides the ability that to jump to the local IDE when you click the element of browser automatically. It supports Vue2 & 3 & SSR.

<p align="center">
<img src="./public/preview.gif" alt="vite-plugin-reactjs-inspector">
</p>

## 📦 Installation

```bash

# vite-plugin-reactjs-inspector

pnpm install vite-plugin-reactjs-inspector -D

# unplugin-vue-inspector

pnpm install unplugin-vue-inspector -D

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
### Options


```ts
interface VitePluginInspectorOptions {
  /**
  * Default enable state
  * @default false
  */
  enabled?: boolean

  /**
  * Define a combo key to toggle inspector
  * @default 'control-shift' on windows, 'meta-shift' on other os
  *
  * any number of modifiers `control` `shift` `alt` `meta` followed by zero or one regular key, separated by -
  * examples: control-shift, control-o, control-alt-s  meta-x control-meta
  * Some keys have native behavior (e.g. alt-s opens history menu on firefox).
  * To avoid conflicts or accidentally typing into inputs, modifier only combinations are recommended.
  * You can also disable it by setting `false`.
  */
  toggleComboKey?: string | false

  /**
  * Toggle button visibility
  * @default 'active'
  */
  toggleButtonVisibility?: 'always' | 'active' | 'never'

  /**
  * Toggle button display position
  * @default top-right
  */
  toggleButtonPos?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

  /**
  * append an import to the module id ending with `appendTo` instead of adding a script into body
  * useful for frameworks that do not support trannsformIndexHtml hook (e.g. Nuxt3)
  *
  * WARNING: only set this if you know exactly what it does.
  */
  appendTo?: string | RegExp

  /**
  * Customize openInEditor host (e.g. http://localhost:3000)
  * @default false
  */
  openInEditorHost?: string | false
}
```
