import { Component, OnInit } from '@angular/core';
import { ReunionesService } from 'src/app/services/reuniones/reuniones.service';

@Component({
  selector: 'app-reuniones-vista',
  templateUrl: './reuniones-vista.component.html',
  styleUrls: ['./reuniones-vista.component.css']
})
export class ReunionesVistaComponent implements OnInit {

  nombreReunion: string
  colorReunion: string

  idReunion: string
  fechaReunion: Date


  listEvents:any[] = [
    // { title: 'Reunion para alquileres de amenities', date: '2019-11-10', className:'text-info',
    //   item:[
    //     {nroitm:1, descripcion:"Alquiler de sala de juegos"},
    //     {nroitm:2, descripcion:"Alquiler de parrilla"},
    //     {nroitm:3, descripcion:"Reglas para uso y cuidado de las mismas"}
    // ]},
    // { title: 'Reparaciones generales', date: '2019-11-10', className:'text-success',
    //   item:[
    //     {nroitm:1, descripcion:"reparación de cañerias"},
    //     {nroitm:2, descripcion:"reparación de la instalaciones electricas"},
    //     {nroitm:3, descripcion:"Contruccion de una parrilla extra"}
    // ] },
    // { title: 'Servicio de Limpieza', date: '2019-11-10', className:'text-danger',
    //   item:[
    //     {nroitm:1, descripcion:"Gastos y recomendaciones"},
    //     {nroitm:1, descripcion:"Eleccion y tipo de contratación"}
    //   ]},
    // { title: 'Bienvenida nuevos inquilinos', date: '2019-11-10',className:'text-warning', item:[] },
    // { title: 'Conflictos y quejas', date: '2019-11-10',className:'text-danger', item:[]},
    // { title: 'Fiesta de fin de año', date: '2019-11-10', className:'text-info', item:[] },
    // { title: 'Reglas sobre las mascotas', date: '2019-11-10', className:'text-success', item:[] },
    // { title: 'Horarios de descanso', date: '2019-11-10', className:'text-success', item:[] },
    // { title: 'Alquileres de garage', date: '2019-11-10', className:'text-danger', item:[] }
  ]

  constructor(private reunionesService: ReunionesService) { this.obtenerReuniones() }

  ngOnInit() {
  }

  obtenerReuniones(){
    this.reunionesService.getReuniones().subscribe(data => {
      console.log("data",data);
      var reuniones = []
      var reunionesCalendario = []

      Object.keys(data).forEach(function(key) {
        console.log("KEY DATA KEY",key, data[key]);
        console.log("campo", data[key].descripcion);
        console.log("GET REUNIONES ID -----", data[key].id);

        console.log("TYPE OF DATE -.------ ", typeof data[key].fecha);
        
        //mapeo

        let reunion = {
          id: data[key].id,
          title: data[key].descripcion,
          date: data[key].fecha ? data[key].fecha : "",
          className: data[key].color,
          item: [    {
            "descripcion": "Pintura"
          },
          {
            "descripcion": "Entrada"
          }],
        }
      
        console.log("REUNION -----", reunion)
        console.log("reuniones", reuniones)
        reuniones.push(reunion)
      });
      this.listEvents = reuniones;
      console.log("get reuniones LIST EVENTS - ", this.listEvents );
    })
  }

}
