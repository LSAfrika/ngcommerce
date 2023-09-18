import { Component,inject } from '@angular/core';
//import { inject } from '@angular/core/testing';
import { BrandsandcategoriesService } from 'src/app/services/brandsandcategories.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  public brandandcategories=inject(BrandsandcategoriesService)
}
