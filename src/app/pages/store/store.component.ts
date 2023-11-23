import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/endpoints/products.service';
import { StoreService } from 'src/app/services/endpoints/store.service';
import { delay, of } from 'rxjs';
import { UiService } from 'src/app/services/frontendservices/ui.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {

  private activeroute=inject(ActivatedRoute)
  public productservice=inject(ProductsService)
  private storeservice=inject(StoreService)
  public uiservice=inject(UiService)

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

category(event:string){
  console.log(event)
  this.storeproducts$=this.productservice.vendorproducts
}
ngOnDestroy(){
this.productservice.resetstorepagination()
// this.storeproducts$=of([])
// this.productservice.products$.next([])
console.log('current array value:',this.productservice.products$.value);


// this.storeproducts$.subscribe(console.log)

}
fetchmorestoreproducts(){
this.productservice.storepagination$.next(this.productservice.storepagination$.value+1)
}

productngForTrackBy(index:number,product:Product){
  return product._id
}
}
