import css from './style.scss'

class MyContainer extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    shadow.innerHTML = `
      <style>${css}</style>
      <slot/>
    `
  }
}

customElements.define('my-container', MyContainer)
