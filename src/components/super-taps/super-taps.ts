import { Component ,EventEmitter,Input,Output} from '@angular/core';


@Component({
  selector: 'super-taps',
  templateUrl: 'super-taps.html'
})
export class SuperTapsComponent {
  @Output()
  select:any
 
  @Input()
  selected:any
  constructor() {
    this.select = new EventEmitter();
  }

  click(index){
    this.selected = index;
    console.log(index);
    
    this.select.emit({ index: index });
};
}
