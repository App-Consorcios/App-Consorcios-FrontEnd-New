import { Component, OnInit } from '@angular/core';
declare var jQuery: any;
@Component({
  selector: 'app-ver-expensas',
  templateUrl: './ver-expensas.component.html',
  styleUrls: ['./ver-expensas.component.css']
})
export class VerExpensasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    jQuery('#example23').DataTable({
        dom: 'Bfrtip',
        buttons: [
          'pdf', 'print'
        ]
    });
  }

}
