import { Injectable, inject } from '@angular/core';
import { IndexRoutesService } from './index.routes.service';
import {User,getuserhttpresponse,loginhttpresponse,registerhttpresponse,updateuserhttpresponse} from '../../interfaces/user.interface'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {



  ROOT_USER_URL='http://localhost:3000/api/v1/user/'

   REFRESH_URL='http://localhost:3000/api/v1/user/refresh'

  authuserid='1'
  userdata:any={}
  user:User
  ={_id:'',createdAt:'',profileimg:'',updatedAt:'',username:'',vendor:false}
  constructor( private endpoints:IndexRoutesService) { }

  authuser():Observable<getuserhttpresponse>{
    const userurl= this.ROOT_USER_URL+`${this.authuserid}`
    return this.endpoints.GETSINGLE(userurl)

  }
  registeruser():Observable<registerhttpresponse>{
    const registerurl=this.ROOT_USER_URL+'register'

return this.endpoints.POST(registerurl,this.userdata)
  }

  loginuser():Observable<loginhttpresponse>{
    const loginurl=this.ROOT_USER_URL+'login'
    return this.endpoints.POST(loginurl,this.userdata)
  }

  updateuser():Observable<updateuserhttpresponse>{
  return this.endpoints.PATCH(this.ROOT_USER_URL,this.authuserid,this.userdata)

  }

  deleteuseraccount(){
    return this.endpoints.DELETE(this.ROOT_USER_URL,this.authuserid)

  }

  refreshtoken(){
    return this.endpoints.REFRESHUSER(this.REFRESH_URL)

  }
}
