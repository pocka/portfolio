import css from './style.scss'

class MyBalloonsContainer extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    const slot = document.createElement('slot')

    shadow.appendChild(slot)

    const style = document.createElement('style')

    style.textContent = css

    shadow.appendChild(style)
  }
}

if (!customElements.get('my-balloons-container')) {
  customElements.define('my-balloons-container', MyBalloonsContainer)
}
