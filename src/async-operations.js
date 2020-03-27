requestAnimationFrame(() => {
  // ---
  // Load web fonts
  const link = document.createElement('link')

  link.rel = 'stylesheet'
  link.href = 'https://rsms.me/inter/inter.css'

  const head = document.querySelector('head')

  head.appendChild(link)
})
