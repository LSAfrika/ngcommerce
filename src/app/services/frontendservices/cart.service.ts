import { Injectable,inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { producttocart } from '../../interfaces/product';
import { IndexRoutesService } from '../endpoints/index.routes.service';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private uiservice=inject(UiService)
  private indexendpoints=inject(IndexRoutesService)
  ROOT_CART_URL='http://localhost:3000/api/v1/cart/getcart'
//   activecart:producttocart[]=[

// {productid:'0',productname:'huawei 10',productquantity:3,productprice:16000},
// {productid:'1',productname:'samsung s 10',productquantity:3,productprice:21000},
// {productid:'2',productname:'xperia xz4',productquantity:3,productprice:32400},
// {productid:'3',productname:'hisense 43"',productquantity:1,productprice:20000},
//   ]

activecart$=new BehaviorSubject<producttocart[]>([])

  totalamount=0
  itemindex=0

  constructor() { }

  closecartpanel(){
    this.uiservice.cartpanel$.next(false)
      }


      removecartitem(i:number){
        this.itemindex=i
      this.uiservice.cartpaneldeleteoverlay$.next(true)

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
