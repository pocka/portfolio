import('../components/my-balloons-container')

export const render = container => {
  container.innerHTML = `
    <my-balloons-container>
      <my-balloons>
        <my-balloon>Are you lost?</my-balloon>
      </my-balloons>
    </my-balloons-container>
  `
}

export const description = null
