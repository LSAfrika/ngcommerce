import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs';
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

categoryproduct$=this.productservice.viewcategoryproducts
ngOnInit(){
   this.category=this.categoryservice.currentcategory= this.activeroute.snapshot.queryParamMap.get('category')||''
//  console.log( 'retrived category: ',this.category)
// console.log(this.productservice.categoriesurl)

// this.productservice.viewcategoryproducts.subscribe(console.log)

}

fetchnext(){
  this.productservice.fetchcategoryproducts()
}
}
