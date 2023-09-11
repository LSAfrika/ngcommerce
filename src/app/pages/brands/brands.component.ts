import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent {
  activeroute=inject(ActivatedRoute)
  brand:string|null=null
  ngOnInit(){
    this.brand= this.activeroute.snapshot.queryParamMap.get('brand')
   console.log( 'retrived brand: ',this.brand)
  
  }
}
