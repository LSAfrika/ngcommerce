import { Injectable,inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { producttocart } from '../interfaces/product';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private uiservice=inject(UiService)

  activecart:producttocart[]=[

{productid:'0',productname:'huawei 10',productquantity:3,productprice:16000},
{productid:'1',productname:'samsung s 10',productquantity:3,productprice:21000},
{productid:'2',productname:'xperia xz4',productquantity:3,productprice:32400},
{productid:'3',productname:'hisense 43"',productquantity:1,productprice:20000},
  ]

  totalamount=0
  itemindex=0

  constructor() { }

  closecartpanel(){
    this.uiservice.cartpanel$.next(false)
      }

  reducequantity(i:number){

    if(this.activecart[i].productquantity==1){

      this.itemindex=i
      this.uiservice.cartpaneldeleteoverlay$.next(true)
      this.totalprice()

      return
    }


    this.activecart[i]={
      productname:this.activecart[i].productname,
      productid:this.activecart[i].productid,
      productquantity:this.activecart[i].productquantity-1,
      productprice:this.activecart[i].productprice

    }

   // console.log('product reduced',this.cartservice.activecart[i]);
   this.totalprice()



  }

  increasequantity(i:number){

    this.activecart[i]={
      productname:this.activecart[i].productname,
      productid:this.activecart[i].productid,
      productquantity:this.activecart[i].productquantity+1,
      productprice:this.activecart[i].productprice

    }

    this.totalprice()

   // console.log('product increased',this.cartservice.activecart[i]);

  }


  totalprice(){
    this.totalamount=0
    
       const calcarray= this.activecart.
       map(product=> {return{productprice:product.productprice,productquantity:product.productquantity}})
    
    
      calcarray.forEach(product=>{
    
        this.totalamount=this.totalamount +(product.productprice*product.productquantity)
    
      })
   
    
    
      }


      removeproductfromcart(){
        this.activecart.splice(this.itemindex,1)
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
