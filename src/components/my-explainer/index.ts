import css from './style.scss'

import { getPosition } from './math'

class MyExplainer extends HTMLElement {
  private slotsCount = 0
  private current = 0
  private navigatable = true

  private labels: HTMLElement
  private iconContainer: HTMLElement
  private balloons: HTMLSlotElement
  private iconSlot: HTMLSlotElement

  private prev: HTMLElement
  private next: HTMLElement

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
          <a role="button" class="prev" aria-label="Prev item"></a>
          <div class="labels-wrapper">
            <div class="labels">
              <slot class="label" name="label"/>
            </div>
          </div>
          <a role="button" class="next" aria-label="Next item"></a>
        </div>
      </div>

      <slot/>
    `

    this.labels = shadow.querySelector('.labels') as HTMLElement
    this.balloons = shadow.querySelector('slot:not([name])') as HTMLSlotElement
    this.iconContainer = shadow.querySelector('.icons') as HTMLElement

    this.iconSlot = shadow.querySelector('slot[name="icon"]') as HTMLSlotElement

    this.prev = shadow.querySelector('.prev') as HTMLElement
    this.next = shadow.querySelector('.next') as HTMLElement
  }

  connectedCallback() {
    this.slotsCount = Math.min(
      ...[...this.shadowRoot!.querySelectorAll('slot')].map(
        slot => slot.assignedNodes().length
      )
    )

    const icons = this.iconSlot.assignedNodes() as HTMLElement[]

    for (let i = 0, l = icons.length; i < l; i++) {
      icons[i].dataset.index = i.toString(10)
      icons[i].addEventListener('click', this.onClickIcon)
    }

    this.prev.addEventListener('click', this.decrement)
    this.next.addEventListener('click', this.increment)

    this.updateStyle()
  }

  disconnectedCallback() {
    const icons = this.iconSlot.assignedNodes() as HTMLElement[]

    for (let i = 0, l = icons.length; i < l; i++) {
      delete icons[i].dataset.index
      icons[i].removeEventListener('click', this.onClickIcon)
    }

    this.prev.removeEventListener('click', this.decrement)
    this.next.removeEventListener('click', this.increment)
  }

  /**
   * Increment index.
   */
  private increment = () => {
    if (!this.navigatable) {
      return
    }

    this.current = this.current >= this.slotsCount - 1 ? 0 : this.current + 1
    this.updateStyle()
  }

  /**
   * Decrement index.
   */
  private decrement = () => {
    if (!this.navigatable) {
      return
    }

    this.current = this.current <= 0 ? this.slotsCount - 1 : this.current - 1
    this.updateStyle()
  }

  private onClickIcon = (ev: Event) => {
    const index = parseInt((ev.currentTarget as HTMLElement).dataset.index!, 10)

    if (this.current === index || !this.navigatable) {
      return
    }

    this.current = index
    this.updateStyle()
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

    // ------------------------------
    // Set whether balloon is visible

    const balloons = [...this.balloons.assignedNodes()] as HTMLElement[]

    const nextBalloon = balloons.filter((_, i) => i === this.current)[0]
    const prevBalloon = balloons.filter(el =>
      el.classList.contains('active-balloons')
    )[0]

    if (prevBalloon) {
      const hideBalloon = () => {
        prevBalloon.classList.remove('active-balloons')
        prevBalloon.style.opacity = null

        nextBalloon.classList.add('active-balloons')

        prevBalloon.removeEventListener('transitionend', hideBalloon)

        this.navigatable = true
      }

      prevBalloon.style.opacity = '0'

      this.navigatable = false
      prevBalloon.addEventListener('transitionend', hideBalloon)
    } else {
      nextBalloon.classList.add('active-balloons')
    }
  }
}

if (!customElements.get('my-explainer')) {
  customElements.define('my-explainer', MyExplainer)
}
