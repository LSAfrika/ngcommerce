import { Injectable, inject } from '@angular/core';
import { IndexRoutesService } from './index.routes.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private endpoints=inject(IndexRoutesService)

  ROOT_USER_URL='http://localhost:3000/api/v1/user'
  
  authuserid='1'
  userdata={}
  constructor() { }

  authuser(){
    return this.endpoints.GETSINGLE(this.ROOT_USER_URL,this.authuserid)

  }
  createuser(){
    this.userdata={
      name:'hi',
      there:'there'
    }
return this.endpoints.POST(this.ROOT_USER_URL,this.userdata)
  }

  updateuser(){
  return this.endpoints.PATCH(this.ROOT_USER_URL,this.authuserid,this.userdata)

  }

  deleteuseraccount(){
    return this.endpoints.DELETE(this.ROOT_USER_URL,this.authuserid)

  }
}
