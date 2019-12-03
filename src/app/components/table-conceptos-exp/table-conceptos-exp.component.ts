import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-conceptos-exp',
  templateUrl: './table-conceptos-exp.component.html',
  styleUrls: ['./table-conceptos-exp.component.css']
})
export class TableConceptosExpComponent implements OnInit {
  @Input('tableContent2') dataSource:any[] = [];
  // @Input('headers') displayedColumns:string[] = [];
  displayedColumns:any[] = ['nombre'];

  constructor() {
    console.log(this.dataSource)
  }

  ngOnInit() {
  }

}
