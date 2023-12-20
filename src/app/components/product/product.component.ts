import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, switchMap, tap, takeUntil } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { CartService } from 'src/app/services/endpoints/cart.service';
import { FrontEndCartService } from 'src/app/services/frontendservices/cart.service';
import { UiService } from 'src/app/services/frontendservices/ui.service';
import { ProductService } from 'src/app/services/frontendservices/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  public uiservice=inject(UiService)
  public router=inject(Router)
  private backendcartservice=inject(CartService)
  private frontendcartservice=inject(FrontEndCartService)
  private frontendproductservice=inject(ProductService)
addedtocart=false
  modalmessage='adding to cart'
 @Input() product!:Product
 @Input()admin:boolean=false
 @Output()producttoemit:EventEmitter<{product:Product,modal:number}>=new EventEmitter<{product:Product,modal:number}>()

 disablenavigation=false
destroy$=new Subject<void>()


  constructor(){
   this.uiservice.getroute()

  // console.log('component initialized');
}
ngOnInit(){

   console.log('admin product: ',this.admin)
 }

 ngOnDestroy(){
  this.disablenavigation=false
 }

 navigate()
{
if(this.disablenavigation==true) return

this.router.navigateByUrl(`/product/${this.product._id}/store/${this.product.store._id}`)
}


mouseenter(){
  // console.log('mouse enetered');
  this.disablenavigation=true


}

mouseleave(){
  // console.log('mouse left');
  this.disablenavigation=false


}

producttoedit(){
  console.log('product edit: ',this.product);

  this.producttoemit.emit({product:this.product,modal:0})
}


addproduct(productid:string){

  if(this.addedtocart==true){

    this.uiservice.globalmodalproduct$.next(true)
    this.uiservice.modalspinner$.next(false)
    this.uiservice.productmodalmessage='product already in cart'
    setTimeout(() => {
    this.uiservice.globalmodalproduct$.next(false)
    this.uiservice.modalspinner$.next(false)
    this.modalmessage=''


    }, 2500);

    return
  }
  this.uiservice.logintredirectroute= this.uiservice.getroute()
  console.log('product route: ',this.uiservice.logintredirectroute);

  if(this.uiservice.navbar$.value==false)  {this.router.navigateByUrl('/login');return}





  const cartproducts=[
 {product:   {

  _id:productid,
     quantity:1
    }}
  ]

  this.backendcartservice.cartdata={cartproducts}
  console.log('cart data:',this.backendcartservice.cartdata);
  this.uiservice.productmodalmessage='adding to cart'
  // this.uiservice.globalmodal$.next(true)
this.uiservice.globalmodalproduct$.next(true)

   this.backendcartservice.updatecart().pipe(switchMap(()=>{
    return this.frontendcartservice.fetchcart$
   }),tap(res=>{console.log('cart updated:',res);

   if(res)this.frontendcartservice.cartproductcount$.next(res.products.length)
   this.frontendproductservice.productcount$.next(1);this.resetmodal() }),takeUntil(this.destroy$)).subscribe()

}


resetmodal(){
  this.uiservice.productmodalmessage=`${this.product.productname} added to cart`
  this.uiservice.modalspinner$.next(false)
this.addedtocart=true
  setTimeout(() => {
    this.uiservice.globalmodalproduct$.next(false)
  this.uiservice.modalspinner$.next(true)

  }, 3000);
}

}
