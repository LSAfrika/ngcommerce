import { Component, inject } from '@angular/core';
import { UiService } from './services/frontendservices/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngcommerce';
  public uiservice=inject(UiService)
}
