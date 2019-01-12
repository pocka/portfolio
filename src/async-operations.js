requestAnimationFrame(() => {
  const link = document.createElement('link')

  link.rel = 'stylesheet'
  link.href = 'https://fonts.googleapis.com/css?family=Passero+One|Roboto'

  const head = document.querySelector('head')

  head.appendChild(link)
})
