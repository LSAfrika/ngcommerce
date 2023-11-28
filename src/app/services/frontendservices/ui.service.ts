import { Injectable, inject } from '@angular/core';
import { Route, Router } from '@angular/router';

import { BehaviorSubject, map, of, Subject } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from '../endpoints/user.service';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  openfilter=false
  editprofilemodal$=new BehaviorSubject(false)
  globalmodal$=new BehaviorSubject<boolean>(false)
  globalmodalcart$=new BehaviorSubject<boolean>(false)
  modalspinner$=new BehaviorSubject<boolean>(true)
  globalmodalmessage=''
  currentroute=''
  private userservice=inject(UserService)
  openimage=new BehaviorSubject<boolean>(false)
  brandspanel=new BehaviorSubject<boolean>(false)
  categoriespanel=new BehaviorSubject<boolean>(false)
  sidenav$=new BehaviorSubject<boolean>(false)
  cartpanel$=new BehaviorSubject<boolean>(true)
  navbar$=new BehaviorSubject<boolean>(!!localStorage.getItem('ecomtoken'))

  productphotoupdate$=new BehaviorSubject(false)
  Vendor$=

  of(!!localStorage.getItem('ecomtoken')).
  pipe(map(

    (tokenavailable:boolean)=>{
         if(tokenavailable==false) return false
         const token=localStorage.getItem('ecomtoken')
        const tokendata=token?.split('.')[1]||''
         const user:User= JSON.parse(atob(tokendata))
         this.userservice.user.next(user)
// console.log('admin check json',user)
         if(user.vendor==true) return true
         return false;
    }
  ))
  public cartpaneldeleteoverlay$=new BehaviorSubject(false)
  public togglemenu$=new BehaviorSubject(true)
  logintredirectroute=''

private router=inject(Router)

  categoriesarray:string[]=[]
  brandsarray:string[]=[]

  constructor() { }


  getroute(){
   this.currentroute= this.router.url

  //  console.log('current route',this.currentroute);

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
