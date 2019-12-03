import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { FullCalendarComponent } from '@fullcalendar/angular';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { ReunionesService } from 'src/app/services/reuniones/reuniones.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
// import { type } from 'os';
declare var jQuery:any;
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  nombreReunion: string
  colorReunion

  idReunion: string
  fechaReunion: Date

  temasInput: {
    tema1: "",
    tema2: "",
    tema3: "",
    tema4: "",
    tema5: ""
}

  temas:any[]


  listEvents:any = [
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
];
  // calendarEvents:any = [{ title: 'Gran fiesta', date: '2019-11-10', color: 'red' }];
  // calendarPlugins = [dayGridPlugin, timeGridPlugin, listPlugin]; // important!

  calendarEvents:any = [{}]

  @ViewChild('calendar',{static:true}) calendar: ElementRef<any>;
  @ViewChild('externalEvents',{static:true}) externalEvents:ElementRef<any>;
  @ViewChild('dropRemove',{static:true}) dropRemove:ElementRef<any>;

  // calendarEvents = [
  //   { title: 'event 1', date: '2019-04-01' }
  // ];
  constructor(public cd:ChangeDetectorRef, private reunionesService: ReunionesService,private router:Router) {
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
          item: data[key].temas
        }

        let reunionCalendario = {
          title: data[key].descripcion,
          date: data[key].fecha ? data[key].fecha.toString().substr(0,10) : "",
          color: data[key].color,
        }

        console.log("REUNION -----", reunion)
        console.log("reuniones", reuniones)
        reuniones.push(reunion)
        reunionesCalendario.push(reunionCalendario)


      });

      this.listEvents = reuniones;
      this.calendarEvents = reunionesCalendario;
      console.log("get reuniones LIST EVENTS - ", this.listEvents );
      console.log("get reuniones CALENDAR EVENTS - ", this.calendarEvents );





      var calendarEl = this.calendar.nativeElement
      var containerEl = this.externalEvents.nativeElement
      var checkbox = this.dropRemove.nativeElement
      console.log("ngOnInit LIST EVENTS - ", this.listEvents );
      console.log("ngOnInit CALENDAR EVENTS - ", this.calendarEvents );
      new Draggable(containerEl, {
         itemSelector: '.fc-event',
         eventData: function(eventEl) {
           let className = eventEl.getElementsByClassName('calendar-events')[0].children[0].classList[2];
           let color;
           switch(className){
             case 'text-success' :  color = '#06d79c';
             break;
             case 'text-danger' :  color = '##ef5350';
             break;
             case 'text-warning' :  color = '#ffb22b';
             break;
             case 'text-info' :  color = '#398bf7';
             break;
           }




           console.log()
           return {
             title: eventEl.innerText,
             color: color
           };
         }
       });

     var calendar = new Calendar(calendarEl, {
         plugins: [ dayGridPlugin, timeGridPlugin, listPlugin,interactionPlugin ],
         eventDurationEditable   : false,
         eventLimit : true,
         events: this.calendarEvents,
         locale : 'es',
         editable: true,
         droppable: true, // this allows things to be dropped onto the calendar
         drop: function(info) {
           console.log(info)
          //  console.log("FECHA DE REUNION STRING",info.dateStr);
          //  console.log("FECHA DE REUNION - ", info.date);

           this.idReunion = info.draggedEl.childNodes[0].textContent.split(" ")[0]
           this.fechaReunion = new Date(info.dateStr).toISOString()


           console.log("REUNION EN DROP - ", this.idReunion, this.fechaReunion );
           //put(idreunion)
          // this.agendarReunion(idReunion, fechaReunion)


          // this.agendarReunion(this.idReunion, this.fechaReunion)

           // is the "remove after drop" checkbox checked?
           if (checkbox.checked) {
             // if so, remove the element from the "Draggable Events" list
             info.draggedEl.parentNode.removeChild(info.draggedEl);
           }
         }
         });
         calendar.render();




    })

  }

  ngOnInit(){
    this.temasInput = {
      tema1: "",
      tema2: "",
      tema3: "",
      tema4: "",
      tema5: ""
    }


    this.temas = [
      {
        descripcion: ""
      },
      {
        descripcion: ""
      },
      {
        descripcion: ""
      },
      {
        descripcion: ""
      },
      {
        descripcion: ""
      }
    ]
  }



