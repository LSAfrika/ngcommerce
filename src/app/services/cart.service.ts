import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { producttocart } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  activecart:producttocart[]=[

{productid:'0',productname:'huawei 10',productquantity:3,productprice:16000},
{productid:'1',productname:'samsung s 10',productquantity:3,productprice:21000},
{productid:'2',productname:'xperia xz4',productquantity:3,productprice:32400},
{productid:'3',productname:'hisense 43"',productquantity:1,productprice:20000},



  ]
  constructor() { }


}
