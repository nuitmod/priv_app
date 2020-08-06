import { html, render } from 'https://unpkg.com/htm/preact/index.mjs?module';
import { decorate, observable, computed, action } from '../modules/mobx.module.js';

var imob={
  inf: "imob",
//  status: '',
  ch_store: ()=>{
    imob.inf="Ruth"; console.log(imob.inf);
    },
  data: [
    { name: 'Maud', job: 'security', active: false, id: 1},
    { name: 'Ruth', job: 'programmer', active: false, id: 2},
    { name: 'Muit',job: 'contacter', active: false, id: 3}
  ]
  /*
  del_w: id=>{
    imob.data=imob.data.filter(wm=>{
      return wm.id != id
    });
    console.log(imob.data.map(i=>i.name));
  }
  */
}

decorate(imob, {
    inf: observable,
//    status: observable,
    data: observable,
    ch_store: action,
    del_w: action
})


export default imob;
