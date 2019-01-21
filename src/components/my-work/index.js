import css from './style.scss'

class MyWork extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'href']
  }

  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    shadow.innerHTML = `
      <style>${css}</style>

      <slot></slot>

      <div class="texts">
        <p class="title"></p>
        <a class="link" target="_blank" rel="noopener"></a>
      </div>
    `

    this.titleNode = shadow.querySelector('.title')
    this.linkNode = shadow.querySelector('.link')
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'name': {
        this.titleNode.textContent = newValue
        return
      }
      case 'href': {
        this.linkNode.textContent = newValue
        this.linkNode.setAttribute('href', newValue)
        return
      }
    }
  }
}

if (!customElements.get('my-work')) {
  customElements.define('my-work', MyWork)
}
