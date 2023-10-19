import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, of, switchMap } from 'rxjs';
import { IndexRoutesService } from './index.routes.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  ROOT_PRODUCTS_URL='http://localhost:3000/api/v1/products/'
  private endpoints=inject(IndexRoutesService)

  productid='1'
  productdata={}
  pagination$=new BehaviorSubject(0)
  createproduct(){

    return this.endpoints.POST(this.ROOT_PRODUCTS_URL,this.productdata)
      }

      updateproduct(){


      return this.endpoints.PATCH(this.ROOT_PRODUCTS_URL,this.productid,this.productdata)

      }

      deleteproduct(){
        return this.endpoints.DELETE(this.ROOT_PRODUCTS_URL,this.productid)

      }

      deactivateproduct(){
        const deactivateroute=this.ROOT_PRODUCTS_URL+this.productid
        return this.endpoints.POST(deactivateroute,{})

      }

      getproducts(){


        // this.pagination$.next(this.pagination$.value+1).pipe(switchMap((page:number)=>{

        //   return of('')
        // }

      //     `${this.ROOT_PRODUCTS_URL}getallproducts?pagination=${page}`;
          // this.endpoints.GETALL(`${this.ROOT_PRODUCTS_URL}getallproducts?pagination=${page}`)
        // ))
      }

      resetpagination(){
        this.pagination$.next(-1)
      }


}
