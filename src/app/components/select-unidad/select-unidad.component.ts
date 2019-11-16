import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UnidadFuncional } from 'src/app/models/unidad-funcional.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  @Output("selected") public elegido:EventEmitter<number> = new EventEmitter<number>();
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

  constructor(private _ar:ActivatedRoute,private router:Router) { }

  ngOnInit() {
  }
  somethingChanged(selected){
    console.log("SELECTED - ", selected);
    
    const unidad = this.unidades.filter(data => data.codigo == selected)
    console.log("SELECTED UNIDAD - ", unidad);
    if(unidad.length>0){

      this.elegido.emit();
      this.router.navigate(['unidad-funcional','ver-unidades',unidad[0].id])
    }
  }
}
