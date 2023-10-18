import { Injectable, inject } from '@angular/core';
import { Route, Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  currentroute=''
  openimage=new BehaviorSubject<boolean>(false)
  brandspanel=new BehaviorSubject<boolean>(false)
  categoriespanel=new BehaviorSubject<boolean>(false)
  sidenav$=new BehaviorSubject<boolean>(false)
  cartpanel$=new BehaviorSubject<boolean>(false)
  navbar$=new BehaviorSubject<boolean>(!!localStorage.getItem('ecomtoken'))
  public cartpaneldeleteoverlay$=new BehaviorSubject(false)
  public togglemenu$=new BehaviorSubject(true)
  logintredirectroute=''

private router=inject(Router)

  categoriesarray:string[]=[]
  brandsarray:string[]=[]

  constructor() { }


  getroute(){
   this.currentroute= this.router.url

   console.log('current route',this.currentroute);

return this.currentroute

  }
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
