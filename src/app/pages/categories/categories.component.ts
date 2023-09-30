import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BrandsandcategoriesService } from 'src/app/services/brandsandcategories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
activeroute=inject(ActivatedRoute)
brand=''
category:string|null=null
ngOnInit(){
  this.category= this.activeroute.snapshot.queryParamMap.get('category')
 console.log( 'retrived category: ',this.category)

}
}
