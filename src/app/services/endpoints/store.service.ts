import { Injectable, inject } from '@angular/core';
import { IndexRoutesService } from './index.routes.service';
import { Store } from 'src/app/interfaces/store.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private endpoints=inject(IndexRoutesService)
storeid=''

  ROOT_STORES_URL='http://localhost:3000/api/v1/stores/'

 // http://localhost:3000/api/v1/stores/store/


  getstoreproducts(id:string){
     const stroreurl= this.ROOT_STORES_URL+`store/${id}`

    return this.endpoints.GETALL(stroreurl)
  }


   storeinfo(storeid:string){
    const storeurl=this.ROOT_STORES_URL+`store/${storeid}`
    console.log('store link',storeurl);

    return this.endpoints.GETSINGLE(storeurl).pipe(map((store:any)=>  store as Store))
  }


}
