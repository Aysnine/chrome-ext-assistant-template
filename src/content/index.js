const ROOT_ID = 'assistant-root' // ! CHANGE THIS VALUE FOR YOUR PROJECT

function createRoot() {
  const rawRoot = (() => {
    const root = document.getElementById(`#${ROOT_ID}`)

    if (!root) {
      const container = document.createElement('div')
      container.id = ROOT_ID
      container.style = 'position: absolute; width: 0; height: 0; margin: 0; padding: 0;'
      document.body.appendChild(container)

      return container
    }

    return root
  })()

  const shadowRoot = rawRoot instanceof ShadowRoot ? rawRoot : rawRoot.attachShadow({ mode: 'open' })

  return shadowRoot
}

const root = createRoot()

const style = document.createElement('style')
style.innerHTML = `
  .demo-text {
    position: fixed;
    bottom: 40px;
    right: 20px;
    z-index: 9999;
    background: #fff;
    padding: 10px;
    border: 1px solid #000;
  }
`
root.appendChild(style)

const div = document.createElement('div')
div.classList.add('demo-text')
div.innerHTML = 'Hello from page content'

root.appendChild(div)
