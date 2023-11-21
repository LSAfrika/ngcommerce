import { Component, inject } from '@angular/core';
import { UserService } from 'src/app/services/endpoints/user.service';
import { UiService } from 'src/app/services/frontendservices/ui.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  public uiservice=inject(UiService)
public userservice=inject(UserService)
username=''
deactivatestore=false
storedisabled=false
previewsource=false
updateform=new FormData()
  constructor(){
    if(!!localStorage.getItem('ecomtoken')){
      console.log('ecom token found',this.userservice.user);
this.username=this.userservice.user.username
    }
  }

  openmodal(){
    this.uiservice.editprofilemodal$.next(true)
  }


  closemodal(){
    this.uiservice.editprofilemodal$.next(false)
  }


  attachprofilepicturetoform(ev:any){
const file=ev.target.files[0]

if(this.updateform.has('profileimage'))this.updateform.delete('profileimage')
    this.updateform.append('profileimage',file)
    console.log(this.updateform);

  }

  storeactivesatetoggle(ev:any){
this.deactivatestore=!this.deactivatestore
this.storedisabled=this.deactivatestore
console.log('store state',this.deactivatestore);

  }

  updateformdata(){

 if(this.username !=this.userservice.user.username)   {
  if(this.updateform.has('username'))this.updateform.delete('username')
  this.updateform.append('username',this.username)
}

    // console.log('form to be uploaded: ',this.updateform);

    if(this.updateform.has('username')||this.updateform.has('profileimage')) return console.log('form to be uploaded: ',this.updateform);
    console.log('form is empty ');


  }
}
