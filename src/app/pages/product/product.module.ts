import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ShareduiModule } from 'src/app/modules/sharedui/sharedui.module';


@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,ShareduiModule,
    //RouterModule
  ]
})
export class ProductModule { }
