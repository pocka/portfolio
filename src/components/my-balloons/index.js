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

    const els = texts.map((t, i) => {
      const wrapper = document.createElement('div')
      wrapper.classList.add('balloon-wrapper')

      const el = document.createElement('my-balloon')

      el.innerHTML = t

      wrapper.appendChild(el)

      if (i % 2 !== 0) {
        wrapper.classList.add('right')
        el.setAttribute('pop-direction', 'right')
      }

      return wrapper
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
