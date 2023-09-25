import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {


  openimage=new BehaviorSubject<boolean>(false)
  brandspanel=new BehaviorSubject<boolean>(false)
  categoriespanel=new BehaviorSubject<boolean>(false)

  constructor() { }

openproductimage(){
  this.openimage.next(true)

}
closeproductimage(){
  this.openimage.next(false)

}

openbrandspanel(){
  this.brandspanel.next(true)

}
closebrandspanel(){
  this.brandspanel.next(false)

}

opencategoriespanel(){
  this.categoriespanel.next(true)

}
closecategoriespanel(){
  this.categoriespanel.next(false)

}

closeallpanels(){
  this.categoriespanel.next(false)
  this.brandspanel.next(false)


}

}
