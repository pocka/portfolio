import('../components/my-balloons-container')

export const render = container => {
  container.innerHTML = `
    <my-balloons-container>
      <my-balloons>
        <my-balloon>
          If you have any questions,<br/>
          please email to
          <a href="mailto:pockawoooh@gmail.com" target="_blank" rel="noopener">
            pockawoooh@gmail.com
          </a>
        </my-balloon>
      </my-balloons>
    </my-balloons-container>
  `
}

export const description = 'How to contact'
