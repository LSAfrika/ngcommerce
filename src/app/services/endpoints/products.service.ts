import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { IndexRoutesService } from './index.routes.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  ROOT_PRODUCTS_URL='http://localhost:3000/api/v1/products/'
  FETCH_PRODUCTS_URL='http://localhost:3000/api/v1/products/getallproducts?pagination='
  private endpoints=inject(IndexRoutesService)

  productid='1'
  productdata={}
  pagination$=new BehaviorSubject(0)
  products$=new BehaviorSubject<Product[]>([])
  viewproducts$!:Observable<any>
 readonly paginationObs$=this.pagination$.asObservable()
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

      fetchproducts(){


         this.pagination$.next(this.pagination$.value+1)

      }

    get  viewproducts():Observable<Product[]>{

        //this.viewproducts$=
        return    this.paginationObs$.pipe(switchMap(res=>{

          const url=this.FETCH_PRODUCTS_URL+`${res}`

         return this.endpoints.GETALL(url)
        }),map((products:Product[])=>{
          this.products$.next([...this.products$.value,...products])
          return this.products$.value
        })

        )

      }

      resetpagination(){
        this.pagination$.next(-1)
      }


}
