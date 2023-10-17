import { Component, inject } from '@angular/core';
import { CartService } from 'src/app/services/frontendservices/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {


  public cartservice=inject(CartService)
}
