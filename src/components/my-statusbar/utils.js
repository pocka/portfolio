export const createIconLink = (svg, href) => {
  const el = document.createElement('a')

  el.classList.add('icon-link')
  el.setAttribute('href', href)
  el.innerHTML = svg
  el.setAttribute('target', '_blank')
  el.setAttribute('rel', 'noopener')

  return el
}
