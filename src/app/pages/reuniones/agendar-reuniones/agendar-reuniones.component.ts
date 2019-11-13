import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-agendar-reuniones',
  templateUrl: './agendar-reuniones.component.html',
  styleUrls: ['./agendar-reuniones.component.css']
})
export class AgendarReunionesComponent implements OnInit {
 calendarPlugins = [dayGridPlugin]; // important!
  constructor() { }

  ngOnInit() {
  }

}
