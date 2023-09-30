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
    CartpanelComponent
  ],
  imports: [
    CommonModule,RouterModule
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
    CartpanelComponent
  ]
})
export class ShareduiModule { }
