import { Injectable } from '@angular/core';
import { Brands } from '../interfaces/brands';
import { Categories } from '../interfaces/categories';

@Injectable({
  providedIn: 'root'
})
export class UiService {

brand='brand'
  brands:Brands[]=[
    {brand:'Sony'},
    {brand:'samsung'},
    {brand:'apple'},
    {brand:'dell'},
    {brand:'Lg'},
    {brand:'lenovo'},
    {brand:'acer'},
    {brand:'phillips'},
    {brand:'hisense'},
    {brand:'Hp'},
  ]
category='categories'

  categories:Categories[]=[
    {category:'Phones'},
    {category:'Laptops'},
    {category:'Desktops'},
    {category:'Tvs'},
    {category:'HomeTheaters'},
    {category:'Tablests'},


  ]
  constructor() { }
}
