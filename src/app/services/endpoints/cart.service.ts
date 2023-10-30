import { Injectable, inject } from '@angular/core';
import { IndexRoutesService } from './index.routes.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  ROOT_CART_URL='http://localhost:3000/api/v1/cart/'
  private endpoints=inject(IndexRoutesService)

  cartdata:any
  usercartid='1'



  
 
  createcart(){
  
return this.endpoints.POST(this.ROOT_CART_URL,this.cartdata)
  }

  updatecart(){
  return this.endpoints.CARTPATCH(this.ROOT_CART_URL+'updatecart',this.cartdata)

  }

  // deleteuserccart(){
  //   return this.endpoints.DELETE(this.ROOT_CART_URL,this.usercartid)

  // }

  resetcart(){
    const resetcartroute=this.ROOT_CART_URL+'reset'

    return this.endpoints.POST(resetcartroute,{})
  }
}
