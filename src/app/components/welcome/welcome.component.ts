import { Component, inject } from '@angular/core';
import { UiService } from 'src/app/services/frontendservices/ui.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
private uis=inject(UiService)

closemodal(){
  this.uis.welcome$.next(false)
}
}
