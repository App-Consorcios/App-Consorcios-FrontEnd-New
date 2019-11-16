import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reuniones-vista',
  templateUrl: './reuniones-vista.component.html',
  styleUrls: ['./reuniones-vista.component.css']
})
export class ReunionesVistaComponent implements OnInit {
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

  constructor() { }

  ngOnInit() {
  }

}
