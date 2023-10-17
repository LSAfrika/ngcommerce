import { Component,inject } from '@angular/core';
import { AdminService } from 'src/app/services/frontendservices/admin.service';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.scss']
})
export class AdminpanelComponent {

  public adminservice=inject(AdminService)

  openmodal(index:number){
this.adminservice.switchmodal$.next(index)

console.log('current index',this.adminservice.switchmodal$.value);



  this.adminservice.viewmodal$.next(true)


  }

  closemodal(event:boolean){
    // console.log(event)
    this.adminservice.viewmodal$.next(event)
  }
}
