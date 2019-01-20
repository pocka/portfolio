import('~/components/my-explainer')

export const render = container => {
  container.innerHTML = `
    <my-container>
      <my-explainer>
        <span slot="icon">1</span>
        <span slot="label">label1</span>
        <my-balloons>
          <my-balloon>
            foo1
          </my-balloon>
          <my-balloon pop-direction="right">
            bar1
          </my-balloon>
        </my-balloons>
        <span slot="icon">2</span>
        <span slot="label">label2</span>
        <my-balloons>
          <my-balloon>
            foo2
          </my-balloon>
        </my-balloons>
        <span slot="icon">3</span>
        <span slot="label">label3</span>
        <my-balloons>
          <my-balloon>
            foo3
          </my-balloon>
        </my-balloons>
        <span slot="icon">4</span>
        <span slot="label">label4</span>
        <my-balloons>
          <my-balloon>
            foo4
          </my-balloon>
        </my-balloons>
        <span slot="icon">5</span>
        <span slot="label">label5</span>
        <my-balloons>
          <my-balloon>
            foo5
          </my-balloon>
        </my-balloons>
        <span slot="icon">6</span>
        <span slot="label">label6</span>
        <my-balloons>
          <my-balloon>
            foo6
          </my-balloon>
        </my-balloons>
        <span slot="icon">7</span>
        <span slot="label">label7</span>
        <my-balloons>
          <my-balloon>
            foo7
          </my-balloon>
        </my-balloons>
      </my-explainer>
    </my-container>
  `
}

export const description = 'My skills'
