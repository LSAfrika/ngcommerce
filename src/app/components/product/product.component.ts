import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { UiService } from 'src/app/services/frontendservices/ui.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  public uiservice=inject(UiService)
  public router=inject(Router)
 @Input() product!:Product
 @Input()admin:boolean=false

 disablenavigation=false



  constructor(){
   this.uiservice.getroute()

  // console.log('component initialized');
}
ngOnInit(){

   console.log('admin product: ',this.admin)
 }

 ngOnDestroy(){
  this.disablenavigation=false
 }

 navigate()
{
if(this.disablenavigation==true) return

this.router.navigateByUrl(`/product/${this.product._id}/store/${this.product.store._id}`)
}


mouseenter(){
  // console.log('mouse enetered');
  this.disablenavigation=true


}

mouseleave(){
  // console.log('mouse left');
  this.disablenavigation=false


}
}
