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

  constructor() { }

  ngOnInit() {
  }
  getTotalCost(index){
    let total = 0;
     this.dataSource.map((t) =>t[index]).forEach(element=>{total += element})
     return total;
  }

}
