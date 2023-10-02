import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminpanelRoutingModule } from './adminpanel-routing.module';
import { AdminpanelComponent } from './adminpanel.component';
import { ShareduiModule } from 'src/app/modules/sharedui/sharedui.module';


@NgModule({
  declarations: [
    AdminpanelComponent
  ],
  imports: [
    CommonModule,
    AdminpanelRoutingModule,ShareduiModule
  ]
})
export class AdminpanelModule { }
