import '~/components/my-works'
import '~/components/my-work'

import logPockaIoLogo from './log-pocka-io.svg'
import saviLogo from './storybook-addon-vue-info.png'

export const render = container => {
  container.innerHTML = `
    <my-works>
      <my-work name="log.pocka.io" href="https://log.pocka.io/">
        ${logPockaIoLogo}
      </my-work>
      <my-work name="storybook-addon-vue-info" href="https://github.com/pocka/storybook-addon-vue-info">
        <img src="${saviLogo}">
      </my-work>
    </my-works>
  `
}

export const description = 'My works'
