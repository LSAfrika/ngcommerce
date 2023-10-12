import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { datamodel } from '../interfaces/admindata.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  viewmodal$=new BehaviorSubject(false)
  switchmodal$=new BehaviorSubject(0)

  categories=['Phones','Laptops','Desktops','Tvs','Home theatres','monitors','Head sets']
  brands= ['Samsung','Hp','Dell','Lenovo','Acer','Sony','Apple','Xiaomi','Tecno','Infinix','Hotpoint','Oppo','Huawei','Awei','Oraimo','Lg','Hisense','Synix','Nokia']
  productimages:File[]=[]
  productspecs:string[]=[]
  productspec=''

  admindata:datamodel[]=[
{datatitle:'Total views',dataquantity:349},
{datatitle:'Stock balance',dataquantity:46},
{datatitle:'Sold products',dataquantity:21},
{datatitle:'Total sales',dataquantity:204657},



  ]


}
