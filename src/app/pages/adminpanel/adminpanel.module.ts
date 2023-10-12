import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminpanelRoutingModule } from './adminpanel-routing.module';
import { AdminpanelComponent } from './adminpanel.component';
import { ShareduiModule } from 'src/app/modules/sharedui/sharedui.module';
import { AdminmodalComponent } from '../../components/adminmodal/adminmodal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminpanelComponent,
    AdminmodalComponent
  ],
  imports: [
    CommonModule,
    AdminpanelRoutingModule,ShareduiModule,ReactiveFormsModule,FormsModule
  ]
})
export class AdminpanelModule { }
