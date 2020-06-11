import { html, render } from 'https://unpkg.com/htm/preact/index.mjs?module';
import { decorate, observable, computed, action } from '../modules/mobx.module.js';

var imob={
  inf: "imob",
  ch_store: ()=>{
    imob.inf="Ruth"; console.log(imob.inf);
    },
  data: [
    { name: 'Maud', id: 1},
    { name: 'Ruth', id: 2},
    { name: 'Muit', id: 3}
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
    data: observable,
    ch_store: action,
    del_w: action
})


export default imob;
