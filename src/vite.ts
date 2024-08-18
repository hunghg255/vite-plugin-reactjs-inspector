/**
 * This entry file is for Vite plugin.
 *
 * @module
 */

import unplugin from './index'

/**
 * Vite plugin
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import VitePluginReactInspector from 'vite-plugin-reactjs-inspector/vite'
 *
 * export default defineConfig({
 *   plugins: [VitePluginReactInspector()],
 * })
 * ```
 */
export default unplugin.vite
