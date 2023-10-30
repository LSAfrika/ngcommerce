import { Component, inject, Input } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/endpoints/cart.service';
import { FrontEndCartService } from 'src/app/services/frontendservices/cart.service';
import { ProductsService } from 'src/app/services/endpoints/products.service';
import { ProductService } from 'src/app/services/frontendservices/product.service';
import { UiService } from 'src/app/services/frontendservices/ui.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  private activeroute=inject(ActivatedRoute)
  private backendcartservice=inject(CartService)
  private frontendcartservice=inject(FrontEndCartService)

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

  }


  ngOnDestroy(){
    this.destroy$.next()
    this.destroy$.complete()
  }
  addproduct(){
    this.uiservice.logintredirectroute= this.uiservice.getroute()
    console.log('product route: ',this.uiservice.logintredirectroute);

    if(this.uiservice.navbar$.value==false)  {this.router.navigateByUrl('/login');return}

    const cartproducts=[
   {product:   {_id:this.productid,
       quantity:this.frontendproductservice.productcount$.value
      }}
    ]
    
    this.backendcartservice.cartdata={cartproducts}
    console.log('cart data:',this.backendcartservice.cartdata);
     this.backendcartservice.updatecart().pipe(switchMap(()=>{
      return this.frontendcartservice.fetchcart$
     }),tap(res=>{console.log('cart updated:',res)}),takeUntil(this.destroy$)).subscribe()

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
