import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { FullCalendarComponent } from '@fullcalendar/angular';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { ReunionesService } from 'src/app/services/reuniones/reuniones.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
declare var jQuery:any;
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  nombreReunion: string
  colorReunion: string
  
  reunion: {
    title,
    date,
    className,
    item: []
  }

  listEvents:any = [
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
];
  calendarEvents:any = [{ title: 'Gran fiesta', date: '2019-11-10', color: 'red' }];
  // calendarPlugins = [dayGridPlugin, timeGridPlugin, listPlugin]; // important!

  @ViewChild('calendar',{static:true}) calendar: ElementRef<any>;
  @ViewChild('externalEvents',{static:true}) externalEvents:ElementRef<any>;
  @ViewChild('dropRemove',{static:true}) dropRemove:ElementRef<any>;

  // calendarEvents = [
  //   { title: 'event 1', date: '2019-04-01' }
  // ];
  constructor(public cd:ChangeDetectorRef, private reunionesService: ReunionesService) { 
    this.reunionesService.getReuniones().subscribe(data => {

      // Object.keys(data).forEach(function(key) {
      //   // console.log(key, data[key]);
        
      //   //mapeo
      //   let reunion
      //   reunion.title = data[descripcion]]

      //   this.listEvents.push(reunion)
  
      // });

      // this.listEvents = data;
      // this.calendarEvents = data;
      // console.log("get reuniones LIST EVENTS - ", this.listEvents );
      
    })

  }

  ngOnInit() {
     var calendarEl = this.calendar.nativeElement
     var containerEl = this.externalEvents.nativeElement
     var checkbox = this.dropRemove.nativeElement

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
        eventDurationEditable   : true,
        eventLimit : true,
        events: this.calendarEvents,
        locale : 'es',
        editable: true,
        droppable: true, // this allows things to be dropped onto the calendar
        drop: function(info) {
          console.log(info)
          // is the "remove after drop" checkbox checked?
          if (checkbox.checked) {
            // if so, remove the element from the "Draggable Events" list
            info.draggedEl.parentNode.removeChild(info.draggedEl);
          }
        }
        });
        calendar.render();


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
    console.log("NUEVA REUNION - ", this.nombreReunion, this.colorReunion);
    this.reunionesService.crearReunion(this.nombreReunion, this.colorReunion)
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
}
