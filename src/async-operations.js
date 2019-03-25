requestAnimationFrame(() => {
  // ---
  // Load web fonts
  const link = document.createElement('link')

  link.rel = 'stylesheet'
  link.href = 'https://fonts.googleapis.com/css?family=Passero+One|Roboto'

  const head = document.querySelector('head')

  head.appendChild(link)

  if (process.env.GOOGLE_ANALYTICS_TRACKING_ID) {
    // ---
    // Load gtag script
    const script = document.createElement('script')

    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${
      process.env.GOOGLE_ANALYTICS_TRACKING_ID
    }`

    head.appendChild(script)

    // Setup dataLayer
    window.dataLayer = window.dataLayer || []

    function gtag() {
      window.dataLayer.push(arguments)
    }

    gtag('js', new Date())
    gtag('config', process.env.GOOGLE_ANALYTICS_TRACKING_ID)

    window.addEventListener('popstate', () => {
      gtag('config', process.env.GOOGLE_ANALYTICS_TRACKING_ID, {
        page_path: location.pathname
      })
    })
  }
})
