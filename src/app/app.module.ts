import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShareduiModule } from './modules/sharedui/sharedui.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,ShareduiModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
