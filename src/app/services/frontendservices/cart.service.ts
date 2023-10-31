import { Injectable,inject } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Cart } from 'src/app/interfaces/cart';
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
  reducequantity(i:number){

  //   if(this.activecart[i].productquantity==1){

  //     this.itemindex=i
  //     this.uiservice.cartpaneldeleteoverlay$.next(true)
  //     this.totalprice()

  //     return
  //   }


  //   this.activecart[i]={
  //     productname:this.activecart[i].productname,
  //     productid:this.activecart[i].productid,
  //     productquantity:this.activecart[i].productquantity-1,
  //     productprice:this.activecart[i].productprice

  //   }


  //  this.totalprice()



  }

  increasequantity(i:number){

    // this.activecart[i]={
    //   productname:this.activecart[i].productname,
    //   productid:this.activecart[i].productid,
    //   productquantity:this.activecart[i].productquantity+1,
    //   productprice:this.activecart[i].productprice

    // }

    // this.totalprice()

   // console.log('product increased',this.cartservice.activecart[i]);

  }


  totalprice(){
    this.totalamount=0

      //  const calcarray= this.activecart.
      //  map(product=> {return{productprice:product.productprice,productquantity:product.productquantity}})


      // calcarray.forEach(product=>{

      //   this.totalamount=this.totalamount +(product.productprice*product.productquantity)

      // })



      }


      removeproductfromcart(){
        // this.activecart.splice(this.itemindex,1)
        this.totalprice()
        this.closemodalpanel()
      }
      closemodalpanel(){
        this.uiservice.cartpaneldeleteoverlay$.next(false)
      }

      checkoutprompt(){
        alert('intergrate stripe api for payment')
      }


}
