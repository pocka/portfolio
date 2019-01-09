import css from '../balloons-scene.scss'

class SceneContact extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    const style = document.createElement('style')

    style.textContent = css

    shadow.appendChild(style)

    const balloons = document.createElement('my-balloons')

    balloons.setAttribute(
      'texts',
      JSON.stringify([
        'If you have any questions,<br/>please email to <a href="mailto:pockawoooh@gmail.com" target="_blank" rel="noopener">pockawoooh@gmail.com</a>'
      ])
    )

    shadow.appendChild(balloons)
  }
}

customElements.define('scene-contact', SceneContact)
