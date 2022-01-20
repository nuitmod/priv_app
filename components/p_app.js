import { html, Component, render } from 'https://unpkg.com/htm/preact/index.mjs?module';
import imob from "./mobx_store.js";
import { useState, useReducer, useContext, useCallback} from "../modules/preact_hooks.module.js";
import { observer } from '../modules/mobx_preact.module.js';
import { get, set, values, toJS } from '../modules/mobx.module.js';
import { autorun } from '../modules/mobx.module.js';
import  * as jQuery from "https://unpkg.com/jquery@3.3.1/dist/jquery.min.js";
import  * as _ from "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.19/lodash.min.js";
//import { decorate, observable, computed, action } from '../modules/mobx.module.js';

let __ = window._;

$('#form_1').hide();
imob.data.forEach(wm=>wm.active===true ? wm.active=false : null)

let temp_store={
  name: '',
  job: '',
  birth_date: null,
  active: true,
  gender: 'w',
  checked: false
}

let clear_temp=()=>{
  temp_store.name = ''
  temp_store.job = ''
  temp_store.birth_date=null
  temp_store.gender= 'w'
  temp_store.checked=false
}

let handle_change_name=e=>{
  temp_store.name=e.target.value;
}

let handle_change_job=e=>{
  temp_store.job=e.target.value;
}

let handle_check=e=>{
  e.preventDefault()
  temp_store.checked=e.target.checked
}

let handle_submit=e=>{
  e.preventDefault();
  console.log(e);
  temp_store.name !=''  && temp_store.job != '' ? add_w(temp_store) : alert("Fields must not be empty");
//  $('#form_2').hide();
}

let add_w=wm=>{
//  console.log("new temp_store " + wm);        //wm=new temp_store
  imob.id_del != 0 ? wm.id=Math.random() : wm.id=imob.id_del
  wm.id === 0 ? wm.id=Math.random() : null
  wm.active=false
  imob.index != null ? imob.data.splice(imob.index, 1, wm) : imob.data.push(wm);
  imob.index = null
  wm.name = '';
  wm.job = '';
  del_w(imob.id_del)
  imob.is_change=true;
  //console.log(imob.is_change)
}

let del_w=id=>{
  imob.data=imob.data.filter(wm=>{
    return wm.id != id
  });
  $('#form_2').show();
  imob.index = null
  clear_temp()
}

let temp_no_change=par=>{
  temp_store.name=par.name;
  temp_store.job=par.job;
  temp_store.birth_date=par.birth_date;
  temp_store.gender=par.gender;
  temp_store.checked=par.checked;
}

let set_active=w=>{
  imob.data.forEach(wm=>wm.active===true ? wm.active=false : null)
  w.active=true;;
  imob.id_del=w.id;
  imob.index = __.findIndex(imob.data, {id: w.id});
  imob.index >= 0 ? console.log("index = " + imob.index) : console.log("less zero");
  if(imob.data.length != 0){
    $('#form_2').hide();
  }
  temp_no_change(w);
  
}

let gender_change=e=>{
  temp_store.gender= e.target.value;
}

let set_data=e=>{
  temp_store.birth_date=e.target.value;
}
let refresh=()=>{
  //console.log(imob.is_change)
  // if(imob.is_change==true){
  //   alert("Все внесенные изменения будут потеряны!")
  // }
  location.reload();
}

let Uu = function(){
  let wm_list=imob.data.map(wm=>html`
    <div class="list" key=${wm.id} onclick=${()=>set_active(wm)}>
      <div>name: ${wm.name}  job: ${wm.job} </div>
   </div>`
 )

  let reg_form1=imob.data.filter(wm=>wm.active===true).map(wm=>html`
     <div>
       <form id="form_1" onsubmit=${handle_submit}>
          <h3>Форма редактирования:</h3>
          <h6>
          <label>ФИО</label>
          <input type="text" id="name" onchange=${handle_change_name} value=${wm.name} /><br />
          <label>Должность</label>
          <select  id="job" onchange=${handle_change_job} value=${wm.job}>
          <option value="Разработчик">Разработчик</option>
          <option value="Аналитик">Аналитик</option>
          <option value="Специалист техподдержки">Специалист техподдержки</option>
          </select>
          <div>
            <label>
             Дата рождения: <input type="date" name="calendar" onchange=${set_data} value=${wm.birth_date}/>
            </label>
          </div>
          <div class="gender">
          Пол:${'  '}
          <label>
            Ж: <input onchange=${handle_check}
                      name="gender"
                      value='w'
                      type="radio"
                      checked=${wm.gender === 'w'}
                      onchange=${gender_change} />
          </label>
          <label>
            М: <input onchange=${handle_check}
                      name="gender"
                      value='m'
                      type="radio"
                      checked=${wm.gender === 'm'}
                      onchange=${gender_change} />
          </label>
          </div>
          <div>
          <label>
            Уволен:
            <input onchange=${handle_check} type="checkbox" checked=${wm.checked} />
          </label>
            </div>
          </h6>
          <button type="button" onclick=${handle_submit}>Добавить нового сотрудника</button>
          <button type="button" onclick=${()=>del_w(wm.id)}>Удалить выбранного сотрудника</button>
       </form>
      </div>`)

  let reg_form2=html`
     <div>
       <form id="form_2" onsubmit=${handle_submit}>
          <h3>Форма редактирования:</h3>
          <h6>
          <label>ФИО</label>
          <input type="text" id="name" placeholder="name" onchange=${handle_change_name} value=${temp_store.name} /><br />
          <label>Должность</label>
          <select id="job" placeholder="job" onchange=${handle_change_job} value=${temp_store.job}>
           <option value="Разработчик">Разработчик</option>
           <option value="Аналитик">Аналитик</option>
           <option value="Специалист техподдержки">Специалист техподдержки</option>
          </select>
          <div>
            <label>
              Дата рождения: <input type="date" name="calendar" onchange=${set_data} value=${temp_store.birth_date} />
            </label>
          </div>
          <div class="gender">
          Пол:${'  '}
          <label>
            Ж: <input onchange=${handle_check}
                      name="gender"
                      value='w'
                      type="radio"
                      checked=${temp_store.gender === 'w'}
                      onchange=${gender_change} />
          </label>
          <label>
            М: <input onchange=${handle_check}
                      name="gender"
                      value='m'
                      type="radio"
                      checked=${temp_store.gender === 'm'}
                      onchange=${gender_change} />
          </label>
          </div>
          <div>
            <label>
              Уволен: <input onchange=${handle_check} type="checkbox" checked=${temp_store.checked} />
            </label>
          </div>
          </h6>
          <button class="" onclick=${handle_submit}>Добавить нового сотрудника</button>
          <button class="unactive" onclick=${clear_temp} disabled>Удалить выбранного сотрудника</button>
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
    <button onclick=${imob.save_st}>Сохранить</button>
    <button onclick=${()=>{
      clear_temp();
      imob.back();
    }}>Вернуть</button>
    <button onclick=${imob.clear_all}>Очистить</button>
  </div>`
}

/* <p>index : ${imob.index}</p> <button onclick=${refresh}>Обновить страницу</button> */
export default observer(Uu);
