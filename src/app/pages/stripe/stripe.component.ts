import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/endpoints/user.service';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.scss']
})
export class StripeComponent {

  status=''
  private activeroute=inject(ActivatedRoute)
public userservice=inject(UserService)

  constructor(){
    this.status= this.activeroute.snapshot.params['status']
    console.log(this.userservice.user.value);


  }
  ngOnInit(){

  }
}
