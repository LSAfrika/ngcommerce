import { Component, inject } from '@angular/core';
import { of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { FrontEndCartService } from 'src/app/services/frontendservices/cart.service';
import { CartService } from 'src/app/services/endpoints/cart.service';
import { UiService } from 'src/app/services/frontendservices/ui.service';

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
destroy$=new Subject<void>()
componentcart$=this.cartservice.fetchcart$

modalmessage=' placeholder'
productid=''
constructor(){
  this.cartservice.totalprice()

}

ngOnDestroy(){
  this.destroy$.next()
}



  reducequantity(i:number){

    this.cartservice.reducequantity(i)

  }
  increasequantity(i:number){
    this.cartservice.increasequantity(i)
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
