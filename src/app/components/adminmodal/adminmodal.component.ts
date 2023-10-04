import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-adminmodal',
  templateUrl: './adminmodal.component.html',
  styleUrls: ['./adminmodal.component.scss']
})
export class AdminmodalComponent {

  @Input()openmodal!:number
  @Output()closemodalemit:EventEmitter<boolean>=new EventEmitter()

  constructor(){
    console.log('open modal digit',this.openmodal);

  }

  ngOnInit(){
    console.log('open modal digit ng on init',this.openmodal);

  }

closemodal(){
  this.closemodalemit.emit(false)
}

}
