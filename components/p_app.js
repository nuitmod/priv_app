import { html, Component, render } from 'https://unpkg.com/htm/preact/index.mjs?module';
import imob from "./mobx_store.js";
import { useState, useReducer, useContext, useCallback} from "../modules/preact_hooks.module.js";
import { observer } from '../modules/mobx_preact.module.js';
import { get, set, values, toJS } from '../modules/mobx.module.js';
import { autorun } from '../modules/mobx.module.js';
import  * as jQuery from "https://unpkg.com/jquery@3.3.1/dist/jquery.min.js";
import  * as _ from "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.19/lodash.min.js";
//import { decorate, observable, computed, action } from '../modules/mobx.module.js';

var $ = window.jQuery;
var __ = window._;

$('#form_1').hide();
imob.data.forEach(wm=>wm.active===true ? wm.active=false : null)

var temp_store={
  name: '',
  job: '',
  birth_date: null,
  active: true,
  gender: 'w',
  checked: false
}

var clear_temp=()=>{
  temp_store.name = ''
  temp_store.job = ''
  temp_store.birth_date=null
  temp_store.gender= 'w'
  temp_store.checked=false
}

var handle_change_name=e=>{
  temp_store.name=e.target.value;
}

var handle_change_job=e=>{
  temp_store.job=e.target.value;
}

var handle_check=e=>{
  e.preventDefault()
  temp_store.checked=e.target.checked
}

var handle_submit=e=>{
  e.preventDefault();
  console.log(e);
  temp_store.name !=''  && temp_store.job != '' ? add_w(temp_store) : alert("Fields must not be empty");
//  $('#form_2').hide();
}

var add_w=wm=>{
//  console.log("new temp_store " + wm);        //wm=new temp_store
  imob.id_del != 0 ? wm.id=Math.random() : wm.id=imob.id_del
  wm.id === 0 ? wm.id=Math.random() : null
  wm.active=false
  imob.index != null ? imob.data.splice(imob.index, 1, wm) : imob.data.push(wm);
  imob.index = null
  wm.name = '';
  wm.job = '';
  del_w(imob.id_del)
}

var del_w=id=>{
  imob.data=imob.data.filter(wm=>{
    return wm.id != id
  });
  $('#form_2').show();
  imob.index = null
  clear_temp()
}

var temp_no_change=par=>{
  temp_store.name=par.name;
  temp_store.job=par.job;
  temp_store.birth_date=par.birth_date;
  temp_store.gender=par.gender;
  temp_store.checked=par.checked;
}

var set_active=w=>{
  imob.data.forEach(wm=>wm.active===true ? wm.active=false : null)
  w.active=true;
//  console.log("checked " + w.checked);
  imob.id_del=w.id;
  imob.index = __.findIndex(imob.data, {id: w.id});
  //var _index_dat=imob.data.indexof(w.id); console.log(_index_dat);
  imob.index >= 0 ? console.log("index = " + imob.index) : console.log("less zero");
  if(imob.data.length != 0){
    $('#form_2').hide();
  }
  temp_no_change(w);
  /*
  temp_store.name=w.name;
  temp_store.job=w.job;
  temp_store.birth_date=w.birth_date;
  temp_store.gender=w.gender;
  temp_store.checked=w.checked;*/
}

var gender_change=e=>{
  //console.log(e.target);
  temp_store.gender= e.target.value;
//  console.log(temp_store.gender);
}

var set_data=e=>{
//  console.log(e.target.value);
  temp_store.birth_date=e.target.value;
}


var Uu = function(){
  //show wm_list
  var wm_list=imob.data.map(wm=>html`
    <div class="list" key=${wm.id} onclick=${()=>set_active(wm)}>
      <div>name: ${wm.name}  job: ${wm.job} </div>
   </div>`
 )

  var reg_form1=imob.data.filter(wm=>wm.active===true).map(wm=>html`
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
          <div>
            <label>
              Date of birth: <input type="date" name="calendar" onchange=${set_data} value=${wm.birth_date}/>
            </label>
          </div>
          <div class="gender">
          gender:${'  '}
          <label>
            w: <input onchange=${handle_check}
                      name="gender"
                      value='w'
                      type="radio"
                      checked=${wm.gender === 'w'}
                      onchange=${gender_change} />
          </label>
          <label>
            m: <input onchange=${handle_check}
                      name="gender"
                      value='m'
                      type="radio"
                      checked=${wm.gender === 'm'}
                      onchange=${gender_change} />
          </label>
          </div>
          <div>
          <label>
            is empty:
            <input onchange=${handle_check} type="checkbox" checked=${wm.checked} />
          </label>
            </div>
          </h6>
          <button type="button" onclick=${handle_submit}>add</button>
          <button type="button" onclick=${()=>del_w(wm.id)}>del</button>
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
          <div>
            <label>
              Date of birth: <input type="date" name="calendar" onchange=${set_data} value=${temp_store.birth_date} />
            </label>
          </div>
          <div class="gender">
          gender:${'  '}
          <label>
            w: <input onchange=${handle_check}
                      name="gender"
                      value='w'
                      type="radio"
                      checked=${temp_store.gender === 'w'}
                      onchange=${gender_change} />
          </label>
          <label>
            m: <input onchange=${handle_check}
                      name="gender"
                      value='m'
                      type="radio"
                      checked=${temp_store.gender === 'm'}
                      onchange=${gender_change} />
          </label>
          </div>
          <div>
            <label>
              is empty: <input onchange=${handle_check} type="checkbox" checked=${temp_store.checked} />
            </label>
          </div>
          </h6>
          <button class="" onclick=${handle_submit}>add</button>
          <button class="unactive" onclick=${clear_temp} disabled >del</button>
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
    <button onclick=${()=>{
      clear_temp();
      imob.back();
    }}>back</button>
    <button onclick=${imob.clear_all}>clear_all</button>
    <p>index : ${imob.index}</p>
  </div>`
}


export default observer(Uu);
