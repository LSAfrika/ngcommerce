import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { ProductsService } from 'src/app/services/endpoints/products.service';
import { AdminService } from 'src/app/services/frontendservices/admin.service';

@Component({
  selector: 'app-adminmodal',
  templateUrl: './adminmodal.component.html',
  styleUrls: ['./adminmodal.component.scss']
})
export class AdminmodalComponent {

  @Input()openmodal!:number
  @Output()creatednewproductemitter:EventEmitter<boolean>=new EventEmitter<boolean>()
  @Output()closemodalemit:EventEmitter<boolean>=new EventEmitter()
public adminservice=inject(AdminService)
public productservice=inject(ProductsService)
  productform!:FormGroup;
productformdata=new FormData()
destroy$=new Subject<void>()
constructor(private formbulder:FormBuilder) {
  this.createproductform()
  console.log('open modal digit',this.openmodal);


  // this.productform.valueChanges.subscribe(console.log)

}

  ngOnInit(){
    console.log('open modal digit ng on init',this.openmodal);

  }
  ngOnDestroy(){
    this.destroy$.next()
    this.destroy$.complete()
  }

closemodal(){
  this.closemodalemit.emit(false)
}
closemodalandresetform(){
  this.createproductform()

  this.adminservice.productimages=[]
  this.adminservice.productspecs=[]
  this.closemodal()
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


appenddatatoform(){

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

 ).subscribe(console.log)
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
  this.adminservice.productspecs.push(this._spec?.value)

  this._spec?.setValue('')

  this._productspecifications?.setValue(this.adminservice.productspecs)
}

deletespec(i:number){
  this.adminservice.productspecs.splice(i,1)
  this._productspecifications?.setValue(this.adminservice.productspecs)

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
