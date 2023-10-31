import { Injectable,inject } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Cart, cartupdatetransporter } from 'src/app/interfaces/cart';
import { Product, producttocart } from '../../interfaces/product';
import { IndexRoutesService } from '../endpoints/index.routes.service';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class FrontEndCartService {

  private uiservice=inject(UiService)
  private indexendpoints=inject(IndexRoutesService)
  ROOT_CART_URL='http://localhost:3000/api/v1/cart/'


activecart$!: BehaviorSubject<Cart>

  totalamount=0
  itemindex=0

  constructor() { }

  closecartpanel(){
    this.uiservice.cartpanel$.next(false)
      }


     get fetchcart$():Observable<Cart>{
      const getcart=this.ROOT_CART_URL+'getcart'
      return this.indexendpoints.GETALL(getcart).pipe(map((cart:Cart)=>{ return cart}))
      }

      removecartitem(product:string){
        const deleteproductfromcarturl=this.ROOT_CART_URL+'deleteproduct'
      return this.indexendpoints.CARTDELETEPRODUCT(deleteproductfromcarturl,product )

      }


      updatecart(updatedata:cartupdatetransporter){
        const cartupdateurl= this.ROOT_CART_URL+'updatecart'
        return this.indexendpoints.CARTPATCH(cartupdateurl,updatedata)
      }


      removeproductfromcart(){
        // this.activecart.splice(this.itemindex,1)
        // this.totalprice()
        this.closemodalpanel()
      }
      closemodalpanel(){
        this.uiservice.cartpaneldeleteoverlay$.next(false)
      }

      checkoutprompt(){
        alert('intergrate stripe api for payment')
      }


}
