import { Component, inject } from '@angular/core';
import { CartService } from 'src/app/services/frontendservices/cart.service';
import { UiService } from 'src/app/services/frontendservices/ui.service';

@Component({
  selector: 'app-cartpanel',
  templateUrl: './cartpanel.component.html',
  styleUrls: ['./cartpanel.component.scss']
})
export class CartpanelComponent {
  public cartservice=inject(CartService)
  public uiservice=inject(UiService)
  itemindex=0
  totalamount=0

constructor(){
  this.cartservice.totalprice()
}



  reducequantity(i:number){

    this.cartservice.reducequantity(i)

  //   if(this.cartservice.activecart[i].productquantity==1){

  //     this.itemindex=i
  //     this.uiservice.cartpaneldeleteoverlay$.next(true)
  //     this.totalprice()

  //     return
  //   }


  //   this.cartservice.activecart[i]={
  //     productname:this.cartservice.activecart[i].productname,
  //     productid:this.cartservice.activecart[i].productid,
  //     productquantity:this.cartservice.activecart[i].productquantity-1,
  //     productprice:this.cartservice.activecart[i].productprice

  //   }

  //  // console.log('product reduced',this.cartservice.activecart[i]);
  //  this.totalprice()



  }
  increasequantity(i:number){


    this.cartservice.increasequantity(i)

  //   this.cartservice.activecart[i]={
  //     productname:this.cartservice.activecart[i].productname,
  //     productid:this.cartservice.activecart[i].productid,
  //     productquantity:this.cartservice.activecart[i].productquantity+1,
  //     productprice:this.cartservice.activecart[i].productprice

  //   }

  //   this.totalprice()

  //  // console.log('product increased',this.cartservice.activecart[i]);

  }


  // removeproductfromcart(){
  //   this.cartservice.activecart.splice(this.itemindex,1)
  //   this.totalprice()
  //   this.closemodalpanel()
  // }
  // closemodalpanel(){
  //   this.uiservice.cartpaneldeleteoverlay$.next(false)
  // }

  // checkoutprompt(){
  //   alert('intergrate stripe api for payment')
  // }

//   totalprice(){
// this.totalamount=0

//    const calcarray= this.cartservice.activecart.
//    map(product=> {return{productprice:product.productprice,productquantity:product.productquantity}})
//   //  map(product=> {return{productprice:product.productprice,productquantity:product.productquantity}})

//   calcarray.forEach(product=>{

//     this.totalamount=this.totalamount +(product.productprice*product.productquantity)

//   })
//   // console.log(calcarray);
//   // console.log('total price: ',this.totalamount);


//   }
}
