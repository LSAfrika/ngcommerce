import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, delay } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/endpoints/products.service';
import { BrandsandcategoriesService } from 'src/app/services/frontendservices/brandsandcategories.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
activeroute=inject(ActivatedRoute)
productservice=inject(ProductsService)
categoryservice=inject(BrandsandcategoriesService)
brand=''
category:string|null=null

categoryproduct$
constructor(){

  this.productservice.categoryproducts$=new BehaviorSubject<Product[]>([])
   this.category=this.categoryservice.currentcategory= this.activeroute.snapshot.queryParamMap.get('category')||''
  console.log( 'retrived category: ',this.categoryservice.currentcategory)
// console.log(this.productservice.categoriesurl)
this.categoryproduct$=this.productservice.viewcategoryproducts

// this.productservice.viewcategoryproducts.subscribe()

}

fetchnext(){
  this.productservice.fetchcategoryproducts()
}
}
