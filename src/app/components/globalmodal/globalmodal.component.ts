import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-globalmodal',
  templateUrl: './globalmodal.component.html',
  styleUrls: ['./globalmodal.component.scss']
})
export class GlobalmodalComponent {


  @Input()modalmessage:string=''
  @Input()spinnerstate:boolean=true
}
