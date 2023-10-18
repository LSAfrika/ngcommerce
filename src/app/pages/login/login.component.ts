
import { Router } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';

import { UiService } from 'src/app/services/frontendservices/ui.service';
import { Subject, retry, takeUntil } from 'rxjs';
import { UserService } from 'src/app/services/endpoints/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  login=false
  register=false
  registering=false
  logingin=false
  passwordmissmatch=false
  passwordlengthmatch=false
  invalidemailmatch=false
  inavlidusernamelength=false
  inavlidstorenamelength=false
vendoraccount=false
  registertext='register'
  logintext='login'
  inavlidemailnmatchmessage='invalid email format'
  inavlidusernamelengthmessage='username too short'
  inavlidstorenamelengthmessage='store name too short'
  passwordmissmatchmessage='password missmatch'
  passwordlengthmessage='min 6 charachters'
  email=''
  storename=''
  username=''
  password=''
  reenterpassword=''

  destroy$=new Subject()
userendpoints=inject(UserService)
  // emailRegex = new RegExp('^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$');
  emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
  constructor( public ui:UiService,private router:Router,) {

    // if(!!localStorage.getItem('token'))this.router.navigateByUrl('/')
    // this.io.connected=false

    console.log('testing user log out:');


    //  this.io.disconnectinstance()
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.destroy$.next(1)
  }
toggleregister(){
  this.register=!this.register
  this.email=this.password=this.reenterpassword=this.username=''
}

emailvalidator(event:any){
  console.log(this.emailRegex.test(this.email))
  if(this.emailRegex.test(this.email)==false){
    this.invalidemailmatch=true
    // console.log('email invalid');


  }else{
    // console.log('email valid');

    this.invalidemailmatch=false

  }
}
usernamevalidator(event:any){
  if(this.username.length!=0&&this.username.length<5)  this.inavlidusernamelength=true
  else this.inavlidusernamelength =false

}

storenamevalidator(event:any){
  if(this.storename.length!=0&&this.storename.length<5)  this.inavlidstorenamelength=true
  else this.inavlidstorenamelength =false

}

passwordlength(ev:any){

  if(this.password.length!=0&&this.password.length<6) { this.passwordlengthmatch=true}
  else{this.passwordlengthmatch=false}

  if(this.reenterpassword.length!=0&&this.password != this.reenterpassword){
    this.passwordmissmatch=true
  }else{
    this.passwordmissmatch=false

  }

}

passwordmatch(ev:any){


  if(this.password != this.reenterpassword &&this.reenterpassword.length!=0){
    this.passwordmissmatch=true
  }else{
    this.passwordmissmatch=false

  }

}




registeruser(){

  if( this.email.length==0||this.username.length==0||this.password.length==0||this.reenterpassword.length==0 ) return alert('fill all fields')
if(this.vendoraccount && this.storename.length==0) return alert('fill all fields')
  if(this.passwordmissmatch==true ||this.passwordlengthmatch==true
    ||this.invalidemailmatch==true ||this.inavlidusernamelength==true
    || this.inavlidstorenamelength==true) return alert('form has errors')
 this.registering=true
 this.registertext='registering... '
let payload
 if(this.vendoraccount){
   payload={
    email:this.email,
    username:this.username,
    storename:this.storename,
    vendor:true,
    password: this.password,
   reenterpassword:this.reenterpassword
  }

  console.log('vendor account',payload);


 }
 if(!this.vendoraccount){
   payload={
    email:this.email,
    username:this.username,
   password: this.password,
   reenterpassword:this.reenterpassword
  }

  console.log('user account',payload);





 }

this.userendpoints.userdata=payload

this.userendpoints.registeruser().pipe(takeUntil(this.destroy$)).subscribe(res=>{
  this.registertext='register '
  if(res.message){

    localStorage.setItem('ecomtoken',res.token)
    localStorage.setItem('ecomrefreshtoken',res.refreshtoken)
    this.userendpoints.user=res.user

    alert(res.message)

    if(res.user.vendor==true) this.router.navigateByUrl('/admin')
    if(res.user.vendor==false)  this.router.navigateByUrl('/')
    this.resetform()

  }

  if(res.errormessage) alert(res.errormessage)
},err=>{
  this.registertext='register '
this.resetform()
alert('error while registering')
  console.log('error registering user: ',err.message)
})


//   this.createusersub=this.user.createuser(payload).subscribe((res:any)=>{
//   console.log('register responser',res);

//   if(res.token!=undefined && res.refreshtoken !=undefined){

//     if(res.token)localStorage.setItem('token',res.token)
//     if(res.refreshtoken)localStorage.setItem('refreshtoken',res.refreshtoken)
//     this.registering=false
//     this.registertext='register '
//     alert(res.message)
//     this.router.navigateByUrl('/')
//     this.register=false

//       this.createusersub.unsubscribe()
//   }

// },err=>{

//   alert(`${payload.email} has an account `)
//   localStorage.removeItem('token')
//   localStorage.removeItem('refreshtoken')
//   this.registering=false
// this.registertext='register'
//   console.log(err)
// })



}

loginuser(){

  if( this.email.length==0||this.password.length==0) return alert('fill all fields')

  if(this.passwordlengthmatch==true ||this.invalidemailmatch==true ) return alert('form has errors')

  this.logintext='loging in...'
  this.logingin=true
  const loginpayload={
    email:this.email,
    password:this.password
  }
console.log('login payload: ',loginpayload);
this.userendpoints.userdata=loginpayload
this.userendpoints.loginuser().pipe(takeUntil(this.destroy$)).subscribe(res=>{

  console.log('login resp:',res);

  if(res.message){

    localStorage.setItem('ecomtoken',res.token)
    localStorage.setItem('ecomrefreshtoken',res.refreshtoken)
    this.ui.navbar$.next(!!localStorage.getItem('ecomtoken'))
    this.userendpoints.user=res.user
this.userendpoints.userdata={}

    alert(res.message)
    if(this.ui.logintredirectroute !='')this.router.navigateByUrl(`${this.ui.logintredirectroute}`)
    if(this.ui.logintredirectroute =='')this.router.navigateByUrl(`/`)

  }

  if(res.errormessage) alert(res.errormessage)
},
err=>{
console.log(err.error.errormessage);
alert(err.error.errormessage)
this.resetform()

})


// this.loginusersub=this.user.loginuser(loginpayload).subscribe((res:any)=>{

//   if(res.token!=undefined&&res.refreshtoken!=undefined){
//     localStorage.setItem('token',res.token)
//     localStorage.setItem('refreshtoken',res.refreshtoken)
//     alert(res.message)
//     // this.io.userlogin()
//     this.router.navigateByUrl('/')
//     this.logintext='login'
//   this.logingin=false

//     this.loginusersub.unsubscribe()
//   }
// },error=>{
//   console.log(error);
//   localStorage.removeItem('token')
//   localStorage.removeItem('refreshtoken')
// alert(error.error.message)
// this.logintext='login'
// this.logingin=false
//   this.loginusersub.unsubscribe()


// })

}

createvendor(event:any){
  this.vendoraccount=!this.vendoraccount
  console.log('vendor account state',this.vendoraccount);


}

resetform(){
  this.email=''
  this.storename=''
  this.username=''
  this.password=''
  this.reenterpassword=''
}
}
