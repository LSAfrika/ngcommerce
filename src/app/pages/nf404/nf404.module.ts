import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Nf404RoutingModule } from './nf404-routing.module';
import { Nf404Component } from './nf404.component';


@NgModule({
  declarations: [
    Nf404Component
  ],
  imports: [
    CommonModule,
    Nf404RoutingModule
  ]
})
export class Nf404Module { }
