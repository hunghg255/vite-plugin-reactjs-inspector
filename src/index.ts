import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { type UnpluginFactory, createUnplugin } from 'unplugin'
import { normalizePath } from 'vite'
import type { PluginOptions } from './types'
import { idToFile, parseReactRequest } from './utils'

function getInspectorPath() {
  const pluginPath = normalizePath(
    path.dirname(fileURLToPath(import.meta.url)),
  )
  return pluginPath.replace(/\/dist$/, '/src')
}

const plugin: UnpluginFactory<PluginOptions | undefined> = () => {
  const inspectorPath = getInspectorPath()

  return {
    name: 'vite-plugin-reactjs-inspector',
    enforce: 'pre',
    apply(_: any, { command }: any) {
      // apply only on serve and not for test
      return command === 'serve' && process.env.NODE_ENV !== 'test'
    },
    config: () => {
      return {
        optimizeDeps: {
          include: ['react', 'react-dom'],
        },
      }
    },
    resolveId(importee: string) {
      if (importee.startsWith('virtual:react-inspector-path:')) {
        const resolved = importee.replace(
          'virtual:react-inspector-path:',
          `${inspectorPath}/`,
        )
        return resolved
      }
    },

    async load(id) {
      if (id.startsWith(inspectorPath)) {
        const { query } = parseReactRequest(id)
        if (query.type)
          return
        // read file ourselves to avoid getting shut out by vites fs.allow check
        const file = idToFile(id)
        if (fs.existsSync(file)) {
          return await fs.promises.readFile(file, 'utf-8')
        }
        else {
          console.error(
            `failed to find file for react-inspector: ${file}, referenced by id ${id}.`,
          )
        }
      }
    },
    transformIndexHtml(html: any) {
      return {
        html,
        tags: [
          {
            tag: 'script',
            injectTo: 'head',
            attrs: {
              type: 'module',
              src: `/@id/virtual:react-inspector-path:load.js`,
            },
          },
        ],
      }
    },
  }
}

const VitePluginReactInspector = /* #__PURE__ */ createUnplugin(plugin)

export default VitePluginReactInspector
