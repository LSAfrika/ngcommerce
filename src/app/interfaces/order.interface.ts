export interface order{
    created:number
    _id    :string
    orderstatus:string
    orderowner:Orderowner
    ordertotal:Number
    products:[{
        _id:string,
        product:Product,
        productprice:number,
        quantity:number,
        sumtotal:number
    }]
}

interface Orderowner{
    _id:string
    username:string
    
}



interface Product{
    _id:string
    productname:string

}