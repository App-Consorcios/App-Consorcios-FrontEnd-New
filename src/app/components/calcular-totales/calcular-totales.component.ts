import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-calcular-totales',
  templateUrl: './calcular-totales.component.html',
  styleUrls: ['./calcular-totales.component.css']
})

export class CalcularTotalesComponent implements OnInit {

  @Input('Header') displayedColumns: string[] = ['nombre'];
  @Input('HeaderName') headerName: string ="";
  dataSource;
  @Input('datos') datos:any[]=[];

  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.datos);
    // this.dataSource.sort = this.sort;
  }

}
