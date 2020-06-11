import { html, render } from 'https://unpkg.com/htm/preact/index.mjs?module';
import { decorate, observable, computed, action } from '../modules/mobx.module.js';

var imob={
  inf: "imob",
//  status: '',
  ch_store: ()=>{
    imob.inf="Ruth"; console.log(imob.inf);
    },
  data: [
    { name: 'Maud', job: 'security', status: '', id: 1},
    { name: 'Ruth', job: 'programmer', status: '', id: 2},
    { name: 'Muit',job: 'contacter', status: '', id: 3}
  ],
  del_w: id=>{
    imob.data=imob.data.filter(wm=>{
      return wm.id != id
    });
    console.log(imob.data.map(i=>i.name));
  }
}

decorate(imob, {
    inf: observable,
//    status: observable,
    data: observable,
    ch_store: action,
    del_w: action
})


export default imob;
