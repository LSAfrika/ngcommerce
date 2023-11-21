import { Injectable, inject } from '@angular/core';
import { IndexRoutesService } from './index.routes.service';
import {User,getuserhttpresponse,loginhttpresponse,registerhttpresponse,updateuserhttpresponse} from '../../interfaces/user.interface'
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {



  ROOT_USER_URL='http://localhost:3000/api/v1/user/'

   REFRESH_URL='http://localhost:3000/api/v1/user/refresh'
   viewmodal$=new BehaviorSubject(false)
   modalmessage=''
    spinnerstate=true

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
    return this.endpoints.POST(loginurl,this.userdata, )
  }

  updateuser(userdata:FormData):Observable<updateuserhttpresponse>{

    const userupdateurl=this.ROOT_USER_URL+'updatebio'
  return this.endpoints.PATCH(userupdateurl,userdata)

  }

  deleteuseraccount(){
    const deleteuserurl=`${this.ROOT_USER_URL}${this.authuserid}`
    return this.endpoints.DELETE(deleteuserurl)

  }

  refreshtoken(){
    return this.endpoints.REFRESHUSER(this.REFRESH_URL)

  }

  logout(){
    const logouturl=this.ROOT_USER_URL+'logout'
    return this.endpoints.POST(logouturl,{})
  }
}
