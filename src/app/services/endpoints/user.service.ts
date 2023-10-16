import { Injectable, inject } from '@angular/core';
import { IndexRoutesService } from './index.routes.service';
import {User,getuserhttpresponse,loginhttpresponse,registerhttpresponse,updateuserhttpresponse} from '../../interfaces/user.interface'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private endpoints=inject(IndexRoutesService)

  ROOT_USER_URL='http://localhost:3000/api/v1/user'
  
  authuserid='1'
  userdata={}
  constructor() { }

  authuser():Observable<getuserhttpresponse>{
    return this.endpoints.GETSINGLE(this.ROOT_USER_URL,this.authuserid)

  }
  createuser():Observable<registerhttpresponse>{

return this.endpoints.POST(this.ROOT_USER_URL,this.userdata)
  }

  updateuser():Observable<updateuserhttpresponse>{
  return this.endpoints.PATCH(this.ROOT_USER_URL,this.authuserid,this.userdata) 

  }

  deleteuseraccount(){
    return this.endpoints.DELETE(this.ROOT_USER_URL,this.authuserid)

  }
}
