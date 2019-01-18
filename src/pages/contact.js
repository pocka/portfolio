import('../components/my-balloons-container')

export const render = container => {
  const c = document.createElement('my-balloons-container')

  container.appendChild(c)

  const balloons = document.createElement('my-balloons')

  balloons.setAttribute(
    'texts',
    JSON.stringify([
      'If you have any questions,<br/>please email to <a href="mailto:pockawoooh@gmail.com" target="_blank" rel="noopener">pockawoooh@gmail.com</a>'
    ])
  )

  c.appendChild(balloons)
}

export const description = 'How to contact'
