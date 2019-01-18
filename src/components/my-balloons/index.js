import css from './style.scss'

class MyBalloons extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    const style = document.createElement('style')

    style.textContent = css

    shadow.appendChild(style)

    const slot = document.createElement('slot')

    shadow.appendChild(slot)
  }
}

customElements.define('my-balloons', MyBalloons)
