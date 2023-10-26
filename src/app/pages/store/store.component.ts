import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/endpoints/products.service';
import { StoreService } from 'src/app/services/endpoints/store.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {

  private activeroute=inject(ActivatedRoute)
  private productservice=inject(ProductsService)
  private storeservice=inject(StoreService)

  storedetails$
  storeproducts$

constructor(){
 this.storeservice.storeid= this.productservice.storeid= this.activeroute.snapshot.queryParamMap.get('storeid')||''
 this.storedetails$=this.storeservice.storeinfo(this.storeservice.storeid)
 this.storeproducts$=this.productservice.vendorproducts
console.log(this.storeservice.storeid,'\n',this.productservice.storeid);

}

ngOnInit(){

}


ngOnDestroy(){
this.productservice.resetstorepagination()
// this.storeproducts$=of([])
// this.productservice.products$.next([])
console.log('current array value:',this.productservice.products$.value);


this.storeproducts$.subscribe(console.log)

}
fetchmorestoreproducts(){
this.productservice.storepagination$.next(this.productservice.storepagination$.value+1)
}

productngForTrackBy(index:number,product:Product){
  return product._id
}
}
