import { html, Component, render } from 'https://unpkg.com/htm/preact/index.mjs?module';
import Uu from './components/p_app.js';

function App(){ return html`
  <div class=app>
    <${Uu} />
  </div>`
}

render(App(), document.getElementById("root"))
