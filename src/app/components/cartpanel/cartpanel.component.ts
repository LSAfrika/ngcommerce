import { Component, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
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
constructor(){
  this.cartservice.totalprice()

  // this.cartservice.fetchcart$.pipe(takeUntil(this.destroy$)).subscribe(res=>{
  //   const length=this.cartservice.activecart$.value.products.length
  //   // if(this.cartservice.activecart$.value!=undefined&&this.cartservice.activecart$.value.products[length-1]._id==res.products[res.products.length-1]._id){
  //   //   console.log('cart value is similar')
  //   // }

  //   this.cartservice.activecart$.next(res)
  //   console.log(res)
  // })
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

  removeproductfromcart(i:number){
this.cartservice.removecartitem(i)
  }
 


cartproducttrack(index:number,product:any){
  return product.product._id
}
}
