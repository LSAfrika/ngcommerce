
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// , CanDeactivate<unknown>
export class LoginGuard implements CanActivate {
constructor(private router:Router){}

  canActivate() {
   // this.router.navigateByUrl('/')

   if(!!localStorage.getItem('token') ) {

    const tokenavailable=localStorage.getItem('token')
    if(tokenavailable!=undefined) {
      let token:string
    const storetoken=localStorage.getItem('token')
      if(storetoken){

        token=storetoken.split('.')[1]
        const userbio= atob(token)
      } 

  



     

    return true;}
    else{



// this.io.disconnectinstance()
this.router.navigateByUrl('/login')
return false

    }
  }else{

    this.router.navigateByUrl('/login')
    return false
  }


  }


}
