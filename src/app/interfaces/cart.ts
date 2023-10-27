import { Product } from "./product";

export interface Cart {
    _id:string
    products:cartproduct[]
    totalprice:number
}

export interface cartproduct{

  product: {
    _id: string,
    productname: string
  },
  quantity:number,
  productprice: number,
  sumtotal: number,
  _id: string

}
