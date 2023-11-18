import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/endpoints/products.service';
import { BrandsandcategoriesService } from 'src/app/services/frontendservices/brandsandcategories.service';
import { UiService } from 'src/app/services/frontendservices/ui.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  public uiservice= inject(UiService)

  @Output()category:EventEmitter<string>=new EventEmitter<string>()
  public brandcategoryservice= inject(BrandsandcategoriesService)
  private router=inject(Router)
  private activeroute=inject(ActivatedRoute)
  private endpointsprodcutservice=inject(ProductsService)
  currentlocation=''
urlpage=''
// close=false
constructor(){console.log('current route: ',this.brandcategoryservice.currentcategory);

const array=this.brandcategoryservice.currentcategory.split('%20')
  console.log('current category',this.endpointsprodcutservice.category);
this.currentlocation=this.router.url.split('?')[0]


this.geturlsegmentandquery()
}

geturlsegmentandquery(){
  this.urlpage=this.router.url.split('?')[0]
  const urlquery=this.router.url.split('?')[1]

  const segment= urlquery.split('=')[1]
  // console.log(segment)

  if(this.urlpage=='/categories'){console.log('page is categories:',this.urlpage);console.log('urlpage segment:',segment);this.brandcategoryservice.currentcategory=segment}
  if(this.urlpage=='/brands'){console.log('page is brands:',this.urlpage);;console.log('url segment:',segment);this.brandcategoryservice.currentbrand=segment}
}
  closepanels(){


this.uiservice.closeallpanels()
  }


  setcategory(category:string){


    if(category==this.brandcategoryservice.currentcategory){
      this.uiservice.closeallpanels()

      return
    }
   category=='All categories' ?
   this.endpointsprodcutservice.category=this.brandcategoryservice.currentcategory='all' :
   this.endpointsprodcutservice.category=this.brandcategoryservice.currentcategory=category

    this.endpointsprodcutservice.categoryproducts$=new BehaviorSubject<Product[]>([])
console.log('current categories:',this.endpointsprodcutservice.category);
if(this.currentlocation=='/categories') this.router.navigateByUrl(`/categories?category=${category}`)

if(this.currentlocation=='/store'){
  this.endpointsprodcutservice.vendorproducts$=new BehaviorSubject<Product[]>([])

  this.category.emit(this.endpointsprodcutservice.category)
  this.endpointsprodcutservice.storepagination$.next(0)
    console.log('we are in the store page');}

    this.endpointsprodcutservice.resetscategorypagination()
    this.uiservice.closeallpanels()


  }


setbrand(brand:string){

  this.brandcategoryservice.currentbrand=brand
this.uiservice.closeallpanels()

}


}
