import { tack } from 'tackjs'

const validClick = (e, dialog) => e.target !== dialog || !dialog.contains(e.target)

const isInContext = (el, context) => !context || context.filter(ctx => el === ctx ||ctx.contains(el)).length > 0

const createPortal = () => {
  const div = document.createElement('div')
  div.className = 'bar'
  div.role = 'dialog'
  div.setAttribute('aria-label', 'Share Dialog')
  div.setAttribute('aria-hidden', 'true')
  document.body.appendChild(div)
  return div
}

const render = (text, sharers, portal) => {
  portal.innerHTML = `
    <div class="bar__inner">${sharers.map(s => {
      const el = s(text)
      return typeof el === 'string' ? el : el.outerHTML
    }).join('')}</div>
  `

  portal.setAttribute('tabindex', '0')
  portal.setAttribute('aria-hidden', 'false')

  const node = portal.children[0]

  return {
    node,
    destroy() {
      portal.removeChild(node)
    }
  }
}

const getSelection = () => {
  const range = window.getSelection()

  if (range.collapsed) return null

  return range.rangeCount < 1 ? null : range.getRangeAt(0)
}

const sharerr = ({
  context = null,
  transitionSpeed = 200,
}) => (sharers = []) => {
  const portal = createPortal()

  let bar = null
  let dialog = null
  let timeout = 0
  let focusNode = null

  /**
   * Selections
   */
  let previousRange = null
  let currentRange = null

  const hide = () => {
    if (!dialog || !bar) return

    window.removeEventListener('resize', hide)
    portal.classList.add('is-hiding')

    timeout = setTimeout(() => {
      portal.classList.remove('is-hiding')
      portal.classList.remove('is-active')
      bar.destroy()
      dialog.destroy()
      dialog = null
      bar = null
      portal.removeAttribute('tabindex')
      div.setAttribute('aria-hidden', 'true')
      focusNode.focus()
    }, transitionSpeed)
  }

  const handleSelection = keyup => {
    currentRange = getSelection()

    if (!currentRange) return

    focusNode = document.activeElement

    const text = currentRange.toString()
    const previousText = previousRange ? previousRange.toString() : ''

    clearTimeout(timeout)

    if (!text || text.length <= 0 || (previousText === text && !keyup)) {
      hide()
    } else if (!previousRange || previousRange.toString() !== text) {
      dialog = render(text, sharers, portal)

      previousRange = currentRange

      bar = tack(portal, currentRange, 'top')

      setTimeout(() => {
        portal.focus()
        portal.classList.remove('is-hiding')
        portal.classList.add('is-active')
      }, transitionSpeed)

      window.addEventListener('resize', hide)
    }
  }

  window.addEventListener('mouseup', e => {
    if (validClick(e, portal) && isInContext(e.target, context)) {
      handleSelection()
    } else {
      hide()
    }
  })
  window.addEventListener('keyup', e => {
    if (!currentRange) return
    if (e.keyCode === 27) return hide()
    if (isInContext(currentRange.startContainer.parentNode, context)) handleSelection(true)
  })
  window.addEventListener('blur', hide)
}

export { sharerr }
export default sharerr
