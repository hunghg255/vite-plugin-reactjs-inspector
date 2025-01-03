import React from 'react'
import ReactDOM from 'react-dom/client'
import Overlay from 'virtual:react-inspector-path:Overlay.jsx'

const CONTAINER_ID = 'react-inspector-container'

function createInspectorContainer() {
  if (document.getElementById(CONTAINER_ID) != null)
    throw new Error('reactInspectorContainer element already exists')

  const el = document.createElement('div')
  el.setAttribute('id', CONTAINER_ID)
  document.querySelectorAll('body')[0].append(el)
  return el
}

function load() {
  const isClient = typeof window !== 'undefined'
  if (!isClient)
    return
  createInspectorContainer()

  const domContainer = document.querySelector(`#${CONTAINER_ID}`)

  if (domContainer)
    ReactDOM.createRoot(domContainer).render(React.createElement(Overlay))
}

load()
