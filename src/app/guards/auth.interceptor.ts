
import { map, switchMap, catchError } from 'rxjs/operators';
// import { AuthService } from './auth.service';
import{UiService}from '../services/frontendservices/ui.service'
import { inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
// import { PostService } from './Post.service';
// import jwt_decode from 'jwt-decode';
import {  Router } from '@angular/router';
import { UserService } from '../services/endpoints/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


   refreshurl = 'http://localhost:3000/api/v1/user/refresh';
   loginurl = 'http://localhost:3000/api/v1/user/login';
  private usersvce=inject(UserService)
  constructor(private router:Router,) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {

     return this.refreshtokeninterceptor(request, next);
 }

  refreshtokeninterceptor(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>>{
    const token: any = localStorage.getItem('ecomtoken');

    let tokenvalue=undefined
    let tokenstoreage=undefined

       if(!!localStorage.getItem('ecomtoken')) {

        tokenstoreage =localStorage.getItem('ecomtoken')||''
        tokenvalue = JSON.parse(atob(tokenstoreage.split('.')[1]))

        // console.log('current ecom token: ',tokenvalue);
        // console.log('current ecom token: ',tokenstoreage);

      }





;

    if(req.url===this.refreshurl) return next.handle(req).pipe(catchError(((err:HttpErrorResponse)=>{

      console.log('error area being triggered');

      let errmessage=err.error.message
      console.log(errmessage)
      if(errmessage==='refreshtokenexpired'||errmessage==='tokenmismatch'){



        localStorage.removeItem('token')
        localStorage.removeItem('refreshtoken')
       this.router.navigateByUrl('/login')
       return EMPTY

      }else{
console.log(err);

        return EMPTY
      }
    })))

    if ( req.url != this.loginurl){

      // console.log('current endpoint url: ',req.url)
      if (tokenstoreage!=undefined&&tokenvalue!=undefined &&tokenvalue.exp * 1000 > Date.now() ) {

        // console.log(tokenvalue.exp);

        const postrequest = req.clone({
        setHeaders: {
          Authorization: 'bearer ' + tokenstoreage
        }
       });

      //  console.log('outgoing request: ',postrequest);

        return next.handle(postrequest);

      }

      return  this.usersvce.refreshtoken().pipe(switchMap(
      (tokens: any) => {

        // console.log(tokens);
        localStorage.setItem('token', tokens.token);

        const reqclone = req.clone({
          setHeaders: {
            Authorization: 'bearer ' + tokens.token
          }
        });
        return next.handle(reqclone);
      }



    ));


    }

    return next.handle(req);

  }






//   logininterceptor(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {


//       const token = this.auth.firebasetokenvalue;
// // console.log('interceptor token\n',token);

//       this.authrequest = request.clone({
//         setHeaders: {
//           Authorization: 'bearer ' + token
//         }
//       });
//       // console.log('auth header',this.authrequest.headers.get('Authorization'));


//       return next.handle(this.authrequest);



//   }




}
