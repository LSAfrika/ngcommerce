import { Injectable } from '@angular/core';
import { Brands } from '../interfaces/brands';
import { Categories } from '../interfaces/categories';

@Injectable({
  providedIn: 'root'
})
export class BrandsandcategoriesService {


  brand='brand'
  brands:Brands[]=[
    {brand:'Sony',icon:'../../../assets/brands/sony.png'},
    {brand:'samsung',icon:'../../../assets/brands/samsung.png'},
    {brand:'apple',icon:'../../../assets/brands/apple.webp'},
    {brand:'dell',icon:'../../../assets/brands/dell.webp'},
    {brand:'Lg',icon:'../../../assets/brands/lg.png'},
    {brand:'lenovo',icon:'../../../assets/brands/lenovo.png'},
    {brand:'hisense',icon:'../../../assets/brands/hisense.png'},
    {brand:'Hp',icon:'../../../assets/brands/hp.png'},
    {brand:'Others',icon:'../../../assets/brands/others.svg'},
    // {brand:'phillips',icon:'../../../assets/brands/'},
  ]
category='categories'

  categories:Categories[]=[
    {category:' All',icon:'../../../assets/categories/allcat.svg'},
    {category:'Phones',icon:'../../../assets/categories/mobile.svg'},
    {category:'Laptops',icon:'../../../assets/categories/laptop.svg'},
    {category:'Desktops',icon:'../../../assets/categories/computer.svg'},
    {category:'Tvs',icon:'../../../assets/categories/tv.svg'},
    {category:'HomeTheaters',icon:'../../../assets/categories/hometheater.svg'},
    {category:'Tablets',icon:'../../../assets/categories/tablet.svg'},


  ]
  constructor() { }
}
