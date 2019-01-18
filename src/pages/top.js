import('../components/my-balloons-container')

export const render = container => {
  container.innerHTML = `
    <my-balloons-container>
      <my-balloons>
        <my-balloon>Hi, I'm pocka.</my-balloon>
      </my-balloons>
    </my-balloons-container>
  `
}

export const description = null
