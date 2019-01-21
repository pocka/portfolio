import css from './style.scss'

class MyWorks extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    shadow.innerHTML = `
      <style>${css}</style>
      <slot></slot>
    `
  }
}

if (!customElements.get('my-works')) {
  customElements.define('my-works', MyWorks)
}
