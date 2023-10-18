import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { Location } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  userstate:Observable<boolean>=of(!!localStorage.getItem('ecomtoken'))


  private router=inject(Router)
  private location=inject(Location)
   canActivate():Observable<boolean>|boolean {
    // this.router.navigateByUrl('/')


        return this.userstate.pipe(map((res)=>{
         if(res==true) {
    this.router.navigateByUrl('/')


          console.log('failed to resolve');
          return false}
         else{return true}
       }))



   }

}
