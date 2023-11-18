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
    viewcount?:number
}

export interface producttocart{
  productname:string
  productid:string
  productprice:number
  productquantity:number
}

export interface Dashboard{
  productcount:number
stockbalance:number
  totalviews: number,
  totalsales: number,
  soldproducts: number
  products:[dashboardproduct]
}

interface dashboardproduct{
      productquantity: number,
      productname:string
      _id:string,
      productprice: number,
      productdeactivated: boolean,
      productimages: [string],
      viewcount: number,
      category:string
      totalsold:number
}



