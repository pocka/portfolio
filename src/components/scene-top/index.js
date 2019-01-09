import css from '../balloons-scene.scss'

class SceneTop extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    const style = document.createElement('style')

    style.textContent = css

    shadow.appendChild(style)

    const balloons = document.createElement('my-balloons')

    balloons.setAttribute('texts', JSON.stringify(['Hi, I\'m pocka']))

    shadow.appendChild(balloons)
  }
}

customElements.define('scene-top', SceneTop)
