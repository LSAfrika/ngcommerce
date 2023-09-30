import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
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
  private router=inject(Router)

// close=false
constructor(){console.log('current route: ',this.brandcategoryservice.currentcategory);
this.geturlsegmentandquery()
}
  closepanels(){


this.uiservice.closeallpanels()
  }


  setcategory(category:string){

    this.brandcategoryservice.currentcategory=category
this.uiservice.closeallpanels()


  }


setbrand(brand:string){

  this.brandcategoryservice.currentbrand=brand
this.uiservice.closeallpanels()

}

geturlsegmentandquery(){
  const urlpage=this.router.url.split('?')[0]
  const urlquery=this.router.url.split('?')[1]

  const segment= urlquery.split('=')[1]
  // console.log(segment)

  if(urlpage=='/categories'){console.log('page is categories:',urlpage);console.log('urlpage segment:',segment);this.brandcategoryservice.currentcategory=segment}
  if(urlpage=='/brands'){console.log('page is brands:',urlpage);;console.log('url segment:',segment);this.brandcategoryservice.currentbrand=segment}
}
}
