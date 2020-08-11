import { html, Component, render } from 'https://unpkg.com/htm/preact/index.mjs?module';
import imob from "./mobx_store.js";
import { useState, useReducer, useContext, useCallback} from "../modules/preact_hooks.module.js";
import { observer } from '../modules/mobx_preact.module.js';
import { get, set, values, toJS } from '../modules/mobx.module.js';
import { autorun } from '../modules/mobx.module.js';
import  * as $ from "https://unpkg.com/jquery@3.3.1/dist/jquery.min.js";
import  * as _ from "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.19/lodash.min.js";
//import { decorate, observable, computed, action } from '../modules/mobx.module.js';

var $$ = window.$;
var __ = window._;

var temp_store={
  name: '',
  job: '',
  checked: false,
  active: true
}

var handle_change_name=e=>{
  temp_store.name=e.target.value
//   [e.target.id]: e.target.value
}

var handle_change_job=e=>{
  temp_store.job=e.target.value
//  console.log(e.target.value);
}

var handle_check=e=>{
  e.preventDefault()
//  let checked=!temp_store.checked
  temp_store.checked=e.target.checked
//  var value = e.target.name === 'checked' ? e.target.checked : e.target.value
//  var name = e.target.name
}

var handle_submit=e=>{
  e.preventDefault();
  temp_store.name != ''/* && temp_store.job != '' */? add_w(temp_store) : alert("Fields must not be empty");
}

var add_w=wm=>{
  console.log(wm);        //wm=new temp_store
  imob.id_del != 0 ? wm.id=Math.random() : wm.id=imob.id_del
  wm.id === 0 ? wm.id=Math.random() : null
  wm.active=false
//  console.log("wm id " + wm.id);
//  imob.data.push(wm);
//  console.log("2 index is " + imob.index);
  imob.index != null ? imob.data.splice(imob.index, 1, wm) : imob.data.push(wm);
  imob.index = null
  wm.name = '';
  wm.job = '';
  del_w(imob.id_del)
//  console.log("id for del " + imob.id_del);
}

var del_w=id=>{
  imob.data=imob.data.filter(wm=>{
    return wm.id != id
  });
  $$('#form_2').show();
//  console.log(imob.data.map(i=>i.name));
//  console.log(id);
  imob.index = null
}


var set_active=w=>{
  imob.data.forEach(wm=>wm.active=false)
  w.active=true;
  console.log("checked " + w.checked);
  imob.id_del=w.id;
//  console.log("id for del " + imob.id_del);
  imob.index = __.findIndex(imob.data, {id: w.id});
  //var _index_dat=imob.data.indexof(w.id); console.log(_index_dat);
  imob.index >= 0 ? console.log("index = " + imob.index) : console.log("less zero");
  //toJS(w).css({background: 'pink'})
  if(imob.data.length != 0){
    $$('#form_2').hide();
//    console.log("sa_s");
  }
}

var clear_temp=()=>{
//  temp_store.name = null
//  temp_store.job = null
}

var Uu = function(){

//console.log("imob length = " + imob.data.length);
  //show wm_list
  var wm_list=imob.data.map(wm=>html`
    <div class="list" key=${wm.id} onclick=${()=>set_active(wm)}>
      <div>name: ${wm.name}  job: ${wm.job} </div>
   </div>`
 )

  var reg_form1=imob.data.filter(wm=>wm.active!=false).map(wm=>html`
     <div>
       <form id="form_1" onsubmit=${handle_submit}>
          <h5>Registration form:</h5>
          <h6>
          <label>name</label>
          <input type="text" id="name" onchange=${handle_change_name} value=${wm.name} /><br />
          <label>job</label>
          <select  id="job" onchange=${handle_change_job} value=${wm.job}>
           <option value="programmer">Programmer</option>
           <option value="security">Security</option>
           <option value="contacter">Contacter</option>
          </select>
          <label>
            <p>is empty:</p>
            <input onchange=${handle_check} type="checkbox" checked=${wm.checked} />
          </label>
          </h6>
          <button type="button" onclick=${handle_submit}>add</button>
          <button type="button" onclick=${()=>del_w(wm.id)}>del</button>
          <button onclick=${imob.save_st}>save</button>
       </form>
      </div>`)

  var reg_form2=html`
     <div>
       <form id="form_2" onsubmit=${handle_submit}>
          <h5>Registration form:</h5>
          <h6>
          <label>name</label>
          <input type="text" id="name" placeholder="name" onchange=${handle_change_name} value=${temp_store.name} /><br />
          <label>job</label>
          <select id="job" placeholder="job" onchange=${handle_change_job} value=${temp_store.job}>
           <option value="programmer">Programmer</option>
           <option value="security">Security</option>
           <option value="contacter">Contacter</option>
          </select>
          <select value=${['Б', 'В']}>a</select>
          <label>
            <p>is empty:</p>
            <input onchange=${handle_check} type="checkbox" checked=${temp_store.checked} />
          </label>
          </h6>
          <button onclick=${handle_submit}>add</button>
          <button class="unactive" onclick=${clear_temp}>del</button>
          <button onclick=${imob.save_st}>save</button>
       </form>
      </div>`

//all data
return html`
  <div class="l_cont">
    <h6>${wm_list}</h6>
  </div>
  <div class="r_cont">
    <p>${reg_form1}</p>
    <p>${reg_form2}</p>
    <button onclick=${imob.save_st}>save</button>
    <button onclick=${imob.back}>back</button>
    <button onclick=${imob.clear_all}>clear_all</button>
    <p>index : ${imob.index}</p>
  </div>`
}


export default observer(Uu);
