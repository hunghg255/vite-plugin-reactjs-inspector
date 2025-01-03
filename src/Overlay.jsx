import { useEffect, useMemo, useRef, useState } from 'react'
import inspectorOptions from 'virtual:react-inspector-options'

import './styles/overlay.css'

const color = {
  disabled: '#E2C6C6',
  active: '#42b883',
}

const KEY_DATA = 'data-react-inspector'
const KEY_IGNORE = 'data-react-inspector-ignore'

function getData(el) {
  return !!el
}

const splitRE = /(.+):(\d+):(\d+)$/

function getTargetNode(e) {
  const path = e.path ?? e.composedPath()
  if (!path) {
    return {
      targetNode: null,
      params: null,
    }
  }
  const ignoreIndex = path.findIndex(node => node?.hasAttribute?.(KEY_IGNORE))
  const targetNode = path.slice(ignoreIndex + 1).find(node => getData(node))

  if (!targetNode) {
    return {
      targetNode: null,
      params: null,
    }
  }

  const key = Object.keys(targetNode).find(key => key.startsWith('__reactFiber$'))
  const fiber = targetNode[key]

  if (!fiber) {
    return {
      targetNode,
      params: null,
    }
  }

  const debugValues = fiber?.memoizedProps?.[KEY_DATA]

  const componentName = fiber?._debugOwner?.type?.displayName || fiber?._debugOwner?.type?.name || 'Unknown'

  const match = debugValues?.match(splitRE)

  const [, file, line, column] = match || []

  return {
    targetNode,
    params: debugValues
      ? {
          file,
          line,
          column,
          title: componentName,
        }
      : null,
  }
}

function openInEditor(baseUrl, file, line, column) {
  /**
   * Vite built-in support
   * https://github.com/vitejs/vite/blob/d59e1acc2efc0307488364e9f2fad528ec57f204/packages/vite/src/node/server/index.ts#L569-L570
   */
  const promise = fetch(
    `${baseUrl}/__open-in-editor?file=${inspectorOptions.cwdPath}${file}:${line}:${column}`,
    {
      mode: 'no-cors',
    },
  )

  // if (this.disableInspectorOnEditorOpen)
  //   promise.then(this.disable)

  return promise
}

function Overlay() {
  const [active, setActive] = useState(false)
  const [overlayVisible, setOverlayVisible] = useState(false)
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  })
  const [linkParams, setLinkParams] = useState({
    file: '',
    line: 0,
    column: 0,
  })
  const floatsRef = useRef(null)

  const baseUrl = useMemo(() => {
    const isClient = typeof window !== 'undefined'
    const importMetaUrl = isClient ? new URL(import.meta.url) : {}
    const protocol = importMetaUrl?.protocol
    const host = importMetaUrl?.hostname
    const port = importMetaUrl?.port
    const baseUrl = isClient ? `${protocol}//${host}:${port}` : ''
    return baseUrl
  }, [])

  const closeOverlay = () => {
    setOverlayVisible(false)
    setLinkParams({
      file: '',
      line: 0,
      column: 0,
    })
  }

  const floatsStyle = useMemo(() => {
    const margin = 10
    let x = position.x + (position.width / 2)
    let y = position.y + position.height + 5
    const floatsWidth = floatsRef?.current?.clientWidth ?? 0
    const floatsHeight = floatsRef?.current?.clientHeight ?? 0

    x = Math.max(margin, x)
    x = Math.min(x, window.innerWidth - floatsWidth - margin)

    y = Math.max(margin, y)
    y = Math.min(y, window.innerHeight - floatsHeight - margin)

    return {
      left: `${x}px`,
      top: `${y}px`,
    }
  }, [position, floatsRef])

  const sizeIndicatorStyle = useMemo(() => {
    return {
      left: `${position.x}px`,
      top: `${position.y}px`,
      width: `${position.width}px`,
      height: `${position.height}px`,
    }
  }, [position, floatsRef.current])

  const handleClick = (e) => {
    const { targetNode, params } = getTargetNode(e)
    if (!targetNode)
      return
    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()
    const { file, line, column } = params
    setOverlayVisible(false)
    openInEditor(baseUrl, file, line, column)
    setActive(false)
  }

  const updateLinkParams = (e) => {
    const { targetNode, params } = getTargetNode(e)
    if (targetNode) {
      const rect = targetNode.getBoundingClientRect()
      setOverlayVisible(true)
      setPosition({
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      })
      setLinkParams(params)
    }
    else {
      closeOverlay()
    }
  }

  useEffect(() => {
    if (active) {
      document.body.addEventListener('mousemove', updateLinkParams)
      document.body.addEventListener('resize', closeOverlay, true)
      document.body.addEventListener('click', handleClick, true)
    }
    else {
      document.body.removeEventListener('mousemove', updateLinkParams)
      document.body.removeEventListener('resize', closeOverlay, true)
      document.body.removeEventListener('click', handleClick, true)
    }

    return () => {
      document.body.removeEventListener('mousemove', updateLinkParams)
      document.body.removeEventListener('resize', closeOverlay, true)
      document.body.removeEventListener('click', handleClick, true)
    }
  }, [active])

  const onToggle = () => {
    setActive(!active)
  }

  const containerPosition = {}
  const bannerPosition = {}

  return (
    <div data-react-inspector-ignore={true}>
      <div
        className={`react-inspector-container ${active ? '' : 'react-inspector-container--disabled'}`}
        style={containerPosition}
      >
        <svg
          onClick={onToggle}
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <g fill="none">
            <path d="M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
            <path fill={active ? color.active : color.disabled} d="M10.611 10.611a1 1 0 0 1 1.11-.208l8.839 3.889a1 1 0 0 1-.14 1.88l-3.338.91l-.91 3.338a1 1 0 0 1-1.88.14l-3.89-8.84a1 1 0 0 1 .209-1.109M17 3a3 3 0 0 1 3 3v3a1 1 0 1 1-2 0V6a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h3a1 1 0 1 1 0 2H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zm-3.73 10.269l1.715 3.9l.318-1.164a1 1 0 0 1 .701-.702l1.165-.318l-3.9-1.716Z" />
          </g>
        </svg>

        <a
          style={bannerPosition}
          className="react-inspector-banner"
          href="https://github.com/hunghg255/vite-plugin-reactjs-inspector"
          target="_blank"
        >
          <span>vite-plugin-reactjs-inspector</span>
          Click on a element › Open IDE › Link to File
        </a>
      </div>

      {overlayVisible && linkParams && (
        <>
          <ul
            className="react-inspector-overlay"
            style={floatsStyle}
            ref={floatsRef}
          >
            <div>
              {linkParams.title}
              :
              {linkParams.line}
              :
              {linkParams.column}
            </div>
            <div className="tip">
              Click to go to the file
            </div>
          </ul>

          <div
            className="react-inspector-size-indicator"
            style={sizeIndicatorStyle}
          />
        </>
      )}

    </div>
  )
}

export default Overlay
