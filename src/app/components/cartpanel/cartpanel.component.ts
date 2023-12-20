import { Component, inject } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, map, Observable, of, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { FrontEndCartService } from 'src/app/services/frontendservices/cart.service';
import { CartService } from 'src/app/services/endpoints/cart.service';
import { UiService } from 'src/app/services/frontendservices/ui.service';
import { Cart, Carthistory, cartupdatetransporter,productincart } from 'src/app/interfaces/cart';
import { HttpErrorResponse } from '@angular/common/http';
import { PaymentsService } from 'src/app/services/frontendservice/payments.service';

@Component({
  selector: 'app-cartpanel',
  templateUrl: './cartpanel.component.html',
  styleUrls: ['./cartpanel.component.scss']
})
export class CartpanelComponent {
  public cartservice=inject(FrontEndCartService)
  public backendcartservice=inject(CartService)
  public uiservice=inject(UiService)
  public paymentservice=inject(PaymentsService)
  itemindex=0
  totalamount=0
  increaseproduct=0
  decreaseproduct=0
  orderdetails!:productincart
destroy$=new Subject<void>()
componentcart$=this.cartservice.fetchcart$
completedcarts$=this.cartservice.completedorders.pipe(catchError((err:HttpErrorResponse)=>{
  console.log('error while fetch completed cart:\n',err.message);
  return EMPTY

}),
tap(res=>{
  if(this.cartservice.carthistory$ == undefined) this.cartservice.carthistory$=new BehaviorSubject<Carthistory>(res)
  ,console.log('cart subject in tap: ',this.cartservice.carthistory$.value)})
)
// completedcarts$=this.carthistorycachecontroller
modalmessage=' placeholder'
productid=''
constructor(){
  // this.cartservice.totalprice()

}

ngOnInit(){
 // this.paymentservice.stripeinitialize()
   this.cartservice.completedorders.subscribe(res=>console.log('cart history detail',res))
 // this.completedcarts$.subscribe(console.log)
// this.cartservice.carthistory$==undefined ? console.log('carthistory is undefined'): console.log(this.cartservice.carthistory$.value);

}


get carthistorycachecontroller():Observable<Carthistory>{

  let carthistory$!:Observable<Carthistory>
  if( this.cartservice.carthistory$!==undefined) {carthistory$= this.cartservice.carthistory$.asObservable()}

  if( this.cartservice.carthistory$==undefined){
console.log('history undefined');

    carthistory$=this.cartservice.completedorders.pipe(tap((res:Carthistory)=>{ this.cartservice.carthistory$.next(res)}))
  }

  return carthistory$
}

ngOnDestroy(){
  this.destroy$.next()
}


openordermodal(i:number){
  this.cartservice.vieworderdetails$.next(true)
  this.orderdetails=this.cartservice.carthistory$?.value.completedcarts[i]
  console.log('order to view',this.orderdetails);

}

closecartpanel(){
  this.cartservice.closecartpanel()
  this.cartactivesection('cart')
}
cartactivesection(section:string){
  this.cartservice.cartactivesection$.next(section)

  // console.log('cart history Bsubject: ',this.cartservice.carthistory$.value);

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
console.log('cart update up:',res);

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
    this.cartservice.cartproductcount$.next(cart.products.length)
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


checkout(){

  this.uiservice.globalmodalcart$.next(true)
  this.modalmessage='processing your cart..'
  this.paymentservice.checkoutcart().pipe(
    //switchMap()
    catchError((errres:any)=>{console.log('stripe error:\n',errres.errormessage,errres.error.type);
    return of({catcherror:'an error occured',errormessage:errres})
    })
  ).subscribe((res)=>
  {

    console.log('stripe res',res)

    this.uiservice.modalspinner$.next(false)
    if(res.catcherror)console.log('stripe error log',res),this.modalmessage=res.catcherror
    if(res.checkouturl){
      console.log('stripe log',res),this.modalmessage='checking out'
       window.location.replace(res.checkouturl)
   //   this.resetglobalmodal()
    }
    this.resetglobalmodal()


  }
  )
}

resetglobalmodal(){
  setTimeout(() => { this.modalmessage='',this.uiservice.modalspinner$.next(true), this.uiservice.globalmodalcart$.next(false)}, 2000);
}
}
