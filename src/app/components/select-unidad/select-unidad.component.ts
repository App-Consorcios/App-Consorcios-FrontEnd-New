import { Component, OnInit, Input } from '@angular/core';
import { UnidadFuncional } from 'src/app/models/unidad-funcional.model';
export interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-select-unidad',
  templateUrl: './select-unidad.component.html',
  styleUrls: ['./select-unidad.component.css']
})
export class SelectUnidadComponent implements OnInit {
  @Input("unidades") public unidades:UnidadFuncional[]=[]
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

  constructor() { }

  ngOnInit() {
  }
  somethingChanged(selected){
    console.log(selected);
  }
}
