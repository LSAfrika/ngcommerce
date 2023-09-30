import { Component, inject } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public uiservice=inject(UiService)

  opensidenav(){
    this.uiservice.sidenav$.next(true)
  }

}
