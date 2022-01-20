import { html, render } from 'https://unpkg.com/htm/preact/index.mjs?module';
import { decorate, observable, computed, action, autorun } from '../modules/mobx.module.js';
import { get, set, values, toJS } from '../modules/mobx.module.js';
import Uu from './p_app.js';
import  * as jQuery from "https://unpkg.com/jquery@3.5.1/dist/jquery.min.js";

var $ = window.jQuery;

var key_store="__key_st__";
var local=localStorage;
var out_local= local.getItem(key_store)
var items_array =  out_local ? JSON.parse(out_local) : []


var imob={
  id_del: 0,
  index: null,
  ch_store: ()=>imob.inf="Ruth",
  data: items_array,
  to_local: st=>{
    local.setItem(key_store, JSON.stringify(st))
  },
  save_st: ()=>{
    var local_data=imob.data.map(i=>toJS(i));
    imob.to_local(local_data);
    imob.imdex = null;
  },
  back: ()=>{
    local.clear();
    imob.data= [
      { name: 'Maud', job: 'Разработчик', active: false, birth_date: "2020-01-01",  gender: 'w', checked: false, id: 1},
      { name: 'Ruth', job: 'Аналитик', active: false, birth_date: "2020-02-02", gender: 'w', checked: false, id: 2},
      { name: 'Muit',job: 'Специалист техподдержки', active: false, birth_date: "2020-03-03", gender: 'w', checked: false, id: 3}
    ];
  //  imob.data.forEach(wm=>wm.active===true ? wm.active=false : null)
    imob.save_st();
  //  imob.data.forEach(wm=>wm.active===true ? wm.active=false : null)
    $('#form_2').show();
  },
  clear_all: ()=>{
    local.clear();
    imob.data=[];
  },
  is_change: false
}

decorate(imob, {
    index: observable,
    data: observable,
    ch_store: action,
    del_w: action,
    to_local: action,
    save_st: action,
    back: action,
    is_change: observable
//    clear_all: action
})


export default imob;
