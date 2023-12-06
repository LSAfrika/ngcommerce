import { Component ,inject, Input} from '@angular/core';
import { Carthistory, productincart } from 'src/app/interfaces/cart';
import { FrontEndCartService } from 'src/app/services/frontendservices/cart.service';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.scss']
})
export class OrderdetailsComponent {


  cartservice=inject(FrontEndCartService)
  @Input()carthistory!:productincart

  ngOnInit(){
    console.log(this.carthistory);

  }
  closemodal(){
    this.cartservice.vieworderdetails$.next(false)
  }
}
