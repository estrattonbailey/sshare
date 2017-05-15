import { tack } from 'tackjs'

/**
 * Check if click happened
 * within the dialog
 *
 * @param {event} e The click event
 * @param {object} dialog The share dialog
 * @return {boolean}
 */
const validClick = (e, dialog) => e.target !== dialog || !dialog.contains(e.target)

/**
 * Check if event is within
 * the user-specified scope
 *
 * @param {object} el The element that triggered the event
 * @param {array} context Array of elements to scope to
 * @return {boolean}
 */
const isInContext = (el, context) => !context || [].slice.call(document.querySelectorAll(context)).filter(ctx => el === ctx ||ctx.contains(el)).length > 0

/**
 * Create the main portal
 * that the links are
 * rendered into. Set
 * accessiblity attrs.
 *
 * @return {object} a DOM element
 */
const createPortal = () => {
  const div = document.createElement('div')
  div.className = 'sshare'
  div.role = 'dialog'
  div.setAttribute('aria-label', 'Share Dialog')
  div.setAttribute('aria-hidden', 'true')
  document.body.appendChild(div)
  return div
}

/**
 * Render share links,
 * return node and destroy method
 *
 * @param {string} text The highlighted text
 * @param {array} sharers Array of functions that return elements or strings
 * @param {object} portal The portal returned from createPortal()
 */
const render = (text, sharers, portal) => {
  portal.innerHTML = `
    <div class="sshare__inner">${sharers.map(s => {
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

/**
 * Get range object for highlighted text
 *
 * @return {object} range
 */
const getSelection = () => {
  const range = window.getSelection()

  if (range.collapsed) return null

  return range.rangeCount < 1 ? null : range.getRangeAt(0)
}

/**
 * Init
 */
const sshare = ({
  context = null,
  transitionSpeed = 200,
}, sharers = []) => {
  const portal = createPortal()

  let bar = null
  let dialog = null
  let timeout = 0

  /**
   * Selections
   */
  let previousRange = null
  let currentRange = null

  /**
   * Destroys the dialog, tackjs instance
   * removes listeners, and sets
   * accessiblity attrs back to defaults
   */
  const hide = () => {
    if (!dialog || !bar) return

    window.removeEventListener('resize', hide)
    portal.classList.add('is-hiding')

    timeout = setTimeout(() => {
      portal.classList.remove('is-hiding')
      portal.classList.remove('is-active')
      portal.removeAttribute('tabindex')
      portal.setAttribute('aria-hidden', 'true')

      bar && bar.destroy()
      dialog && dialog.destroy()
      dialog = null
      bar = null
    }, transitionSpeed)
  }

  const handleSelection = keyup => {
    currentRange = getSelection()

    if (!currentRange) return

    const text = currentRange.toString()
    const previousText = previousRange ? previousRange.toString() : ''

    clearTimeout(timeout)

    /**
     * If no text, or the text is the same
     * after a click event, hide.
     *
     * Otherwise, if it's new text
     * render a new dialog.
     */
    if (!text || text.length <= 0 || (previousText === text && !keyup)) {
      hide()
    } else if (!previousRange || previousText !== text) {
      dialog = render(text, sharers, portal)

      previousRange = currentRange

      bar = tack(portal, currentRange, 'top')

      /**
       * Ensures you don't see the
       * dialog fly into place
       */
      setTimeout(() => {
        portal.classList.remove('is-hiding')
        portal.classList.add('is-active')
      }, transitionSpeed)

      /**
       * Add listener, which is removed
       * immediately if it's triggered
       */
      window.addEventListener('resize', hide)
    }
  }

  const mouseup = e => {
    validClick(e, portal) && isInContext(e.target, context) ? handleSelection() : hide()
  }
  const keyup = e => {
    if (!currentRange) return
    if (e.keyCode === 27) return hide()
    if (isInContext(currentRange.startContainer.parentNode, context)) handleSelection(true)
  }

  window.addEventListener('mouseup', mouseup)
  window.addEventListener('keyup', keyup)
  window.addEventListener('blur', hide)

  return {
    destroy() {
      window.removeEventListener('mouseup', mouseup)
      window.removeEventListener('keyup', keyup)
      window.removeEventListener('blur', hide)
      window.removeEventListener('resize', hide)
      bar && bar.destroy()
      document.body.contains(portal) && document.body.removeChild(portal)
    }
  }
}

export { sshare }
export default sshare
