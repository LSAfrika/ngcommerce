import { Component,inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/endpoints/products.service';
import { AdminService } from 'src/app/services/frontendservices/admin.service';
import { FrontEndCartService } from 'src/app/services/frontendservices/cart.service';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.scss']
})
export class AdminpanelComponent {

  public adminservice=inject(AdminService)
  public cartservice=inject(FrontEndCartService)
  public productsservice=inject(ProductsService)
  private activeroute=inject(ActivatedRoute)

adminproducts$

admindashboardsatistics$=this.adminservice.getdashboard()

  constructor(){
 this.productsservice.adminid=  this.activeroute.snapshot.params['adminid']||''
this.adminproducts$=this.productsservice.adminproducts


  }

  ngOnInit(){
    this.admindashboardsatistics$.subscribe(console.log)

  }

  ngOnDestroy(){
    this.productsservice.resetstorepagination()
  }
  openmodal(index:number){
this.adminservice.switchmodal$.next(index)

console.log('current modal index',this.adminservice.switchmodal$.value);



  this.adminservice.viewmodal$.next(true)


  }

  closemodal(event:boolean){
    // console.log(event)
    this.adminservice.viewmodal$.next(event)
  }

  refetchproducts(event:boolean){
    this.productsservice.adminproducts$=new BehaviorSubject<Product[]>([])
    this.adminproducts$=this.productsservice.adminproducts

  }

  fetchmoreproducts(){
    this.productsservice.storepagination$.next(this.productsservice.storepagination$.value+1)
  }

  producttoedit(event:{product:Product,modal:number}){
    console.log('edit product',event);
this.productsservice.producttoedit=event.product
this.adminservice.switchmodal$.next(event.modal)
  this.adminservice.viewmodal$.next(true)

  }
}
