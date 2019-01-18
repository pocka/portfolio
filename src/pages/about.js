import('../components/my-balloons-container')

export const render = container => {
  container.innerHTML = `
    <my-balloons-container>
      <my-balloons>
        <my-balloon>I'm a front end developer in Japan.</my-balloon>
        <my-balloon pop-direction="right">
          Since my programming life has started with game dev,<br/>
          I'm good at writing logical and performant code.
        </my-balloon>
        <my-balloon>
          Less knowledge and experience at designing UI, but more at UX.
        </my-balloon>
      </my-balloons>
    </my-balloons-container>
  `
}

export const description = 'About me'
