import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/endpoints/user.service';
import { FrontEndCartService } from 'src/app/services/frontendservices/cart.service';
import { UiService } from 'src/app/services/frontendservices/ui.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public uiservice=inject(UiService)
  public userservice=inject(UserService)
  public cartservice=inject(FrontEndCartService)
  public router=inject(Router)
  public cartcount$:Observable<number>=this.cartservice.fetchcart$.pipe(map((cart)=>{ return cart.products.length}))
 public isVendor$=

 of(!!localStorage.getItem('ecomtoken')).
 pipe(map(

   (tokenavailable:boolean)=>{
        if(tokenavailable==false) return false
        const token=localStorage.getItem('ecomtoken')
       const tokendata=token?.split('.')[1]||''
        const user:User= JSON.parse(atob(tokendata))
        this.userservice.user.next(user)
// console.log('admin check json',this.userservice.user.value)
        if(user.vendor==true) return true
        return false;
   }
 ))
  ngOnInit(){
    this.uiservice.logintredirectroute=this.uiservice.getroute()
    console.log(   this.uiservice.logintredirectroute)
   console.log(  'nav being created' )

  }

  opensidenav(){
    this.uiservice.sidenav$.next(true)
  }
  opencart(){
    this.uiservice.cartpanel$.next(true)
  }

  logout(){


    this.userservice.logout().subscribe(()=>{

      localStorage.removeItem('ecomtoken')
this.userservice.user.next(undefined)
console.log('user on logout',this.userservice.user.value);

      this.uiservice.navbar$.next(!!localStorage.getItem('ecomtoken'))
      if(this.uiservice.logintredirectroute =='/profile'){

        this.uiservice.logintredirectroute=''
        this.router.navigateByUrl('/')
      }

      if(this.uiservice.logintredirectroute.split('/')[1] =='admin'){

        this.uiservice.logintredirectroute=''
        this.router.navigateByUrl('/')
      }
      this.uiservice.logintredirectroute=''
    },(err)=>{
      console.log('log out error',err);
      alert(err.error.errormessage)

    })


  }

}
