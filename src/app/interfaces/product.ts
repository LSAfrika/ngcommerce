export interface Product {
    productname:string
    productprice:string
    _id:string
    productimage:string
    productimages:[string]
    category:string
}

export interface addproducttocart{
  productid:string
  productquantity:number
}
