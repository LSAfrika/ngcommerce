import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, delay, of, Subject, takeUntil, tap } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { ProductsService } from 'src/app/services/endpoints/products.service';
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
public productservice=inject(ProductsService)
public router=inject(Router)
username=''
imagesrcurl=''
imagesrcurlplaceholder=''
deactivatestore=false
storedisabled=false
previewsource=false
updateform=new FormData()
destroy$=new Subject<void>()
myfavoriteproducts$=this.productservice.favoriteproducts
disablenav=false


  constructor(){
    if(!!localStorage.getItem('ecomtoken')){
      console.log('ecom token found',this.userservice.user);
this.username=this.userservice.user.value?.username||''
    }
  }

  ngOnDestroy(){
    this.destroy$.next()
    this.destroy$.complete()
  }

  openmodal(){


    this.uiservice.editprofilemodal$.next(true)
  }


  navigatetofavoriteproduct(productid:string,storeid:string){

    if(this.disablenav==true) return
    this.router.navigateByUrl(`/product/${productid}/store/${storeid}`)
  }

  disablenavigation(){
    this.disablenav=true
      }
      enablenavigation(){
        this.disablenav=false

      }
  removefromfavorite(productid:string){

    this.userservice.viewmodal$.next(true)
    this.userservice.modalmessage='removing product'

    this.productservice.removeaddproductfromfavorites(productid).pipe(
      //delay(3000),
      catchError((err:HttpErrorResponse)=>{ return of({errormessage:'an error occured try agin later',errorlog:err.message})}),
      tap((res:any)=>{
        if(res.message) {

          const indexofremovedproduct=this.productservice.favoriteproducts$.value.map(prod=> prod._id.toString()).indexOf(productid)

          if(indexofremovedproduct!=-1)this.productservice.favoriteproducts$.value.splice(indexofremovedproduct,1)
          this.myfavoriteproducts$=this.productservice.favoriteproducts
          this.removeproductcomplete(res.message);
        }
        if(res.errormessage){
          this.removeproductcomplete(res.errormessage);

        }

      }),

      takeUntil(this.destroy$)
    ).
    subscribe()

  }

removeproductcomplete(message:string){
this.userservice.modalmessage=message
this.userservice.spinnerstate=false
setTimeout(() => {
  this.userservice.viewmodal$.next(false)

this.userservice.spinnerstate=true

}, 2000);
}

  closemodal(){
    this.uiservice.editprofilemodal$.next(false)
  }

  removephoto(){
    this.imagesrcurl=''
   if( this.updateform.has('profileimage')) this.updateform.delete('profileimage')
   console.log('removed file from update form');

  }

  attachprofilepicturetoform(ev:any){
const file=ev.target.files[0]

this.imagesrcurl= URL.createObjectURL(file);

if(this.updateform.has('profileimage'))this.updateform.delete('profileimage')
    this.updateform.append('profileimage',file)
    console.log(this.updateform);
    console.log(this.imagesrcurl);

  }

  storeactivesatetoggle(ev:any){

    let storestate
    if(this.userservice.user.value?.storedeactivated==false) storestate=true
    if(this.userservice.user.value?.storedeactivated==true) storestate=false

    if(this.updateform.has('storedeactivated'))  this.updateform.delete('storedeactivated')

    this.updateform.append('storedeactivated',`${storestate}`)
    console.log('store state',this.updateform);


  }

  updateprofiledata(){

    if(this.username !=this.userservice.user.value?.username)   {
      if(this.updateform.has('username'))this.updateform.delete('username')
      this.updateform.append('username',this.username)
    }

    if(this.updateform.has('username')==false&&this.updateform.has('profileimage')==false&&this.updateform.has('storedeactivated')==false){
      this.userservice.viewmodal$.next(true)
      this.updatecomplete('no fields updated')
            return
          }
console.log('next');



this.userservice.modalmessage='updating your profile'
this.userservice.viewmodal$.next(true)

    this.userservice.updateuser(this.updateform).pipe(
      catchError((err:HttpErrorResponse)=>{

      return of({erroroccured:{message:'an error occured please try later',errormessage:err.message}})

      }),
      tap((res:any)=>{

        if(res.erroroccured){
          console.log('http error profile update: \n',res.erroroccured.errormessage);

          this.updatecomplete(res.erroroccured.message)
        }
if(res.updateuser){


  localStorage.setItem('ecomtoken',res.token)
  const tokenavailable=localStorage.getItem('ecomtoken')
      const  token=tokenavailable?.split('.')[1]||''
   if(token)  this.userservice.user.next( this.retreiveuserfromtoken(token))

     console.log(this.userservice.user);
     this.imagesrcurlplaceholder=this.imagesrcurl

  this.updatecomplete('profile updated')
}

    }),takeUntil(this.destroy$)).subscribe()


    // }



  }

  retreiveuserfromtoken(token:string){

    if(token=='')return this.userservice.user.value
    const userbio= JSON.parse(atob(token))

    return userbio as User
  }



  updatecomplete(message:string){
    this.uiservice.editprofilemodal$.next(false)
    this.userservice.spinnerstate=false
    this.userservice.modalmessage=message
    this.updateform=new FormData()
    setTimeout(() => {
    this.userservice.spinnerstate=true
    this.userservice.modalmessage=''
    this.imagesrcurl=''
    this.userservice.viewmodal$.next(false)

    }, 2000);
  }
}
