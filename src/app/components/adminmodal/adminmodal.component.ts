import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, delay, of, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Dashboard, Product } from 'src/app/interfaces/product';
import { ProductsService } from 'src/app/services/endpoints/products.service';
import { AdminService } from 'src/app/services/frontendservices/admin.service';
import { UiService } from 'src/app/services/frontendservices/ui.service';

@Component({
  selector: 'app-adminmodal',
  templateUrl: './adminmodal.component.html',
  styleUrls: ['./adminmodal.component.scss']
})
export class AdminmodalComponent {

  @Input()openmodal!:number
  @Input()dashboardstats!:Dashboard
  @Output()creatednewproductemitter:EventEmitter<boolean>=new EventEmitter<boolean>()
  @Output()closemodalemit:EventEmitter<boolean>=new EventEmitter()

  modalmessage=''
  public adminservice=inject(AdminService)
  public uiservice=inject(UiService)
  admindashboardsatistics$=this.adminservice.getdashboard()
public productservice=inject(ProductsService)
  productform!:FormGroup;
productformdata=new FormData()
destroy$=new Subject<void>()
photos:File[]=[]
maxphotoupload=6
constructor(private formbulder:FormBuilder) {
   console.log('product received',this.productservice.producttoedit);
this.openmodal=5


}

