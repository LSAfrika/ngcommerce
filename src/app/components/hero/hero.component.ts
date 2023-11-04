import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, catchError, debounceTime, EMPTY, map, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/endpoints/products.service';
import { UiService } from 'src/app/services/frontendservices/ui.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {


  searchform!:FormGroup
  private formbuilder=inject(FormBuilder)
  private productservice=inject(ProductsService)
  public uiservice=inject(UiService)
  destroy$=new Subject<void>()

constructor(){
this.initializeserchform()
this.searchoutput()
}

initializeserchform(){
  this.searchform = this.formbuilder.group({
    search:''
  })
}

searchoutput(){
  this.searchform.valueChanges.pipe(
    debounceTime(500),
    tap((search:{search:string})=>{
      this.productservice.searchinput=search.search
      this.productservice.pagination$.next(0)
      this.productservice.products$=new BehaviorSubject<Product[]>([])
console.log('search field',this.productservice.searchinput);


    }),
    catchError((err)=>{
      console.log(err.message)
      return EMPTY
    }),
    takeUntil(this.destroy$)
    ).subscribe();

}

ngOnDestroy(){
  this.destroy$.next()
}

openfilter(){
  this.uiservice.openfilter=true
}

}
