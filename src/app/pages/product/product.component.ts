import { Component, inject, Input } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { BehaviorSubject, catchError, delay, map, Observable, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/endpoints/cart.service';
import { FrontEndCartService } from 'src/app/services/frontendservices/cart.service';
import { ProductsService } from 'src/app/services/endpoints/products.service';
import { ProductService } from 'src/app/services/frontendservices/product.service';
import { UiService } from 'src/app/services/frontendservices/ui.service';
import { BrandsandcategoriesService } from 'src/app/services/frontendservices/brandsandcategories.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/services/endpoints/user.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  private activeroute=inject(ActivatedRoute)
  private backendcartservice=inject(CartService)
  private frontendcartservice=inject(FrontEndCartService)
  private brandcategoryservice=inject(BrandsandcategoriesService)
  public userservice=inject(UserService)
  public fav='loading...'
  public uiservice=inject(UiService)
  public backendproductservice=inject(ProductsService)
  public frontendproductservice=inject(ProductService)
  public router=inject(Router)
  productid=''
  storeid=''
  viewproduct$!:Observable<Product>
  viewstoreproduct$!:Observable<Product[]>
  destroy$=new Subject<void>()


  constructor(){


    this.productid= this.activeroute.snapshot.params['productid']
    this.storeid= this.activeroute.snapshot.params['storeid']
this.viewproduct$=this.backendproductservice.viewproduct(this.productid)
this.viewstoreproduct$= this.backendproductservice.storeproducts(this.storeid)
this.checkiffavorited()
  }

  checkiffavorited(){
    const productid=this.router.url.split('/')[2]
    setTimeout(() => {
  //  console.log('check function triggered and user',this.userservice.user.value);
   if(this.userservice.user!=undefined){
    this.backendproductservice.checkiffovorited(productid).pipe(
tap((res:any)=>{
console.log('response from check:',res)

res==true ?this.fav='remove from favorite':this.fav='add to favorites'


}),
takeUntil(this.destroy$)
    ).subscribe()
  }

 }, 500);
// console.log('time out complete');


  }


  ngOnDestroy(){
    this.destroy$.next()
    this.destroy$.complete()
  }
  addproduct(){
    this.uiservice.logintredirectroute= this.uiservice.getroute()
    console.log('product route: ',this.uiservice.logintredirectroute);

    if(this.uiservice.navbar$.value==false)  {this.router.navigateByUrl('/login');return}

    const productid=this.router.url.split('/')[2]
    console.log('current router url',this.router.url.split('/')[2]);




    const cartproducts=[
   {product:   {

    _id:productid,
       quantity:this.frontendproductservice.productcount$.value
      }}
    ]

    this.backendcartservice.cartdata={cartproducts}
    console.log('cart data:',this.backendcartservice.cartdata);
    this.uiservice.globalmodalmessage='updating cart'
    this.uiservice.globalmodal$.next(true)
     this.backendcartservice.updatecart().pipe(switchMap(()=>{
      return this.frontendcartservice.fetchcart$
     }),tap(res=>{console.log('cart updated:',res);

     this.frontendproductservice.productcount$.next(1);this.resetmodal() }),takeUntil(this.destroy$)).subscribe()

  }

  addproducttofavorite(){
    const productid=this.router.url.split('/')[2]

    this.uiservice.globalmodal$.next(true)
    this.uiservice.globalmodalmessage='addin product to favorites...'
    this.backendproductservice.removeaddproductfromfavorites(productid).pipe(
      catchError((err:HttpErrorResponse)=>{ return of({errormessage:'an error occured try agin later',errorlog:err.message})}),

tap(res=>{


  if(res.message)this.completedaddingproduct(res.message),this.checkiffavorited()
  if(res.errormessage)this.completedaddingproduct(res.errormessage)
})



    ).subscribe()

  }
  completedaddingproduct(message:string){
    this.uiservice.globalmodalmessage=message
    this.uiservice.modalspinner$.next(false)
    setTimeout(() => {
      this.uiservice.globalmodal$.next(false)
    this.uiservice.modalspinner$.next(true)
    this.uiservice.globalmodalmessage=''
    }, 2000);

  }

  resetmodal(){
    this.uiservice.globalmodalmessage=' cart updated'
    this.uiservice.modalspinner$.next(false)

    setTimeout(() => {
      this.uiservice.globalmodal$.next(false)
    this.uiservice.modalspinner$.next(true)

    }, 3000);
  }
  resetcategory(){
    this.backendproductservice.category=this.brandcategoryservice.currentcategory='all'
  }

  getproduct(productid:string,storeid:string){

this.viewproduct$=this.backendproductservice.viewproduct(productid)
this.viewstoreproduct$= this.backendproductservice.storeproducts(storeid)



  }

  imageforward(n:number){
    this.backendproductservice.currentimage++
    if(this.backendproductservice.currentimage>=n)this.backendproductservice.currentimage=0

  }
  imagebackward(n:number){
    this.backendproductservice.currentimage--
    if(this.backendproductservice.currentimage<0)this.backendproductservice.currentimage=n-1

  }


}