recuperarEze(event){
  console.log("evento"+event);
}

  drop(event: CdkDragDrop<string[]>) {
    let  array = event.container.element.nativeElement.textContent.split(" ");
    let item:string;
    let listEvents:any[] = []
    array.shift()
    item = array.join(" ");
    console.log();
    listEvents =this.listEvents.filter(data =>{
      return data.nombre == item.trim();
    })
    if(listEvents.length>0){
      this.cd.markForCheck();
        this.calendarEvents.push({title:listEvents[0].title,date: listEvents[0].date});
      this.cd.detectChanges();

    }
  }

  nuevaReunion(){
    console.log("NUEVA REUNION - ", this.nombreReunion, this.colorReunion, this.temasInput);

    this.temas[0].descripcion = this.temasInput.tema1
    this.temas[1].descripcion = this.temasInput.tema2
    this.temas[2].descripcion = this.temasInput.tema3
    this.temas[3].descripcion = this.temasInput.tema4
    this.temas[4].descripcion = this.temasInput.tema5


    console.log("TEMAS - ", this.temas)

    this.temas = this.temas.filter(tema => tema.descripcion!=="")

    console.log("TEMAS filtrados- ", this.temas)

    this.reunionesService.crearReunion(this.nombreReunion, this.colorReunion, this.temas).subscribe(
      (response) => console.log(response),
      (error) => console.log(error))

    setTimeout(() => {
      this.obtenerReuniones()
    }, 1000);



  }

  agendarReunion(){
    console.log("AGENDAR REUNION - ", this.idReunion, this.fechaReunion);
    this.reunionesService.agendarReunion(this.idReunion, this.fechaReunion).subscribe(
      (response) => console.log(response),
      (error) => console.log(error))
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

        let reunionCalendario = {
          title: data[key].descripcion,
          date: data[key].fecha ? data[key].fecha.toString().substr(0,10) : "",
          color: data[key].color,
        }

        console.log("REUNION -----", reunion)
        console.log("reuniones", reuniones)
        reuniones.push(reunion)
        reunionesCalendario.push(reunionCalendario)


      });

      this.listEvents = reuniones;
      this.calendarEvents = reunionesCalendario;
      console.log("get reuniones LIST EVENTS - ", this.listEvents );
      console.log("get reuniones CALENDAR EVENTS - ", this.calendarEvents );
      this.router.navigate(['/reuniones/agendar-reuniones']);
    })
  }
}

  // addEvent() {
  //   this.calendarEvents = this.calendarEvents.concat({ // creates a new array!
  //      title: 'event 2', date: '2019-04-02'
  //   });
  // }
  //
  // modifyTitle(eventIndex, newTitle) {
  //   let calendarEvents = this.calendarEvents.slice(); // a clone
  //   let singleEvent = Object.assign({}, calendarEvents[eventIndex]); // a clone
  //   singleEvent.title = newTitle;
  //   calendarEvents[eventIndex] = singleEvent;
  //   this.calendarEvents = calendarEvents; // reassign the array
  // }



  // ngOnInit() {
    //  var calendarEl = this.calendar.nativeElement
    //  var containerEl = this.externalEvents.nativeElement
    //  var checkbox = this.dropRemove.nativeElement
    //  console.log("ngOnInit LIST EVENTS - ", this.listEvents );
    //  console.log("ngOnInit CALENDAR EVENTS - ", this.calendarEvents );
    //  new Draggable(containerEl, {
    //     itemSelector: '.fc-event',
    //     eventData: function(eventEl) {
    //       let className = eventEl.getElementsByClassName('calendar-events')[0].children[0].classList[2];
    //       let color;
    //       switch(className){
    //         case 'text-success' :  color = '#06d79c';
    //         break;
    //         case 'text-danger' :  color = '##ef5350';
    //         break;
    //         case 'text-warning' :  color = '#ffb22b';
    //         break;
    //         case 'text-info' :  color = '#398bf7';
    //         break;
    //       }




    //       console.log()
    //       return {
    //         title: eventEl.innerText,
    //         color: color
    //       };
    //     }
    //   });

    // var calendar = new Calendar(calendarEl, {
    //     plugins: [ dayGridPlugin, timeGridPlugin, listPlugin,interactionPlugin ],
    //     eventDurationEditable   : false,
    //     eventLimit : true,
    //     events: this.calendarEvents,
    //     locale : 'es',
    //     editable: true,
    //     droppable: true, // this allows things to be dropped onto the calendar
    //     drop: function(info) {
    //       console.log(info)
    //       // is the "remove after drop" checkbox checked?
    //       if (checkbox.checked) {
    //         // if so, remove the element from the "Draggable Events" list
    //         info.draggedEl.parentNode.removeChild(info.draggedEl);
    //       }
    //     }
    //     });
    //     calendar.render();


    // this.calendarComponent.locale = 'es'
    // this.calendarComponent.bootstrapFontAwesome = true;
    // this.calendarComponent.buttonIcons = true
    // this.calendarComponent.themeSystem = 'bootstrap'
    // this.calendarComponent.plugins = ['bootstrap']
    // this.calendarComponent.droppable = true;
    // this.calendarComponent.plugins = [interactionPlugin]
    // let calendarApi = this.calendarComponent.Calendar(calendarEl, {
    //   plugins: [ 'bootstrap' ],
    //   themeSystem: 'bootstrap'
    // });
  // }
