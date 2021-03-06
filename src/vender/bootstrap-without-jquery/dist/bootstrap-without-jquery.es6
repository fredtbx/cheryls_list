
(function(window, document) {
  'use strict'

  const Utils = {
    /**
     * Remove a DOM element selected via itself or an event (target)
     *
     * @param  {HTMLElement|Event} nodeOrEvent [description]
     * @return {void}
     */
    remove: (nodeOrEvent) => {
      const node = nodeOrEvent.constructor.name === 'HTMLDivElement' ?
                   nodeOrEvent : nodeOrEvent.currentTarget

      node.parentNode.removeChild(node)
    }
  }

  class DismissableAlertComponent {
    constructor(node) {
      node.addEventListener('click', this.close)
    }

    close(event) {
      event.preventDefault()

      const alertNode = event.currentTarget.parentNode

      if (alertNode.classList.contains('fade')) {
        alertNode.addEventListener('transitionend', Utils.remove, false)
      } else {
        Utils.remove(alertNode)
      }

      alertNode.classList.remove('in')
    }
  }

  class CollapsableBehavior {
    constructor(node) {
      this._originNode = node
      const targetSelector = node.dataset.target ? node.dataset.target : node.hash
      this._targetNode = document.querySelector(targetSelector)

      node.addEventListener('click', (event) => { this.toggle(event) })
    }

    /**
     * Set an element to its the potential maximum height
     *
     * @see http://stackoverflow.com/a/3485654/2736233
     *
     * @param  {HTMLElement} node DOM element
     * @return {void}
     */
    _setMaxHeight(node) {
      const currentHeight = node.style.height
      node.style.height = 'auto'
      const maxHeight = getComputedStyle(node).height

      // Force re-paint
      // @see http://stackoverflow.com/a/3485654/2736233
      node.style.height = currentHeight
      this._targetNode.offsetHeight // jshint ignore:line

      node.style.height = maxHeight
    }

    toggle(event) {
      event.preventDefault()

      if (this._targetNode.classList.contains('in')) {
        this.hide()
      } else {
        this.show()
      }
    }

    show() {
      this._targetNode.addEventListener('transitionend', () => {
        this.complete(false)
      })

      this._originNode.setAttribute('aria-expanded', true)
      this._targetNode.classList.remove('collapse')
      this._targetNode.classList.add('collapsing')
      this._targetNode.style.height = '1px'
      this._setMaxHeight(this._targetNode)
      this._targetNode.setAttribute('aria-expanded', true)
    }

    hide() {
      this._targetNode.addEventListener('transitionend', () => {
        this.complete(true)
      }, false)

      this._originNode.setAttribute('aria-expanded', false)
      this._originNode.classList.remove('collapse')
      this._targetNode.classList.add('collapsing')

      // Force re-paint
      // @see http://stackoverflow.com/a/3485654/2736233
      this._targetNode.style.height = getComputedStyle(this._targetNode).height
      this._targetNode.offsetHeight // jshint ignore:line

      this._targetNode.style.height = '1px'
      this._targetNode.setAttribute('aria-expanded', false)
    }

    complete(isHiding) {
      this._targetNode.classList.remove('collapsing')
      this._targetNode.classList.add('collapse')
      this._targetNode.style.height = 'auto'

      if (!isHiding) {
        this._targetNode.classList.add('in')
      } else {
        this._targetNode.classList.remove('in')
      }
    }
  }

  class DropDownMenuComponent {
    constructor(node) {
      node.addEventListener('click', this.open)
      node.addEventListener('blur', this.close)
    }

    open(event) {
      event.preventDefault()
      event.currentTarget.parentElement.classList.toggle('open')
    }

    close(event) {
      event.preventDefault()
      event.currentTarget.parentElement.classList.remove('open')

      // Trigger the click event on the target if it not opening another menu
      if (event.relatedTarget && event.relatedTarget.getAttribute('data-toggle') !== 'dropdown') {
        event.relatedTarget.click()
      }
    }
  }

  class ModalComponent {
    constructor(modalOpenButtonNode) {
      this._isFirstTime = true
      this._bodyNode = document.querySelector('body')
      this._modalWindowNode = document.querySelector(modalOpenButtonNode.dataset.target)

      modalOpenButtonNode.addEventListener('click', this.open.bind(this))
    }

    open(event) {
      event.preventDefault()

      // We create and insert the background
      this._modalBackdropNode = document.createElement('div')
      this._modalBackdropNode.classList.add('modal-backdrop', 'fade', 'in')
      this._bodyNode.appendChild(this._modalBackdropNode)

      // We prepare the body
      this._bodyNode.classList.add('modal-open')
      this._bodyNode.style.paddingRight = '17px'

      // We show the modal
      this._modalWindowNode.classList.add('in')
      this._modalWindowNode.style.display = 'block'

      if (this._isFirstTime) {
        this._isFirstTime = false

        // We attach the close event to the dismiss buttons
        const modalCloseButtonNodes = document.querySelectorAll('[data-dismiss="modal"]')
        for (let modalCloseButtonNode of modalCloseButtonNodes) {
          modalCloseButtonNode.addEventListener('click', this.close.bind(this))
        }
      }
    }

    close(event) {
      event.preventDefault()

      this._bodyNode.classList.remove('modal-open')
      this._bodyNode.style.paddingRight = null
      this._modalWindowNode.classList.remove('in')
      this._modalWindowNode.style.display = 'none'

      Utils.remove(this._modalBackdropNode)
    }
  }

  const alertNodes = document.querySelectorAll('[data-dismiss="alert"]')
  for (let alertNode of alertNodes) {
    new DismissableAlertComponent(alertNode)
  }

  const collapsableNodes = document.querySelectorAll('[data-toggle="collapse"]')
  for (let collapsableNode of collapsableNodes) {
    new CollapsableBehavior(collapsableNode)
  }

  const dropDownNodes = document.querySelectorAll('[data-toggle="dropdown"]')
  for (let dropDownNode of dropDownNodes) {
    new DropDownMenuComponent(dropDownNode)
  }

  const modalOpenButtonNodes = document.querySelectorAll('[data-toggle="modal"]')
  for (let modalOpenButtonNode of modalOpenButtonNodes) {
    new ModalComponent(modalOpenButtonNode)
  }
})(window, window.document)
