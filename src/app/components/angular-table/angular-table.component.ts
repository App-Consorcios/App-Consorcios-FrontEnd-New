import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-angular-table',
  templateUrl: './angular-table.component.html',
  styleUrls: ['./angular-table.component.css']
})
export class AngularTableComponent implements OnInit {
  @Input('headers') displayedColumns:string[] = [];
  @Input('noStickyheaders') columnDinamic:string[] = [];
  @Input('tableContent') dataSource:any[] = [];
  // columnDinamic:string[] = []

  constructor() { }

  ngOnInit() {
    console.log(this.dataSource);

  }
  getTotalCost(){
    return this.dataSource.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }

}
