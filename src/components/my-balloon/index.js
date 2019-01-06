import css from './style.scss'

/**
 * Balloon component.
 */
class MyBalloon extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    shadow.innerHTML = `
      <style>${css}</style>
      <div class="tail-left"></div>
      <div class="tail-right"></div>
      <slot/>
    `
  }
}

customElements.define('my-balloon', MyBalloon)
