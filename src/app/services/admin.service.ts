import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { datamodel } from '../interfaces/admindata.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  viewmodal$=new BehaviorSubject(true)
  switchmodal$=new BehaviorSubject(4)


  admindata:datamodel[]=[
{datatitle:'Total views',dataquantity:349},
{datatitle:'Stock balance',dataquantity:46},
{datatitle:'Sold products',dataquantity:21},
{datatitle:'Total sales',dataquantity:204657},



  ]
  constructor() { }
}
