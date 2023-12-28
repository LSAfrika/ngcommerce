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
  soldproducts: number,
  orderscount:number
  products:[dashboardproduct],
  orders:[Dashboardorder]
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

interface Dashboardorder{
created:number,
_id:string,
orderstatus:string,
orderowner:{_id:string,username:string},
products:[
  {quantity:number,productprice:number,sumtotal:number,product:{_id:string,productname:string}}
]


}

