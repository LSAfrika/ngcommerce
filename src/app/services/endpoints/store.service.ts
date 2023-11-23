import { Injectable, inject } from '@angular/core';
import { IndexRoutesService } from './index.routes.service';
import { Store } from 'src/app/interfaces/store.interface';
import { catchError, map, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private endpoint=inject(IndexRoutesService)
storeid=''

  ROOT_STORES_URL='http://localhost:3000/api/v1/stores/'

 // http://localhost:3000/api/v1/stores/store/


  getstoreproducts(id:string){
     const stroreurl= this.ROOT_STORES_URL+`store/${id}`

    return this.endpoint.GETALL(stroreurl)
  }


   storeinfo(storeid:string){
    const storeurl=this.ROOT_STORES_URL+`store/${storeid}`
    console.log('store link',storeurl);

    return this.endpoint.GETSINGLE(storeurl).pipe(map((store:any)=>  store as Store))
  }

addremovestorefromfavorites(storeid:string){

  const storeurl=this.ROOT_STORES_URL+'addremovefavoritestore/'+storeid
  return this.endpoint.POST(storeurl,{}).pipe(
    catchError((err:HttpErrorResponse)=>{ return of({errormessage:'an error occured try agin later',errorlog:err.message})}),


    )

}

storefavoritedcheck(storeid:string){
  const storeurl=this.ROOT_STORES_URL+'storefavoritecheck/'+storeid

  return this.endpoint.GETALL(storeurl).pipe(
    catchError((err:HttpErrorResponse)=>{ return of({errormessage:'an error occured try agin later',errorlog:err.message})}),

  )
}
}
