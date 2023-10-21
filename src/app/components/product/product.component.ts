import { Component, inject, Input } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { UiService } from 'src/app/services/frontendservices/ui.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  public uiservice=inject(UiService)
 @Input() product!:Product



  constructor(){
   this.uiservice.getroute()

  // console.log('component initialized');
}
ngOnInit(){

   console.log('current product: ',this.product)
 }
}
