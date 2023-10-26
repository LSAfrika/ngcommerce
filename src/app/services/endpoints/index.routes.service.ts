import { Injectable,inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class IndexRoutesService {

  constructor(private http:HttpClient) { }




  GETALL(url:string){

    return this.http.get<any>(`${url}`,{ withCredentials: true })
  }


  GETSINGLE(url:string){
    return this.http.get<any>(`${url}`,{ withCredentials: true })

  }

  REFRESHUSER(url:string){
    const token=localStorage.getItem('ecomtoken')
    const refreshtoken=localStorage.getItem('ecomrefreshtoken')
    return this.http.post<any>(`${url}`,{},
    { headers: new HttpHeaders().set('Authorization', `Bearer ${token}`), withCredentials: true  })

  }

  POST(url:string,data:{}){
    return this.http.post<any>(`${url}`,data,{ withCredentials: true })

  }

  PATCH(url:string,id:string,data:{}){

    return this.http.post<any>(`${url}/${id}`,data,{ withCredentials: true })

  }

  DELETE(url:string,id:string){
    return this.http.delete<any>(`${url}/${id}`,{ withCredentials: true })

  }
}


