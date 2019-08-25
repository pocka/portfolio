import css from './style.scss'

import { getPosition } from './math'

class MeCircle extends HTMLElement {
  private slotsCount = 0
  private navigatable = true

  private labels: HTMLElement
  private labelSlot: HTMLSlotElement
  private iconContainer: HTMLElement
  private iconSlot: HTMLSlotElement

  private prev: HTMLElement
  private next: HTMLElement

  private get current() {
    const labels = this.labelSlot.assignedNodes() as HTMLElement[]

    const value = this.getAttribute('value')

    return Math.max(labels.findIndex(label => label.dataset.value === value), 0)
  }

  static get observedAttributes() {
    return ['value']
  }

  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    shadow.innerHTML = `
      <style>${css}</style>

      <div class="selector">
        <div class="icons">
          <slot class="icon" name="icon"/>
        </div>

        <div class="control">
          <a role="button" class="prev" aria-label="Prev item">
            <i class="arrow-prev"></i>
          </a>
          <div class="labels-wrapper">
            <div class="labels">
              <slot class="label" name="label"/>
            </div>
          </div>
          <a class="next" role="button" aria-label="Next item">
            <i class="arrow-next"></i>
          </a>
        </div>
      </div>
    `

    this.labels = shadow.querySelector('.labels') as HTMLElement
    this.iconContainer = shadow.querySelector('.icons') as HTMLElement

    this.labelSlot = shadow.querySelector(
      'slot[name="label"]'
    ) as HTMLSlotElement
    this.iconSlot = shadow.querySelector('slot[name="icon"]') as HTMLSlotElement

    this.prev = shadow.querySelector('.prev') as HTMLElement
    this.next = shadow.querySelector('.next') as HTMLElement
  }

  connectedCallback() {
    this.setup()
  }

  disconnectedCallback() {
    this.cleanup()
  }

  attributeChangedCallback() {
    this.updateStyle()
  }

  private setup = () => {
    this.cleanup()

    this.slotsCount = Math.min(
      ...Array.from(this.shadowRoot!.querySelectorAll('slot')).map(
        slot => slot.assignedNodes().length
      )
    )

    const icons = this.iconSlot.assignedNodes() as HTMLElement[]

    for (let i = 0, l = icons.length; i < l; i++) {
      icons[i].dataset.index = i.toString(10)
      icons[i].addEventListener('click', this.onClickIcon)
    }

    this.iconSlot.addEventListener('slotchange', this.setup)

    this.prev.addEventListener('click', this.decrement)
    this.next.addEventListener('click', this.increment)

    this.updateStyle()
  }

  private cleanup = () => {
    const icons = this.iconSlot.assignedNodes() as HTMLElement[]

    for (let i = 0, l = icons.length; i < l; i++) {
      delete icons[i].dataset.index
      icons[i].removeEventListener('click', this.onClickIcon)
    }

    this.iconSlot.removeEventListener('slotchange', this.setup)

    this.prev.removeEventListener('click', this.decrement)
    this.next.removeEventListener('click', this.increment)
  }

  private emitChange = (index: number) => {
    const selected = (this.labelSlot.assignedNodes() as HTMLElement[])[index]

    if (!selected) {
      return
    }

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          value: selected.dataset.value
        }
      })
    )
  }

  /**
   * Increment index.
   */
  private increment = () => {
    if (!this.navigatable) {
      return
    }

    this.updateStyle()
    this.emitChange(this.current >= this.slotsCount - 1 ? 0 : this.current + 1)
  }

  /**
   * Decrement index.
   */
  private decrement = () => {
    if (!this.navigatable) {
      return
    }

    this.updateStyle()
    this.emitChange(this.current <= 0 ? this.slotsCount - 1 : this.current - 1)
  }

  private onClickIcon = (ev: Event) => {
    ev.preventDefault()
    ev.stopPropagation()

    const index = parseInt((ev.currentTarget as HTMLElement).dataset.index!, 10)

    if (this.current === index || !this.navigatable) {
      return
    }

    this.updateStyle()
    this.emitChange(index)
  }

  updateStyle() {
    // ------------------------------
    // Set icon rotation

    const icons = [...this.iconSlot.assignedNodes()] as HTMLElement[]

    // Avoid zero divide by setting 1
    const iconCounts = icons.length || 1

    // Degree interval of each icons
    const interval = 360 / iconCounts

    // Assume every icons have same size
    const iconSize = icons[0] ? icons[0].getBoundingClientRect().width : 0

    // Since transform applies based on element's center,
    // we need remove half of icon size from radius
    const radius =
      this.iconContainer.getBoundingClientRect().width / 2 - iconSize / 2

    icons.forEach((icon, i) => {
      const index =
        i - this.current < 0
          ? iconCounts + (i - this.current)
          : i - this.current

      // Add 90deg because position starts with [1, 0]
      const [x, y] = getPosition(radius, interval * index + 90)

      icon.style.transform = `translate(${-x}px, ${y}px)`

      if (index === 0) {
        icon.classList.add('active')
      } else {
        icon.classList.remove('active')
      }
    })

    // ------------------------------
    // Set label viewport

    this.labels.style.transform = `translateX(${this.current * -100}%)`
  }
}

if (!customElements.get('me-circle')) {
  customElements.define('me-circle', MeCircle)
}
