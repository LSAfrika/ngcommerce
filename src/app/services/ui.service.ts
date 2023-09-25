import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {


  openimage=new BehaviorSubject<boolean>(false)

  constructor() { }

openproductimage(){
  this.openimage.next(true)

}
closeproductimage(){
  this.openimage.next(false)

}


}
