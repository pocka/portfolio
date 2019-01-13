export const createIconLink = (svg, href, label) => {
  const el = document.createElement('a')

  el.classList.add('icon-link')
  el.setAttribute('href', href)
  el.innerHTML = svg
  el.setAttribute('target', '_blank')
  el.setAttribute('rel', 'noopener')
  el.setAttribute('title', label)

  return el
}
