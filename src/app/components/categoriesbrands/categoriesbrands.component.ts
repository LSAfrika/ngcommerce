import { Component, Input } from '@angular/core';
import { Brands } from 'src/app/interfaces/brands';
import { Categories } from 'src/app/interfaces/categories';

@Component({
  selector: 'app-categoriesbrands',
  templateUrl: './categoriesbrands.component.html',
  styleUrls: ['./categoriesbrands.component.scss']
})
export class CategoriesbrandsComponent {
@Input()categories:Categories[]=[]
@Input()brands:Brands[]=[]

ngOnInit(){
  
  
}
}
