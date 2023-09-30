import { Component, inject } from '@angular/core';
import { BrandsandcategoriesService } from 'src/app/services/brandsandcategories.service';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  public uiservice= inject(UiService)
  public brandcategoryservice= inject(BrandsandcategoriesService)
// close=false
  closepanels(){



this.uiservice.closeallpanels()
  }


  setcategory(category:string){

    this.brandcategoryservice.storecategory=category
this.uiservice.closeallpanels()


  }


setbrand(brand:string){

  this.brandcategoryservice.storebrand=brand
this.uiservice.closeallpanels()

}
}
