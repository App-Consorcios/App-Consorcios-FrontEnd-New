import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {
  @Output('periodo') eventos:EventEmitter<Date> = new EventEmitter()

  myFilter = (d: Date): boolean => {
      const day = d.getDate();
      // Prevent Saturday and Sunday from being selected.
      return day == 1;
    }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.eventos.emit(event.value);
  }
  constructor() {

   }

  ngOnInit() {
  }

}
