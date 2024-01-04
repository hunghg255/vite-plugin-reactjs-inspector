import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import { parseSync, traverse } from '@babel/core'
import MagicString from 'magic-string'
import { idToFile, parseJSXIdentifier, parseReactRequest } from './utils'
import type { PluginOptions } from './types'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'node:fs'
import { normalizePath } from 'vite'
import { cwd } from 'node:process'


function getInspectorPath() {
  const pluginPath = normalizePath(path.dirname(fileURLToPath(import.meta.url)))
  return pluginPath.replace(/\/dist$/, '/src')
}

export const unpluginFactory: UnpluginFactory<PluginOptions | undefined> = options => {
  const inspectorPath = getInspectorPath()

  return {
    name: 'vite-plugin-reactjs-inspector',
    enforce: 'pre',
    apply(_, { command }) {
      // apply only on serve and not for test
      return command === 'serve' && process.env.NODE_ENV !== 'test'
    },
    config: () => {
      return {
        optimizeDeps: {
          include: ['react-dom'],
        },
      }
    },
    async resolveId(importee: string) {
      if (importee.startsWith('virtual:react-inspector-options')) {
        return importee
      }
      if (importee.startsWith('virtual:react-inspector-path:')) {
        const resolved = importee.replace('virtual:react-inspector-path:', `${inspectorPath}/`)
        return resolved
      }
    },

    async load(id) {
      if (id === 'virtual:react-inspector-options') {
        return `export default {
          cwdPath: '${cwd()}/',
        }`
      }
      if (id.startsWith(inspectorPath)) {
        const { query } = parseReactRequest(id)
        if (query.type)
          return
        // read file ourselves to avoid getting shut out by vites fs.allow check
        const file = idToFile(id)
        if (fs.existsSync(file))
          return await fs.promises.readFile(file, 'utf-8')
        else
          console.error(`failed to find file for react-inspector: ${file}, referenced by id ${id}.`)
      }
    },
    transform: (code, id) => {
      const { filename, query } = parseReactRequest(id)

      const isJsx = filename.endsWith('.jsx') || filename.endsWith('.tsx');

      if (isJsx) {
        const transformedCode = code
        const s = new MagicString(transformedCode)
        const ast = parseSync(code, {
          configFile: false,
          filename: id,
          ast: true,
          presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
        })
        traverse(ast, {
          enter({ node }) {
            if (node.type === 'JSXElement') {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              if (node?.openingElement?.name?.object?.name === 'React')
                return

              const { start } = node
              const { column, line } = node?.loc?.start as any
              const toInsertPosition = start + parseJSXIdentifier(node.openingElement.name as any).length + 1;
              const content = ` data-react-inspector="${filename.replace(`${cwd()}/`, '')}:${line}:${column}"`
              s.appendLeft(toInsertPosition, content)
            }
          },
        })
        const sourceMap = s.generateMap({
          source: id,
          includeContent: true,
        })
        return {
          code: s.toString(),
          map: sourceMap,
        }
      }
    },
    transformIndexHtml(html) {
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

export const HostQrCode = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default HostQrCode
