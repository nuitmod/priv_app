import { html, Component, render } from 'https://unpkg.com/htm/preact/index.mjs?module';
import imob from "./mobx_store.js";
import { useState, useReducer, useContext, useCallback} from "../modules/preact_hooks.module.js";
import { observer } from '../modules/mobx_preact.module.js';
import { get, set, values } from '../modules/mobx.module.js';
import  * as $ from "https://unpkg.com/jquery@3.3.1/dist/jquery.min.js";

var temp_store={
  name: ''
}

var handle_change=e=>{
  temp_store.name=e.target.value
}

var handle_submit=e=>{
  e.preventDefault();
  temp_store.name != '' ? add_w(temp_store) : null //alert("Input value of name")
}

var add_w=wm=>{                //wm=new temp_store
    wm.id=Math.random();
    imob.data.push(wm);
    wm.name = '';
}

var Uu = function(){
  var wm_list=imob.data.map(wm=>{ return html`
    <div key=${wm.id}>
      <div onclick=${()=>imob.del_w(wm.id)}>name: ${ wm.name} </div>
   </div>`
  })
return html`
  <div>
    <h6>mobx store ${imob.inf}</h6>
    <input type="button" value="change" onclick=${imob.ch_store} />
    <h6>${wm_list}</h6>
    <form onsubmit=${handle_submit}>
      <label htmlfor="name">name</label>
      <input type="text" id="name" onchange=${handle_change} value=${temp_store.name} />
      <button>submit</button>
    </form>
  </div>`
}

export default observer(Uu);
