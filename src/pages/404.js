import('../components/my-balloons-container')

export const render = container => {
  const c = document.createElement('my-balloons-container')

  container.appendChild(c)

  const balloons = document.createElement('my-balloons')

  balloons.setAttribute('texts', JSON.stringify(['Are you lost?']))

  c.appendChild(balloons)
}

export const description = null
