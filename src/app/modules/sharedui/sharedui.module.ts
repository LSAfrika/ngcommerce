import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { CategoriesbrandsComponent } from '../../components/categoriesbrands/categoriesbrands.component';
import { HomeproductsComponent } from '../../components/homeproducts/homeproducts.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterModule } from '@angular/router';
import {  SidenavComponent } from '../../components/sidenav/sidenav.component';
import { CategoryComponent } from '../../components/category/category.component';
import { ProductComponent } from '../../components/product/product.component';
import { CartpanelComponent } from '../../components/cartpanel/cartpanel.component';
import { GlobalmodalComponent } from '../../components/globalmodal/globalmodal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from '../../components/filter/filter.component';
import { OrderdetailsComponent } from '../../components/orderdetails/orderdetails.component';
import { WelcomeComponent } from 'src/app/components/welcome/welcome.component';



@NgModule({
  declarations: [
    NavbarComponent,
    HeroComponent,
    CategoriesbrandsComponent,
    HomeproductsComponent,
    FooterComponent,
    SidenavComponent,
    CategoryComponent,
    ProductComponent,
    CartpanelComponent,
    GlobalmodalComponent,
    FilterComponent,
    OrderdetailsComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule,RouterModule,ReactiveFormsModule
  ],
  exports:[
    NavbarComponent,
    HeroComponent,
    CategoriesbrandsComponent,
    HomeproductsComponent,
    FooterComponent,
    SidenavComponent,
    CategoryComponent,
    ProductComponent,
    CartpanelComponent,
    GlobalmodalComponent,FilterComponent,OrderdetailsComponent,WelcomeComponent
  ]
})
export class ShareduiModule { }
