import { html, render } from 'https://unpkg.com/htm/preact/index.mjs?module';
import { decorate, observable, computed, action, autorun } from '../modules/mobx.module.js';
import { get, set, values, toJS } from '../modules/mobx.module.js';
import Uu from './p_app.js';
//import { wm_list } from './p_app.js';

//console.log(Uu);

var key_store="__key_st__";
var local=localStorage;
var out_local= local.getItem(key_store)
//var new_imob= imob.data.map(i=>toJS(i))
var items_array=  out_local ? JSON.parse(out_local) : []

//var new_list=Uu.wm_list;

var imob={
//  inf: "imob",
  id_del: 0,
  index: null,
  ch_store: ()=>{
    imob.inf="Ruth"; console.log(imob.inf);
    },
  data: items_array,
  /*[
    { name: 'Maud', job: 'security', active: false, id: 1},
    { name: 'Ruth', job: 'programmer', active: false, id: 2},
    { name: 'Muit',job: 'contacter', active: false, id: 3}
  ],
*/
  to_local: st=>{
    local.setItem(key_store, JSON.stringify(st))
  },
  save_st: ()=>{
    var local_data=imob.data.map(i=>toJS(i));
    console.log(local_data);
    imob.to_local(local_data);
    imob.imdex = null
  },
  back: ()=>{
    local.clear();
    imob.data= [
      { name: 'Maud', job: 'security', active: false, id: 1},
      { name: 'Ruth', job: 'programmer', active: false, id: 2},
      { name: 'Muit',job: 'contacter', active: false, id: 3}
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
