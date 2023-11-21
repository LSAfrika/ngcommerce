import { Component, inject } from '@angular/core';
import { UiService } from 'src/app/services/frontendservices/ui.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  public uiservice=inject(UiService)

  openmodal(){
    this.uiservice.editprofilemodal$.next(true)
  }


  closemodal(){
    this.uiservice.editprofilemodal$.next(false)
  }
}
