import { Store } from "./store.interface"

export interface Product {
    productname:string
    productprice:string
    _id:string
    productimage:string
    productimages:[string]
    productspecification:[string]
    productdescription:string
    productquantity:number
    store:Store
    category:string
    brand:string
}

export interface producttocart{
  productname:string
  productid:string
  productprice:number
  productquantity:number
}


