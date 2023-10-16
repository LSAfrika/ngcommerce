import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productcount$=new BehaviorSubject(1)
  constructor() { }

  incrementproduct(){

    this.productcount$.next(this.productcount$.value+1)
  }

  decrementproduct(){
    if(this.productcount$.value==1)return
    this.productcount$.next(this.productcount$.value-1)

  }
}
