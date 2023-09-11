import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { CategoriesbrandsComponent } from '../../components/categoriesbrands/categoriesbrands.component';
import { HomeproductsComponent } from '../../components/homeproducts/homeproducts.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavbarComponent,
    HeroComponent,
    CategoriesbrandsComponent,
    HomeproductsComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,RouterModule
  ],
  exports:[
    NavbarComponent,
    HeroComponent,CategoriesbrandsComponent,HomeproductsComponent,FooterComponent,
  ]
})
export class ShareduiModule { }
