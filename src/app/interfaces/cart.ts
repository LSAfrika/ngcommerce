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

export interface cartupdatetransporter{
  cartproducts:[
    {
      product:{
        _id:string,
        quantity:number
      }
    }
  ]
}

export interface Carthistory{
  _id:string
  cartowner:string
  completedcarts:[productincart]

}

export interface productincart {
  products:[productarray]
  totalprice:number
  timestamp:number

  _id:string
}


interface productarray{
  product:{
    _id:string
  productname:string
  productprice:number
  category:string
  },
  _id:string
  quantity:number
  sumtotal:number

}
