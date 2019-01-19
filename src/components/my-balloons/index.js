import css from './style.scss'

class MyBalloons extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    shadow.innerHTML = `
      <style>${css}</style>
      <slot/>
    `
  }
}

customElements.define('my-balloons', MyBalloons)
