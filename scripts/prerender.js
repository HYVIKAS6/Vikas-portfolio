import { readFile, writeFile } from 'node:fs/promises'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { createServer } from 'vite'

const vite = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom' })
try {
  const { default: App } = await vite.ssrLoadModule('/src/App.jsx')
  const html = await readFile('dist/index.html', 'utf8')
  await writeFile('dist/index.html', html.replace('<!--app-->', renderToString(createElement(App))))
} finally {
  await vite.close()
}
