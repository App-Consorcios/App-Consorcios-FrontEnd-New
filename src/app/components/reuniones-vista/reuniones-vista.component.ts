import { Component, OnInit } from '@angular/core';
export interface PeriodicElement {
  descripcion: string;
  prioridad: number;
  fecha: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {prioridad: 1, descripcion: 'Reunion para alquileres de amenities', fecha: '11-10-2019'},
  {prioridad: 2, descripcion: 'Reparaciones generales', fecha: '08-11-2019'},
  {prioridad: 3, descripcion: 'Servicio de Limpieza', fecha: '20-11-2019'},
  {prioridad: 4, descripcion: 'Bienvenida nuevos inquilinos', fecha: '21-09-2019'},
  {prioridad: 5, descripcion: 'Conflictos y quejas', fecha: '11-09-2019'},
  {prioridad: 6, descripcion: 'Fiesta de fin de año', fecha: '17-09-2019'},
  {prioridad: 7, descripcion: 'Reglas sobre las mascotas', fecha: '17-11-2019'},
  {prioridad: 8, descripcion: 'Horarios de descanso', fecha: '17-06-2019'},
  {prioridad: 9, descripcion: 'Alquileres de garage', fecha: '02-12-2019'}
];

@Component({
  selector: 'app-reuniones-vista',
  templateUrl: './reuniones-vista.component.html',
  styleUrls: ['./reuniones-vista.component.css']
})
export class ReunionesVistaComponent implements OnInit {
  item:any;
  listEvents:any[] = [
    { title: 'Reunion para alquileres de amenities', date: '2019-11-10', className:'text-info',
      item:[
        {nroitm:1, descripcion:"Alquiler de sala de juegos"},
        {nroitm:2, descripcion:"Alquiler de parrilla"},
        {nroitm:3, descripcion:"Reglas para uso y cuidado de las mismas"}
    ]},
    { title: 'Reparaciones generales', date: '2019-11-10', className:'text-success',
      item:[
        {nroitm:1, descripcion:"reparación de cañerias"},
        {nroitm:2, descripcion:"reparación de la instalaciones electricas"},
        {nroitm:3, descripcion:"Contruccion de una parrilla extra"}
    ] },
    { title: 'Servicio de Limpieza', date: '2019-11-10', className:'text-danger',
      item:[
        {nroitm:1, descripcion:"Gastos y recomendaciones"},
        {nroitm:1, descripcion:"Eleccion y tipo de contratación"}
      ]},
    { title: 'Bienvenida nuevos inquilinos', date: '2019-11-10',className:'text-warning', item:[] },
    { title: 'Conflictos y quejas', date: '2019-11-10',className:'text-danger', item:[]},
    { title: 'Fiesta de fin de año', date: '2019-11-10', className:'text-info', item:[] },
    { title: 'Reglas sobre las mascotas', date: '2019-11-10', className:'text-success', item:[] },
    { title: 'Horarios de descanso', date: '2019-11-10', className:'text-success', item:[] },
    { title: 'Alquileres de garage', date: '2019-11-10', className:'text-danger', item:[] }
  ]
  reuniones:any[] =[
     {
      item:[
        {nroitm:1, descripcion:"Alquiler de sala de juegos"},
        {nroitm:2, descripcion:"Alquiler de parrilla"},
        {nroitm:3, descripcion:"Reglas para uso y cuidado de las mismas"}
      ]
    },
    {
      item:[
        {nroitm:1, descripcion:"reparación de cañerias"},
        {nroitm:2, descripcion:"reparación de la instalaciones electricas"},
        {nroitm:3, descripcion:"Contruccion de una parrilla extra"}
      ]
    },
    {
      item:[
        {nroitm:1, descripcion:"Gastos y recomendaciones"},
        {nroitm:1, descripcion:"Eleccion y tipo de contratación"}
      ]
    }
  ]
  displayedColumns: string[] = ['prioridad', 'descripcion', 'fecha'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit() {
  }

}
