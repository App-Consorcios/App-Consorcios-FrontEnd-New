import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-carrousel-multiple',
  templateUrl: './carrousel-multiple.component.html',
  styleUrls: ['./carrousel-multiple.component.css']
})
export class CarrouselMultipleComponent implements OnInit {
  @Input('content') public cards:any[] = [];
  pos:number = 0;
  inicio:number = 0;
  fin: number = 1;
  color:string[]=[
    '#9C27B0',
    '#F44336',
    '#E91E63',
    '#7E57C2',
    '#5C6BC0',
    '#1E88E5',
    '#4FC3F7',
    '#26C6DA',
    '#00897B',
    '#43A047',
    '#558B2F',
    '#827717',
    '#FDD835',
    '#6D4C41'
  ];
  constructor() {
  }

  ngOnInit() {
  }
  recalcularCards(){
    return this.pos;
  }
}
