import { Component, inject } from '@angular/core';
import { of, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { FrontEndCartService } from 'src/app/services/frontendservices/cart.service';
import { CartService } from 'src/app/services/endpoints/cart.service';
import { UiService } from 'src/app/services/frontendservices/ui.service';
import { Cart, cartupdatetransporter } from 'src/app/interfaces/cart';

@Component({
  selector: 'app-cartpanel',
  templateUrl: './cartpanel.component.html',
  styleUrls: ['./cartpanel.component.scss']
})
export class CartpanelComponent {
  public cartservice=inject(FrontEndCartService)
  public backendcartservice=inject(CartService)
  public uiservice=inject(UiService)
  itemindex=0
  totalamount=0
  increaseproduct=0
  decreaseproduct=0
destroy$=new Subject<void>()
componentcart$=this.cartservice.fetchcart$

modalmessage=' placeholder'
productid=''
constructor(){
  // this.cartservice.totalprice()

}

ngOnDestroy(){
  this.destroy$.next()
}


openordermodal(){
  this.cartservice.vieworderdetails$.next(true)
}

cartactivesection(section:string){
  this.cartservice.cartactivesection$.next(section)
}


  reducequantity(i:number,productid:string){
    this.decreaseproduct++
    let newquantity=i-this.decreaseproduct
    if(newquantity<1) {newquantity=1; return }

    const cartproducts:cartupdatetransporter=
   { cartproducts:[
      {product:   {

       _id:productid,
          quantity:newquantity
         }}
       ]}

    console.log({cartproducts});

    //this.cartservice.reducequantity(i)
    this.cartupdate(cartproducts)

  }
  increasequantity(i:number,productid:string){
this.increaseproduct++

const newquantity=i+this.increaseproduct
console.log({newquantity,productid});


const cartproducts:cartupdatetransporter=
{ cartproducts:[
   {product:   {

    _id:productid,
       quantity:newquantity
      }}
    ]}

console.log({cartproducts});

this.cartupdate(cartproducts)

   // this.cartservice.increasequantity(i)
  }


  cartupdate(cartproducts:cartupdatetransporter){

    this.modalmessage='updating cart'
    this.uiservice.globalmodalcart$.next(true)
    this.cartservice.updatecart(cartproducts).pipe(
      tap((res:Cart)=>{this.componentcart$=of(res);
        this.modalmessage='cart updated'

        this.uiservice.modalspinner$.next(false)

        setTimeout(() => {
          this.uiservice.globalmodalcart$.next(false)
          this.increaseproduct=this.decreaseproduct=0
          this.modalmessage='placeholder'
          this.uiservice.modalspinner$.next(true)
        }, 2000);

      })
      ,takeUntil(this.destroy$))
      .subscribe()


  }

  confirmcartoverlay(productid:string){

    console.log('product to delete:',productid);
    this.productid=productid
this.uiservice.cartpaneldeleteoverlay$.next(true)
  }

  deletecartproduct(){

    this.modalmessage='deleting product'
    this.uiservice.globalmodalcart$.next(true)
    // console.log('cart bool:',this.uiservice.globalmodalcart$.value);

    this.uiservice.cartpaneldeleteoverlay$.next(false)
this.cartservice.removecartitem(this.productid).pipe(
  switchMap(()=>{return this.cartservice.fetchcart$}),
  tap((cart)=>{

    this.componentcart$=of(cart)
    this.modalmessage=' product deleted successfully'
    this.uiservice.modalspinner$.next(false)
    setTimeout(() => {
      this.uiservice.globalmodalcart$.next(false)
      this.modalmessage=' deleting product'
      this.uiservice.modalspinner$.next(true)
    }, 3000);


  }),
  takeUntil(this.destroy$))
  .subscribe()

  }

  cancelprompt(){
    this.cartservice.closemodalpanel()
  }


cartproducttrack(index:number,product:any){
  return product.product._id
}
}
