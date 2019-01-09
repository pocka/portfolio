import css from './style.scss'

class MyBalloons extends HTMLElement {
  static get observedAttributes() {
    return ['texts']
  }

  constructor() {
    super()

    this.shadow = this.attachShadow({ mode: 'open' })

    const style = document.createElement('style')

    style.textContent = css

    this.shadow.appendChild(style)
  }

  renderBalloons(json) {
    if (this.clearBalloons) {
      this.clearBalloons()
    }

    const texts = JSON.parse(json)

    if (!(texts instanceof Array)) {
      throw new Error('texts must be an array')
    }

    const els = texts.map(t => {
      const el = document.createElement('my-balloon')

      el.textContent = t

      return el
    })

    this.clearBalloons = () => {
      els.forEach(el => {
        this.shadow.removeChild(el)
      })
    }

    els.forEach(el => {
      this.shadow.appendChild(el)
    })
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name !== 'texts' || oldValue === newValue) {
      return
    }

    this.renderBalloons(newValue)
  }
}

customElements.define('my-balloons', MyBalloons)
