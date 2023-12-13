import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { Dashboard } from 'src/app/interfaces/product';
import { datamodel } from '../../interfaces/admindata.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

id=''
  viewmodal$=new BehaviorSubject(false)
  switchmodal$=new BehaviorSubject(0)
dashboardurl='http://localhost:3000/api/v1/stores/dashboard/'
  categories=['Phones','Laptops','Desktops','Tvs','Home theatres','monitors','Head sets','game console']
  brands= ['Samsung','Hp','Dell','Lenovo','Acer','Sony','Apple','Xiaomi','Tecno','Infinix','Hotpoint','Oppo','Huawei','Awei','Oraimo','Lg','Hisense','Synix','Nokia']
  productimages:File[]=[]

  productspec=''
private http=inject(HttpClient)
  admindata:datamodel[]=[
{datatitle:'Total views',dataquantity:349},
{datatitle:'Stock balance',dataquantity:46},
{datatitle:'Sold products',dataquantity:21},
{datatitle:'Total sales',dataquantity:204657},
{datatitle:'Orders',dataquantity:204657},



  ]

  getdashboard(){

   return this.http.get<Dashboard>(this.dashboardurl).pipe(shareReplay(100))
  }


}
