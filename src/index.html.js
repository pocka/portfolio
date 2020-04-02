const fs = require('fs').promises
const path = require('path')

const { html, unsafePrefixString } = require('@popeindustries/lit-html-server')
const marked = require('marked')
const postcss = require('postcss')
const postcssrc = require('postcss-load-config')

const pkg = require('../package.json')

async function Html() {
  return html`
    <!DOCTYPE html>
    <html lang="en-US">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${pkg.name}</title>
        <meta name="description" content="${pkg.description}" />
        <link rel="shortcut icon" href="/favicon.png" />
        ${await SiteStyle()}
      </head>
      <body>
        <header>
          <nav>
            <span>pocka.me</span>
            <ul>
              <li>
                <a href="#profile">Profile</a>
              </li>
              <li>
                <a href="#skills">Skills</a>
              </li>
              <li>
                <a href="#works">Works</a>
              </li>
              <li>
                <a href="https://github.com/pocka/portfolio">GitHub</a>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          ${await Markdown()}
        </main>
        <footer>
          <hr />
          <p>&copy; 2020 Shota Fuji</p>
        </footer>
      </body>
    </html>
  `
}

module.exports = Html

async function SiteStyle() {
  const sourcePath = path.resolve(__dirname, './global.css')
  const source = await fs.readFile(sourcePath, 'utf-8')

  const { css } = await postcssrc().then(({ plugins, options }) =>
    postcss(plugins).process(source, { ...options, from: sourcePath })
  )

  return html`
    <style>
      ${css}
    </style>
  `
}

async function Markdown() {
  const mdPath = path.resolve(__dirname, './contents.md')
  const renderedHtml = marked(await fs.readFile(mdPath, 'utf-8'))

  return html`
    ${unsafePrefixString + renderedHtml}
  `
}
