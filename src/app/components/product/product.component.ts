import { Component, inject } from '@angular/core';
import { UiService } from 'src/app/services/frontendservices/ui.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  public uiservice=inject(UiService)

  constructor(){
    this.uiservice.getroute()
  }
}
