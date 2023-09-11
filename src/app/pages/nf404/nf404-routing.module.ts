import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Nf404Component } from './nf404.component';

const routes: Routes = [{ path: '', component: Nf404Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Nf404RoutingModule { }
