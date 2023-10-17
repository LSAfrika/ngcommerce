import { Component, inject } from '@angular/core';
import { BrandsandcategoriesService } from 'src/app/services/frontendservices/brandsandcategories.service';
import { UiService } from 'src/app/services/frontendservices/ui.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  public brandcategservice=inject(BrandsandcategoriesService)
}
