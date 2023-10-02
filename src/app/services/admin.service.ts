import { Injectable } from '@angular/core';
import { datamodel } from '../interfaces/admindata.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {


  admindata:datamodel[]=[
{datatitle:'All products',dataquantity:14},
{datatitle:'Total views',dataquantity:349},
{datatitle:'Stock balance',dataquantity:46},
{datatitle:'Sold products',dataquantity:21},
{datatitle:'Total sales',dataquantity:204657},



  ]
  constructor() { }
}
