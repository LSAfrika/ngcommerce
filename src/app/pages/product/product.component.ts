import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/frontendservices/product.service';
import { UiService } from 'src/app/services/frontendservices/ui.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {


  public uiservice=inject(UiService)
  public productservice=inject(ProductService)
  public router=inject(Router)



  addproduct(){
    this.uiservice.logintredirectroute= this.uiservice.getroute()
    console.log('product route: ',this.uiservice.logintredirectroute);

    if(this.uiservice.navbar$.value==false)  {this.router.navigateByUrl('/login');return}

    console.log('logic to update cart',this.productservice.productcount$.value);

  }


}
