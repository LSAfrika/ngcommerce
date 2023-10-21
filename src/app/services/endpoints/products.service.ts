import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { IndexRoutesService } from './index.routes.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  ROOT_PRODUCTS_URL='http://localhost:3000/api/v1/products/'
  ROOT_STORES_PRODUCTS_URL='http://localhost:3000/api/v1/products/getallproductsstore/'

  FETCH_PRODUCTS_URL='http://localhost:3000/api/v1/products/getallproducts?pagination='
  private productendpoints=inject(IndexRoutesService)

  currentimage=0

  productid=''
  productdata={}
  pagination$=new BehaviorSubject(0)
  products$=new BehaviorSubject<Product[]>([])
  viewproducts$!:Observable<any>
 readonly paginationObs$=this.pagination$.asObservable()
  createproduct(){

    return this.productendpoints.POST(this.ROOT_PRODUCTS_URL,this.productdata)
      }

      updateproduct(){


      return this.productendpoints.PATCH(this.ROOT_PRODUCTS_URL,this.productid,this.productdata)

      }

      deleteproduct(){
        return this.productendpoints.DELETE(this.ROOT_PRODUCTS_URL,this.productid)

      }

      deactivateproduct(){
        const deactivateroute=this.ROOT_PRODUCTS_URL+this.productid
        return this.productendpoints.POST(deactivateroute,{})

      }

      fetchproducts(){


         this.pagination$.next(this.pagination$.value+1)

      }

      viewproduct(productid:string):Observable<Product>{

        //this.viewproducts$=
         const producturl= this.ROOT_PRODUCTS_URL+`getsingleproduct/${productid}`
        return this.productendpoints.GETSINGLE(producturl).pipe(map((res:Product)=>{ return res}))

      }


      storeproducts(id:string):Observable<Product[]>{

        const storeproducturl=this.ROOT_STORES_PRODUCTS_URL+`${id}?pagination=0`

        return this.productendpoints.GETALL(storeproducturl)

      }

    get  viewproducts():Observable<Product[]>{

        //this.viewproducts$=
        return    this.paginationObs$.pipe(switchMap(res=>{

          const url=this.FETCH_PRODUCTS_URL+`${res}`

         return this.productendpoints.GETALL(url)
        }),map((products:Product[])=>{
          this.products$.next([...this.products$.value,...products])
          return this.products$.value
        })

        )

      }






      resetpagination(){
        this.pagination$.next(0)
      }


}
