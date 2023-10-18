
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree,Router, Route } from '@angular/router';
import { map, Observable, of, Subject, tap } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { User } from '../interfaces/user.interface';
import { UserService } from '../services/endpoints/user.service';

@Injectable({
  providedIn: 'root'
})
// , CanDeactivate<unknown>
export class AdminGuard implements CanActivate {
constructor(private router:Router,private usersvc:UserService){}

 userstate:Observable<boolean>=of(!!localStorage.getItem('ecomtoken'))
 endcheck$=new Subject()
  canActivate():Observable<boolean>|boolean {
   // this.router.navigateByUrl('/')


       return this.userstate.pipe(map((res)=>{
        if(res==true) {

    const tokenavailable=localStorage.getItem('ecomtoken')

      let token:string


        token=tokenavailable?.split('.')[1]||''
        const userbio= JSON.parse(atob(token))

        delete  userbio.exp
        delete  userbio.iat
        delete  userbio.iss

        console.log(userbio)
        this.usersvc.user=userbio as User

if(this.usersvc.user.vendor==false){  this.router.navigate(['/']); return false}

          return true
        }
        else{
// window.location.assign('/login')
          this.router.navigate(['/'])
          console.log('failed to resolve');

          return false
        }
      }))



  }


}
