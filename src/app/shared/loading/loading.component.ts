import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  @Input("titulo") titulo:string="Consorcio Limpio";

  constructor() { }

  ngOnInit() {
  }

}
