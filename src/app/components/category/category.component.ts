import { Component, EventEmitter, inject, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject, takeUntil, tap } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/endpoints/products.service';
import { StoreService } from 'src/app/services/endpoints/store.service';
import { UserService } from 'src/app/services/endpoints/user.service';
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
  public storeservice= inject(StoreService)
  public userservice= inject(UserService)
  private router=inject(Router)
  private activeroute=inject(ActivatedRoute)
  private endpointsprodcutservice=inject(ProductsService)
  currentlocation=''
  fav='loading...'
urlpage=''
destroy$=new Subject<void>()
// close=false
constructor(){
  console.log('current route: ',this.brandcategoryservice.currentcategory);

const array=this.brandcategoryservice.currentcategory.split('%20')
  console.log('current category',this.endpointsprodcutservice.category);
this.currentlocation=this.router.url.split('?')[0]

console.log('current location',this.currentlocation);

this.geturlsegmentandquery()
this.storefavoritedcheck()

}


ngOnDestroy(){
  this.destroy$.next()
  this.destroy$.complete()
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
storefavoritedcheck(){
  setTimeout(() => {
    if(this.userservice.user.value ==undefined)return
    const storeid=this.router.url.split('=')[1]
    this.storeservice.storefavoritedcheck(storeid).pipe(takeUntil(this.destroy$)).subscribe(res=>{
      res.favorited==true?this.fav='remove store from favorites':this.fav='add store to favorites'
    })
  }, 500);

}

addremovestorefromfavorites(){
const storeid=this.router.url.split('=')[1]

  this.uiservice.globalmodal$.next(true)
  this.fav=='add store to favorites' ? this.uiservice.globalmodalmessage='removing store': this.uiservice.globalmodalmessage='adding store'

  this.storeservice.addremovestorefromfavorites(storeid).pipe(
    tap(res=>{
      if(res.message)this.httprequestcomplete(res.message),this.storefavoritedcheck()
      if(res.errormessage)this.httprequestcomplete(res.errormessage)
    }),
    takeUntil(this.destroy$)
    ).    subscribe()
}
httprequestcomplete(message:string){
  this.uiservice.globalmodalmessage=message
  this.uiservice.modalspinner$.next(false)
  setTimeout(() => {
  this.uiservice.modalspinner$.next(true)

    this.uiservice.globalmodal$.next(false)

  }, 2500);
}

}
