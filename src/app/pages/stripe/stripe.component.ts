import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.scss']
})
export class StripeComponent {

  status=''
  private activeroute=inject(ActivatedRoute)


  constructor(){
    this.status= this.activeroute.snapshot.params['status']

  }
}
