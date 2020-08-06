import { html, Component, render } from 'https://unpkg.com/htm/preact/index.mjs?module';
import imob from "./mobx_store.js";
import { useState, useReducer, useContext, useCallback} from "../modules/preact_hooks.module.js";
import { observer } from '../modules/mobx_preact.module.js';
import { get, set, values } from '../modules/mobx.module.js';
import  * as $ from "https://unpkg.com/jquery@3.3.1/dist/jquery.min.js";
import  * as _ from "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.19/lodash.min.js";


var $$ = window.$;
var __ = window._;
var arr=[1,2,3,4,5];
console.log(__.head(arr));
//document.querySelector("body").onload = function() {console.log(_i.head(arr))}


var temp_store={
  name: '',
  job: '',
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

var handle_submit=e=>{
  e.preventDefault();
  if(temp_store.name != '' && temp_store.job != ''){
    add_w(temp_store)
  }else{
    alert("Fields name and job must be input")
  }
}

var add_w=wm=>{
  console.log(wm);          //wm=new temp_store
    wm.id=Math.random();
    wm.active=false
//    if()
    imob.data.push(wm);
    wm.name = '';
    wm.job = '';
}

var del_w=id=>{
  imob.data=imob.data.filter(wm=>{
    return wm.id != id
  });
  $$('#form_2').show();
  console.log(imob.data.map(i=>i.name));
}

var set_active=w=>{
  imob.data.forEach(wm=>wm.active=false)
  w.active=true;
  console.log(w.active);
  console.log(w.id);

  if(imob.data.length != 0){
    $$('#form_2').hide();
    console.log("sa_s");
  }
}

var clear_temp=()=>{
//  temp_store.name = null
//  temp_store.job = null
}

var header_div=html`
  <div class="header">
  </div>
`
var footer_div=html`
  <div class="footer">
  </div>
`

var Uu = function(){

    console.log("imob length = " + imob.data.length);
  //show wm_list
  var wm_list=imob.data.map(wm=>html`
    <div class="list" key=${wm.id} onclick=${()=>set_active(wm)}>
      <div>name: ${wm.name} </div>
      <div>job: ${wm.job} </div>
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
          <input type="text" id="job" onchange=${handle_change_job} value=${wm.job} />
          </h6>
          <button onclick=${handle_submit}>add</button>
          <input type="button" value="del" onclick=${()=>del_w(wm.id)} />
       </form>
      </div>`)

  var reg_form2=html`
     <div>
       <form id="form_2" onsubmit=${handle_submit}>
          <h5>Registration form 2:</h5>
          <h6>
          <label>name</label>
          <input type="text" id="name" placeholder="input name" onchange=${handle_change_name} value=${temp_store.name} /><br />
          <label>job</label>
          <input type="text" id="job" placeholder="input job" onchange=${handle_change_job} value=${temp_store.job} />
          </h6>
          <input type="button" value="add" onclick=${handle_submit}/>
          <input type="button" value="del" onclick=${clear_temp} />
       </form>
      </div>`

//all data
return html`
  ${header_div}
  <div class="l_cont">
    <h6>${wm_list}</h6>
  </div>
  <div class="r_cont">
    <p>${reg_form1}</p>
    <p>${reg_form2}</p>
  </div>
  ${footer_div}`
}


export default observer(Uu);
