import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/endpoints/user.service';
import { UiService } from 'src/app/services/frontendservices/ui.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public uiservice=inject(UiService)
  public userservice=inject(UserService)
  public router=inject(Router)

  ngOnInit(){
    this.uiservice.logintredirectroute=this.uiservice.getroute()
    console.log(   this.uiservice.logintredirectroute)
    // console.log(   this.uiservice.logintredirectroute.split('/'))

  }

  opensidenav(){
    this.uiservice.sidenav$.next(true)
  }
  opencart(){
    this.uiservice.cartpanel$.next(true)
  }

  logout(){
    localStorage.removeItem('ecomtoken')
    localStorage.removeItem('ecomrefreshtoken')
    this.uiservice.navbar$.next(!!localStorage.getItem('ecomtoken'))
    if(this.uiservice.logintredirectroute =='/profile'){

      this.uiservice.logintredirectroute=''
      this.router.navigateByUrl('/')
    }

    if(this.uiservice.logintredirectroute.split('/')[1] =='admin'){

      this.uiservice.logintredirectroute=''
      this.router.navigateByUrl('/')
    }
    this.uiservice.logintredirectroute=''


  }

}
