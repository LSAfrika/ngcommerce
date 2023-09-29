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
this.activeroute.queryParams.pipe(filter(params=>params['storeid'])).subscribe(res=>{this._storeid=res['storeid'];console.log(this._storeid);}
)

}
}
