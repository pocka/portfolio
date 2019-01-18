import('../components/my-balloons-container')

export const render = container => {
  const c = document.createElement('my-balloons-container')

  container.appendChild(c)

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

  c.appendChild(balloons)
}

export const description = 'About me'
