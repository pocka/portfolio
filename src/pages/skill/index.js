import '~/components/my-explainer'

import jsSVG from './js.svg'
import nuxtSVG from './nuxt.svg'
import reactSVG from './react.svg'
import sassSVG from './sass.svg'
import tsSVG from './ts.svg'
import vueSVG from './vue.svg'
import webComponentsSVG from './web-components.svg'
import webpackSVG from './webpack.svg'

const icon = svg => svg.replace(/^<svg/, '<svg slot="icon"')

export const render = container => {
  container.innerHTML = `
    <my-container>
      <my-explainer>
        ${icon(jsSVG)}
        <span slot="label">Javascript</span>
        <my-balloons>
          <my-balloon>
            My main programming language, best friend.
          </my-balloon>
          <my-balloon pop-direction="right">
            Writes ES2015+ with Babel,<br/>
            Formats code with Prettier.
          </my-balloon>
          <my-balloon>
            Tends to write in functional style.
          </my-balloon>
        </my-balloons>
        ${icon(tsSVG)}
        <span slot="label">TypeScript</span>
        <my-balloons>
          <my-balloon>
            Using TypeScript since 2016.
          </my-balloon>
          <my-balloon pop-direction="right">
            Focus on clean type declaration and abstraction.
          </my-balloon>
          <my-balloon>
            My main usages are writing libraries and<br/>
            building complex applications.
          </my-balloon>
        </my-balloons>
        ${icon(reactSVG)}
        <span slot="label">React</span>
        <my-balloons>
          <my-balloon>
            I'm a very fan of React.
          </my-balloon>
          <my-balloon pop-direction="right">
            Uses with Redux when need to build complex applications.
          </my-balloon>
          <my-balloon>
            Writes with React for applications, with Vue.js for simple websites.
          </my-balloon>
        </my-balloons>
        ${icon(vueSVG)}
        <span slot="label">Vue.js</span>
        <my-balloons>
          <my-balloon>
            Have experience since 2017,<br/>
            little deep knowledge than standard developers.
          </my-balloon>
          <my-balloon pop-direction="right">
            Created &nbsp;
            <a href="https://github.com/pocka/storybook-addon-vue-info" target="_blank" rel="noopener">
              Storybook addon for Vue.js
            </a>.
          </my-balloon>
        </my-balloons>
        ${icon(nuxtSVG)}
        <span slot="label">Nuxt.js</span>
        <my-balloons>
          <my-balloon>
            Nuxt.js boosts my application prototype<br/>
            and website creation process.
          </my-balloon>
          <my-balloon pop-direction="right">
            I'm good at building static pages
            using&nbsp;<code>nuxt generate</code><br/>
            with contents management system such as headless CMS<br/>
            or local JSON files.
          </my-balloon>
        </my-balloons>
        ${icon(webComponentsSVG)}
        <span slot="label">Web Components</span>
        <my-balloons>
          <my-balloon>
            I like to be an early adapter.<br/>
            Yes, I have skills for using Web Components.
          </my-balloon>
          <my-balloon pop-direction="right">
            I write articles, especially for this.<br/>
            There are so many outdated or invalid articles/posts,<br/>
            this situation is too bad for everyone, IMO.
          </my-balloon>
        </my-balloons>
        ${icon(sassSVG)}
        <span slot="label">Sass</span>
        <my-balloons>
          <my-balloon>
            My primary styling language.
          </my-balloon>
          <my-balloon pop-direction="right">
            Former ".sass" user, but moved to ".scss"...
          </my-balloon>
          <my-balloon>
            I'm not a fan of&nbsp;<code>node-sass</code>.<br/>
            Let's go with&nbsp;<code>sass</code>&nbsp;package FTW.
          </my-balloon>
        </my-balloons>
        ${icon(webpackSVG)}
        <span slot="label">webpack</span>
        <my-balloons>
          <my-balloon>
            We front-end developers cannot live without webpack, can we?
          </my-balloon>
        </my-balloons>
      </my-explainer>
    </my-container>
  `
}

export const description = 'My skills'
