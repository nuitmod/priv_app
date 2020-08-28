import { html, render } from 'https://unpkg.com/htm/preact/index.mjs?module';
import { decorate, observable, computed, action, autorun } from '../modules/mobx.module.js';
import { get, set, values, toJS } from '../modules/mobx.module.js';
import Uu from './p_app.js';
import  * as jQuery from "https://unpkg.com/jquery@3.5.1/dist/jquery.min.js";

var $ = window.jQuery;

var key_store="__key_st__";
var local=localStorage;
var out_local= local.getItem(key_store)
//var new_imob= imob.data.map(i=>toJS(i))
var items_array =  out_local ? JSON.parse(out_local) : []



var imob={
//  inf: "imob",
  id_del: 0,
  index: null,
  ch_store: ()=>{
    imob.inf="Ruth"; console.log(imob.inf);
    },
  data: items_array,
  to_local: st=>{
    local.setItem(key_store, JSON.stringify(st))
  },
  save_st: ()=>{
    var local_data=imob.data.map(i=>toJS(i));
  //  console.log(local_data);
    imob.to_local(local_data);
    imob.imdex = null;
//    $('#form_1').hide();
//    $('#form_2').show();

  //  imob.data.forEach(wm=>wm.active=false)
  },
  back: ()=>{
    local.clear();
    imob.data= [
      { name: 'Maud', job: 'security', active: false, birth_date: "2020-01-01",  radio_check: false, checked: false, id: 1},
      { name: 'Ruth', job: 'programmer', active: false, birth_date: "2020-02-02", radio_check: false, checked: false, id: 2},
      { name: 'Muit',job: 'contacter', active: false, birth_date: "2020-03-03", radio_check: false, checked: false, id: 3}
    ];
    imob.save_st();
  },
  clear_all: ()=>{
    local.clear();
    imob.data=[];
  }
}

decorate(imob, {
//    inf: observable,
//    id_del: observable,
    index: observable,
    data: observable,
    ch_store: action,
    del_w: action,
    to_local: action,
    save_st: action,
    back: action
//    clear_all: action
})


export default imob;
