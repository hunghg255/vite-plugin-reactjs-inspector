/* eslint-disable new-cap */
import React from 'react'
import Overlay from 'virtual:react-inspector-path:Overlay.jsx'
import ReactDOM from 'react-dom/client'

const CONTAINER_ID = 'react-inspector-container'

function createInspectorContainer() {
  if (document.getElementById(CONTAINER_ID) != null)
    throw new Error('reactInspectorContainer element already exists')

  const el = document.createElement('div')
  el.setAttribute('id', CONTAINER_ID)
  document.getElementsByTagName('body')[0].appendChild(el)
  return el
}

function load() {
  const isClient = typeof window !== 'undefined'
  if (!isClient)
    return
  createInspectorContainer()

  const domContainer = document.querySelector(`#${CONTAINER_ID}`)

  if (domContainer) ReactDOM.createRoot(domContainer).render(React.createElement(Overlay))
}

load()
