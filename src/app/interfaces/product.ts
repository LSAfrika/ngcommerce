export interface Product {
    productname:string
    productprice:string
    _id:string
    productimage:string
    productimages:[string]
    category:string
}

export interface producttocart{
  productname:string
  productid:string
  productprice:number
  productquantity:number
}
