import { Injectable, inject } from '@angular/core';
import { IndexRoutesService } from './index.routes.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private endpoints=inject(IndexRoutesService)


  ROOT_STORES_URL='http://localhost:3000/api/v1/stores'



  
}
