import { Component ,inject} from '@angular/core';
import { FrontEndCartService } from 'src/app/services/frontendservices/cart.service';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.scss']
})
export class OrderdetailsComponent {


  cartservice=inject(FrontEndCartService)

  closemodal(){
    this.cartservice.vieworderdetails$.next(false)
  }
}
