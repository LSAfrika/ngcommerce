import { Component, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/endpoints/products.service';
import { UiService } from 'src/app/services/frontendservices/ui.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {


  private uiservice= inject(UiService)
  public productservice= inject(ProductsService)
data=1

  closefilter(){
    this.uiservice.openfilter=false
  }

  datafilter(filter:number){

    if(filter==this.productservice.datafilter){
      this.productservice.datafilter=0;
      this.productservice.created=this.productservice.price=0
    // console.log('same data value',this.data)
    // console.log('reset sort criteria value',this.productservice.created,this.productservice.price)


      this.productservice.pagination$.next(0)



      return}
    this.productservice.datafilter=filter

    if(this.productservice.datafilter==1){this.productservice.created=-1,this.productservice.price=0}
    if(this.productservice.datafilter==2){this.productservice.created=1,this.productservice.price=0}
    if(this.productservice.datafilter==3){this.productservice.price=-1,this.productservice.created=0}
    if(this.productservice.datafilter==4){this.productservice.price=1,this.productservice.created=0}

    // console.log('data value',this.data)


      this.productservice. products$=new BehaviorSubject<Product[]>([])
      this.productservice.pagination$.next(0)
      // console.log('sort criteria value',this.productservice.created,this.productservice.price)


  }


}
