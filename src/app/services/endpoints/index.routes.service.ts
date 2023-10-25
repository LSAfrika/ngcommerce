import { Injectable,inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class IndexRoutesService {

  constructor(private http:HttpClient) { }




  GETALL(url:string){

    return this.http.get<any>(`${url}`)
  }


  GETSINGLE(url:string){
    return this.http.get<any>(`${url}`)

  }

  REFRESHUSER(url:string){
    const token=localStorage.getItem('ecomtoken')
    const refreshtoken=localStorage.getItem('ecomrefreshtoken')
    return this.http.post<any>(`${url}`,{},{ headers: new HttpHeaders().set('Authorization', `Bearer ${token}`).set('refreshtoken',`bearer ${refreshtoken}`) })

  }

  POST(url:string,data:{}){
    return this.http.post<any>(`${url}`,data)

  }

  PATCH(url:string,id:string,data:{}){

    return this.http.post<any>(`${url}/${id}`,data)

  }

  DELETE(url:string,id:string){
    return this.http.delete<any>(`${url}/${id}`)

  }
}


