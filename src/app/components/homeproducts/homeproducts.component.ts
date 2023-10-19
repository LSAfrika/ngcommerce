import { Component, inject } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/endpoints/products.service';

@Component({
  selector: 'app-homeproducts',
  templateUrl: './homeproducts.component.html',
  styleUrls: ['./homeproducts.component.scss']
})
export class HomeproductsComponent {

  public productservice=inject(ProductsService)

  // viewproducts$=this.productservice.getproducts()
  getproducts$:BehaviorSubject<Product[]>=new BehaviorSubject<Product[]>([])
  viewproducts$=this.getproducts$.asObservable()




  getnextproducts(){
    this
  }

}
