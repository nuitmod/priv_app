import { html, Component, render } from 'https://unpkg.com/htm/preact/index.mjs?module';
import Uu from './components/p_app.js';
import { header_div, footer_div } from './components/borders.js'

function App(){ return html`
  <div class=app>
    <${header_div} />
    <${Uu} />
    <${footer_div} />
  </div>`
}

render(App(), document.getElementById("root"))
