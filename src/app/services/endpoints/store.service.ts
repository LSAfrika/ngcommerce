import { Injectable, inject } from '@angular/core';
import { IndexRoutesService } from './index.routes.service';
import { Store } from 'src/app/interfaces/store.interface';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private endpoint=inject(IndexRoutesService)

storeid=''

  ROOT_STORES_URL='http://localhost:3000/api/v1/stores/'
  favoritestores$=new BehaviorSubject<Store[]>([])
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


removeaddstorefromfavorites(productid:string){
  const favurl=this.ROOT_STORES_URL+'addremovefavoritestore/'+productid

  return this.endpoint.POST(favurl,{})
}


get favoritestores():Observable<Store[]>{
  const fovoritestoreurl=this.ROOT_STORES_URL+'getfavoritestores/'

  console.log('current products in Bsubject: ',this.favoritestores$.value);

  if(this.favoritestores$.value.length>0) return this.favoritestores$.asObservable()
  return this.endpoint.GETALL(fovoritestoreurl).
  pipe(
  catchError((errorresponse:HttpErrorResponse)=> {console.log('error while fetching favorite stores',errorresponse.message);return of([]); }),
    map((res)=>{

      this.favoritestores$.next([...res])

      return res
    })
    )


}
}