  ngOnInit(){
  //this.createproductform()

  if(this.productservice.producttoedit!=undefined)this.createeditproductform(this.productservice.producttoedit)
  if(this.productservice.producttoedit==undefined)this.createproductform()

    console.log('open modal digit ng on init',this.openmodal);
    console.log('dashboard stats: ',this.dashboardstats);

    console.log('product to edit',this.productservice.producttoedit);


  }
  ngOnDestroy(){
    this.destroy$.next()
    this.destroy$.complete()
  }

closemodal(){
  this.productservice.producttoedit=undefined
  this.closemodalemit.emit(false)
}
closemodalandresetform(){
  console.log('close modal trriggered');

  this.createproductform()

  this.adminservice.productimages=[]
  this.productservice.productspecs=[]
  this.closemodal()
}

openorder(i:number){

  const order= this.dashboardstats.orders[i]

  console.log(order);
  
}



createproductform(){
  this.productform=this.formbulder.group({
    productname: ['', [Validators.required]],
    productprice: ['', [Validators.required]],
    productquantity: [1, [Validators.required,Validators.min(1 )]],
    category: ['', [Validators.required]],
    brand: ['', [Validators.required]],
    spec: '',
    productspecifications:[[],[Validators.required]],
    productdescription: ['', [Validators.required]],
  })
}

createeditproductform(product:Product){

  // console.log(product);
  this.productservice.productspecs=product.productspecification

  this.productform=this.formbulder.group({
    productname: [product.productname, [Validators.required]],
    productprice: [product.productprice, [Validators.required]],
    productquantity: [product.productquantity, [Validators.required,Validators.min(1)]],
    category: [product.category, [Validators.required]],
    brand: [product.brand, [Validators.required]],
    spec: '',
    productspecifications:[product.productspecification,[Validators.required,Validators.minLength(1)]],
    productdescription: [product.productdescription, [Validators.required]],
  })

  console.log(this.productform);

}


appenddatatoform(){
  this.productservice.productmodalmessage='creating product ...'

  this.productservice.productformdata=new FormData()
 const datastring= JSON.stringify( this.productform.value)
//  console.log(datastring);

 this.productservice.productformdata.append('productdata',datastring)

 this.adminservice.productimages.forEach(img=>[
  this.productservice.productformdata.append('product',img)
 ])

 console.log('all images \n',this.productservice.productformdata.getAll('image'))
 console.log('product info \n',this.productservice.productformdata.get('productdata'))


 this.productservice.postproduct().pipe(
tap(()=> {alert('product created successfully'),this.newproductcreatedevent();this.closemodal();this.createproductform()} ),takeUntil(this.destroy$)

 ).subscribe()
}

appendupdatedatatoform(){

  this.productservice.productformdata=new FormData()
 const datastring= JSON.stringify( this.productform.value)
//  console.log(datastring);

 this.productservice.productformdata.append('productdata',datastring)

this.productservice.productmodalmessage='updating product ...'


 console.log('product info \n',this.productservice.productformdata.get('productdata'))
this.productservice.updateproduct$.next(true)
 this.productservice.patchproduct().pipe(
  //delay(5000),
  tap(()=>{
 this.completedupdatingproduct()
  }),
  takeUntil(this.destroy$)
  ).
  subscribe()
//  this.productservice.postproduct().pipe(
// tap(()=> {alert('product updated successfully'),this.newproductcreatedevent();this.closemodal();this.createproductform()} ),takeUntil(this.destroy$)

//  ).subscribe()
}

completedupdatingproduct(){

  this.productservice.modalspinner$.next(false)
  this.productservice.productmodalmessage='updated successfully'
setTimeout(() => {
this.productservice.modalspinner$.next(true)
this.openmodal=5
this.productservice.productmodalmessage=''
this.productservice.updateproduct$.next(false)
this.uiservice.productphotoupdate$.next(true)

}, 2000);

}

updateproductphotosonly(){
  this.openmodal=5
}

newproductcreatedevent(){
  this.creatednewproductemitter.emit(true)
}

deleteimage(i:number){

  this.adminservice.productimages.splice(i,1)

}

setbrand(brand:string){

  console.log(brand);
  this._brand?.setValue(brand)

}

setcategory(category:string){
  console.log(category);
  this._category?.setValue(category)

}

addimages(event:any){

  const images=event.target.files as File[]


  console.log(images)
for (let index = 0; index < images.length; index++) {
 this.adminservice.productimages.push(images[index])

}
  if(this.adminservice.productimages.length>4) {
    this.adminservice.productimages.splice(4)
    console.log('current files:',this.adminservice.productimages)
  }



}

addspecs(){
  this.productservice.productspecs.push(this._spec?.value)

  this._spec?.setValue('')

  this._productspecifications?.setValue(this.productservice.productspecs)
}

deletespec(i:number){
  this.productservice.productspecs.splice(i,1)
  this._productspecifications?.setValue(this.productservice.productspecs)

}


updatephotouploads(file:any){


  this.photos.push(...file.target.files)
  // console.log(this.photos)

    if( this.productservice.producttoedit !=undefined&& this.productservice.producttoedit.productimages.length>=6 ) {return alert('max images uploaded')}
    const photoslength=this.productservice.producttoedit!.productimages.length
  console.log(photoslength);

  if(this.photos.length>=this.maxphotoupload-photoslength){
const splicecounter=this.maxphotoupload-photoslength
console.log('splice counter',splicecounter);

    this.photos.splice(splicecounter)
  }

//  const files=Array.isArray(file)?file:[file]

//  console.log('array from files:',files)
}

deletephotofromphotoupdatearray(index:number){

  this.photos.splice(index,1)
  console.log(this.photos);

}

deleteproductphotofromDB(id:string,index:number){

this.productservice.updateproduct$.next(true)
this.productservice.productmodalmessage='deleteing photo ...'


  this.productservice.deleteproductimage(id,index).pipe(
   // delay(500),
    takeUntil(this.destroy$)).subscribe((res)=>{

    this.completedimagedeletion(res,index)

  })
}

completedimagedeletion(res:any,index:number){
this.productservice.modalspinner$.next(false)

this.productservice.productmodalmessage=res.exceptionmessage||res.message

if(res.message){
  this.productservice.producttoedit!.productimages.splice(index,1)
}

setTimeout(() => {

this.productservice.productmodalmessage=''
this.productservice.updateproduct$.next(false)
this.productservice.modalspinner$.next(true)




}, 2000);

}

uploadupdatephotos(){
  const filedata=new FormData()
  this.photos.forEach(photo=>filedata.append('product',photo))
  const productid= this.productservice.producttoedit!._id
  console.log('photos form data: ',filedata)

this.productservice.productmodalmessage='uploading photo(s) ...'
this.productservice.updateproduct$.next(true)

  this.productservice.updateproductphotos(productid,filedata)
  .pipe(
    catchError((err:any)=>{ return of(err as HttpErrorResponse)}),
    tap((res:any)=>{
      console.log(res);

 this.completedphotoupdate(res)

    }),
    takeUntil(this.destroy$)
    )
  .subscribe()
}

completedphotoupdate(res:any,){

  console.log(res.message);

 if(res.message==="images update successfully") {
  this.productservice.producttoedit!.productimages=res.savedproduct.productimages
  this.photos=[]

  this.productservice.productmodalmessage=res.message
}

this.productservice.modalspinner$.next(false)

if(res.exceptionmessage ){
  this.productservice.productmodalmessage=res.exceptionmessage
  this.photos=[]

}
setTimeout(() => {
  this.productservice.productmodalmessage=''
  this.productservice.updateproduct$.next(false)
  this.adminservice.viewmodal$.next(false)
  this.productservice.modalspinner$.next(true)




  }, 3000);

}
get _productname(){
  return this.productform.get('productname')
}
get _productprice(){
  return this.productform.get('productprice')
}
get _productquantity(){
  return this.productform.get('productquantity')
}


get _category(){
  return this.productform.get('category')
}
get _brand(){
  return this.productform.get('brand')
}

get _productdescription(){
  return this.productform.get('productdescription')
}

get _spec(){
  return this.productform.get('spec')
}
get _productspecifications(){
  return this.productform.get('productspecifications')
}




}
