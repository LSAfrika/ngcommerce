import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent {

  private activeroute=inject(ActivatedRoute)
  _storeid=''
constructor(){
 this._storeid= this.activeroute.snapshot.queryParamMap.get('storeid')||''


}
}
