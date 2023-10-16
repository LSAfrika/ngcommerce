import { Injectable,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class IndexRoutesService {

  constructor() { } 
  private http=inject(HttpClient)



  GETALL(url:string){

    return this.http.get(`${url}`)
  }

  GETSINGLE(url:string,id:string){
    return this.http.get(`${url}/${id}`)

  }

  POST(url:string,data:{}){
    return this.http.post(`${url}`,data)

  }

  PATCH(url:string,id:string,data:{}){

    return this.http.post(`${url}/${id}`,data)

  }

  DELETE(url:string,id:string){
    return this.http.delete(`${url}/${id}`)

  }
}


