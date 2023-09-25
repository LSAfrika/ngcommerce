import { Component, inject } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {

  public uiservice= inject(UiService)
// close=false
  closepanels(){
   
    

this.uiservice.closeallpanels()
  }



}
