import { html, Component, render } from 'https://unpkg.com/htm/preact/index.mjs?module';
import imob from "./mobx_store.js";
import { useState, useReducer, useContext, useCallback} from "../modules/preact_hooks.module.js";
import { observer } from '../modules/mobx_preact.module.js';
import { get, set, values } from '../modules/mobx.module.js';
import  * as $ from "https://unpkg.com/jquery@3.3.1/dist/jquery.min.js";



var temp_store={
  name: '',
  job: ''
}

var handle_change_name=e=>{
  temp_store.name=e.target.value
//   [e.target.id]: e.target.value
}

var handle_change_job=e=>{
  temp_store.job=e.target.value
  console.log(e.target.value);
}

var handle_submit=e=>{
  e.preventDefault();
  if(temp_store.name != '' && temp_store.job != ''){
    add_w(temp_store)
  }
}

var add_w=wm=>{
  console.log(wm);          //wm=new temp_store
    wm.id=Math.random();
    imob.data.push(wm);
    wm.name = '';
    wm.job = '';
}

var Uu = function(){
  var wm_list=imob.data.map(wm=>{ return html`
    <div class="list" key=${wm.id} onclick=${()=>imob.del_w(wm.id)}>
      <div>name: ${ wm.name} </div>
      <div>job: ${ wm.job} </div>
   </div>`
  })
return html`
  <div class="form">
    <h6>mobx store ${imob.inf}</h6>
    <input type="button" value="change" onclick=${imob.ch_store} />
    <h6>${wm_list}</h6>
    <form onsubmit=${handle_submit}>
      <h5>Registration form:</h5>
      <h6>
      <label>name</label>
      <input type="text" id="name" onchange=${handle_change_name} value=${temp_store.name} /><br />
      <label>job</label>
      <input type="text" id="job" onchange=${handle_change_job} value=${temp_store.job} />
      </h6>
      <input type="button" value="add" onclick=${handle_submit}/>
      <input type="button" value="del" />
    </form>
  </div>`
}

export default observer(Uu);
