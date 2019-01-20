import '~/components/my-explainer'

import jsSVG from './js.svg'
import reactSVG from './react.svg'
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
