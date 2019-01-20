import css from './style.scss'

import { getPosition } from './math'

class MyExplainer extends HTMLElement {
  constructor() {
    super()

    this.slotCount = {
      icon: 0,
      label: 0,
      main: 0,
      min: 0
    }

    this.current = 0
    this.navigatable = true

    const shadow = this.attachShadow({ mode: 'open' })

    shadow.innerHTML = `
      <style>${css}</style>

      <div class="selector">
        <div class="icons">
          <slot class="icon" name="icon"/>
        </div>

        <div class="control">
          <a role="button" class="prev"></a>
          <div class="labels-wrapper">
            <div class="labels">
              <slot class="label" name="label"/>
            </div>
          </div>
          <a role="button" class="next"></a>
        </div>
      </div>

      <slot/>
    `
    ;[...shadow.querySelectorAll('slot')].forEach(slot => {
      slot.addEventListener('slotchange', ev => {
        this.slotCount[
          slot.getAttribute('name') || 'main'
        ] = slot.assignedNodes().length
        this.updateSlotsCount()
      })
    })

    this.labels = shadow.querySelector('.labels')
    this.balloons = shadow.querySelector('slot:not([name])')
    this.icons = shadow.querySelector('slot[name="icon"]')
    this.iconContainer = shadow.querySelector('.icons')

    shadow.querySelector('.prev').addEventListener('click', () => {
      this.decrement()
    })

    shadow.querySelector('.next').addEventListener('click', () => {
      this.increment()
    })

    this.updateStyle()
  }

  /**
   * Increment index.
   */
  increment() {
    if (!this.navigatable) {
      return
    }

    this.current = this.current >= this.slotCount.min - 1 ? 0 : this.current + 1
    this.updateStyle()
  }

  /**
   * Decrement index.
   */
  decrement() {
    if (!this.navigatable) {
      return
    }

    this.current = this.current <= 0 ? this.slotCount.min - 1 : this.current - 1
    this.updateStyle()
  }

  updateSlotsCount() {
    this.slotCount.min = Math.min(
      this.slotCount.icon,
      this.slotCount.label,
      this.slotCount.main
    )
  }

  updateStyle() {
    // ------------------------------
    // Set icon rotation

    const icons = [...this.icons.assignedNodes()]

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
        i - this.current <= 0
          ? iconCounts + (i - this.current)
          : i - this.current

      // Add 90deg because position starts with [1, 0]
      const [x, y] = getPosition(radius, interval * index + 90)

      icon.style.transform = `translate(${x}px, ${y}px)`
    })

    // ------------------------------
    // Set label viewport

    this.labels.style.transform = `translateX(${this.current * -100}%)`

    // ------------------------------
    // Set whether balloon is visible

    const balloons = [...this.balloons.assignedNodes()]

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

      prevBalloon.style.opacity = 0

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
