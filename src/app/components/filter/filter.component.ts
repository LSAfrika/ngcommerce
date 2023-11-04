import { Component, inject } from '@angular/core';
import { UiService } from 'src/app/services/frontendservices/ui.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {


  private uiservice= inject(UiService)
date=0
price=0
  closefilter(){
    this.uiservice.openfilter=false
  }

  selectdatefilter(filter:number){

    if(filter==this.date){this.date=0;
    console.log('same date value',this.date)

      return}
    this.date=filter


    console.log('date value',this.date)

  }

  selectpricefilter(filter:number){

    if(filter==this.price) {this.price=0;
    console.log('same price value',this.price)

      return}
    this.price=filter

    console.log('price value',this.price)

  }
}
