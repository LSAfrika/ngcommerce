import { Component, inject, Input } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/endpoints/products.service';
import { ProductService } from 'src/app/services/frontendservices/product.service';
import { UiService } from 'src/app/services/frontendservices/ui.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  private activeroute=inject(ActivatedRoute)

  public uiservice=inject(UiService)
  public backendproductservice=inject(ProductsService)
  public frontendproductservice=inject(ProductService)
  public router=inject(Router)
  productid=''
  storeid=''
  viewproduct$!:Observable<Product>
  viewstoreproduct$!:Observable<Product[]>

  constructor(){
    this.productid= this.activeroute.snapshot.params['productid']
    this.storeid= this.activeroute.snapshot.params['storeid']
this.viewproduct$=this.backendproductservice.viewproduct(this.productid)
this.viewstoreproduct$= this.backendproductservice.storeproducts(this.storeid)

  }

  addproduct(){
    this.uiservice.logintredirectroute= this.uiservice.getroute()
    console.log('product route: ',this.uiservice.logintredirectroute);

    if(this.uiservice.navbar$.value==false)  {this.router.navigateByUrl('/login');return}

     console.log('logic to update cart',this.frontendproductservice.productcount$.value);

  }

  imageforward(n:number){
    this.backendproductservice.currentimage++
    if(this.backendproductservice.currentimage>=n)this.backendproductservice.currentimage=0

  }
  imagebackward(n:number){
    this.backendproductservice.currentimage--
    if(this.backendproductservice.currentimage<0)this.backendproductservice.currentimage=n-1

  }


}
