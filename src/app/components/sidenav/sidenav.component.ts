import { Component,inject } from '@angular/core';
//import { inject } from '@angular/core/testing';
import { BrandsandcategoriesService } from 'src/app/services/frontendservices/brandsandcategories.service';
import { UiService } from 'src/app/services/frontendservices/ui.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  public brandandcategories=inject(BrandsandcategoriesService)
  public uiservice=inject(UiService)
  disable=false

  closesidenav(){
    this.uiservice.sidenav$.next(false)
  }


  closesidenavbackdrop(){

    if(this.disable==true) return
    this.uiservice.sidenav$.next(false)
  }

  leave(){
    this.disable=false
    // console.log('mouse leave');

  }
  enter(){
    this.disable=true
    // console.log('mouse enter');
  }


  }

