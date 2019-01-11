import css from '../balloons-scene.scss'

class SceneAbout extends HTMLElement {
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
        "I'm a front end developer in Japan.",
        'Since my programming life has started with game dev,<br/>' +
          "I'm good at writing logical and performant code.",
        'Less knowledge and experience at designing UI, but more at UX.'
      ])
    )

    shadow.appendChild(balloons)
  }
}

if (!customElements.get('scene-about')) {
  customElements.define('scene-about', SceneAbout)
}
