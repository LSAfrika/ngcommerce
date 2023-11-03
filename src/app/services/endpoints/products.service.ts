import { Injectable, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { BrandsandcategoriesService } from '../frontendservices/brandsandcategories.service';
import { IndexRoutesService } from './index.routes.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  ROOT_PRODUCTS_URL='http://localhost:3000/api/v1/products/'
  ROOT_STORES_PRODUCTS_URL='http://localhost:3000/api/v1/products/getallproductsstore/'
  ROOT_ADMIN_PRODUCTS_URL='http://localhost:3000/api/v1/products/getallproductsstoreadmin'

  FETCH_PRODUCTS_URL='http://localhost:3000/api/v1/products/getallproducts?pagination='
  category='all'
  FETCH_CATEGORY_PRODUCTS_URL=`http://localhost:3000/api/v1/products/getallproductscategory?`

  private productendpoints=inject(IndexRoutesService)
  private activeroute=inject(ActivatedRoute)
  private categoryservice=inject(BrandsandcategoriesService)

  currentimage=0
fetchmorebtnstate=false

noproducts=false
  productid=''
  adminid=''
  storeid=''
  productdata={}
  pagination$=new BehaviorSubject(0)
  products$=new BehaviorSubject<Product[]>([])
  categoryproducts$=new BehaviorSubject<Product[]>([])
  // adminproducts$=new BehaviorSubject<Product[]>([])
  adminproducts$=new BehaviorSubject<Product[]>([])
  vendorproducts$=new BehaviorSubject<Product[]>([])
  viewproducts$!:Observable<any>
 readonly paginationObs$=this.pagination$.asObservable()
  storepagination$=new BehaviorSubject(0);
  storepaginationObs$=this.storepagination$.asObservable();

  categorypagination$=new BehaviorSubject(0);
  categorypaginationObs$=this.categorypagination$.asObservable();

  constructor(){
    this.category= this.activeroute.snapshot.queryParamMap.get('category')||'all'
    console.log('current category',this.category);
    console.log('current category',this.FETCH_CATEGORY_PRODUCTS_URL);

  }


  ngOnInit(){
console.log(this.FETCH_CATEGORY_PRODUCTS_URL)
  }

  get categoriesurl(){
    return this.FETCH_CATEGORY_PRODUCTS_URL
  }
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
      fetchcategoryproducts(){


        this.categorypagination$.next(this.categorypagination$.value+1)

     }

      fetchvendorproducts(){


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
console.log(products);
          if(products.length==0){
            this.fetchmorebtnstate=true
            return this.products$.value

          }
          const incomingproduct=products[products.length-1]
          const currentproducts= this.products$.value[this.products$.value.length-1]
          console.log('current product',currentproducts);
          console.log('current incomingproduct',incomingproduct);

           if(currentproducts !=undefined &&incomingproduct._id==currentproducts._id)return this.products$.value

          this.products$.next([...this.products$.value,...products])
          return this.products$.value
        })

        )

      }


      get  viewcategoryproducts():Observable<Product[]>{

        //this.viewproducts$=

        return    this.categorypaginationObs$.pipe(switchMap(res=>{

          console.log('category from category service: ',this.categoryservice.currentcategory);

          let categoryurl=this.FETCH_CATEGORY_PRODUCTS_URL+`categoryid=${this.categoryservice.currentcategory}&pagination=${res}`

          // const url=this.FETCH_PRODUCTS_URL+`${res}`

         return this.productendpoints.GETALL(categoryurl)
        }),map((products:Product[])=>{
console.log(products);
          if(products.length==0){

            console.log('no more ',this.category,'to show');

            this.fetchmorebtnstate=true
            return this.categoryproducts$.value

          }

          if(this.categoryproducts$.value.length==0){
              this.categoryproducts$.next(products)
             return this.categoryproducts$.value
            }
          const incomingproduct=products[products.length-1]
          const currentproducts= this.categoryproducts$.value[this.categoryproducts$.value.length-1]
          console.log('current product',currentproducts);
          console.log('current incomingproduct',incomingproduct);

           if(currentproducts !=undefined &&incomingproduct._id==currentproducts._id)return this.categoryproducts$.value

          this.categoryproducts$.next([...this.categoryproducts$.value,...products])
          return this.categoryproducts$.value
        })

        )

      }

      get  vendorproducts():Observable<Product[]>{

        //this.viewproducts$=
        return    this.storepaginationObs$.pipe(switchMap(res=>{

          const url=this.ROOT_STORES_PRODUCTS_URL+`${this.storeid}?pagination=${res}`

         return this.productendpoints.GETALL(url)
        }),map((products:Product[])=>{


          const incomingproducts=products[products.length-1]
          const currentproducts= this.vendorproducts$.value[this.vendorproducts$.value.length-1]

           if(currentproducts !=undefined &&incomingproducts._id==currentproducts._id)return this.vendorproducts$.value
          this.vendorproducts$.next([...this.vendorproducts$.value,...products])
          return this.vendorproducts$.value
        })

        )

      }

      get  adminproducts():Observable<Product[]>{

        //this.viewproducts$=
        return    this.storepaginationObs$.pipe(switchMap(res=>{

          const url=this.ROOT_ADMIN_PRODUCTS_URL+`?pagination=${res}`

         return this.productendpoints.GETALL(url)
        }),map((products:Product[])=>{

          const incomingproducts=products[products.length-1]
          const currentproducts= this.adminproducts$.value[this.adminproducts$.value.length-1]

           if(currentproducts !=undefined &&incomingproducts._id==currentproducts._id)return this.adminproducts$.value

          this.adminproducts$.next([...this.adminproducts$.value,...products])
          return this.adminproducts$.value
        })

        )

      }


      resetpagination(){
        this.pagination$.next(0)
      }
      resetstorepagination(){
        this.storepagination$.next(0)
      }

      resetscategorypagination(){
        this.categorypagination$.next(0)
      }
}
