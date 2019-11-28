import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Expensa } from 'src/app/models/expensa.model';
import { ExpensasService } from 'src/app/services/expensas/expensas.service';
declare var jQuery: any;
@Component({
  selector: 'app-ver-expensas',
  templateUrl: './ver-expensas.component.html',
  styleUrls: ['./ver-expensas.component.css']
})
export class VerExpensasComponent implements OnInit {
  expensasSubscription: Subscription;
  expensas: Expensa[] = [];

  constructor(
    private _exp: ExpensasService
  ) { }

  ngOnInit() {
    // hacky way to solve the 'No data available in table' message
    // https://stackoverflow.com/questions/44940021/data-table-is-showing-no-data-available-in-table-using-angular
    // dirty but works ¯\_(°°.)_/¯
    setTimeout(() => {
      jQuery(() => {
        jQuery('#example23').DataTable({
          dom: 'Bfrtip',
          buttons: [], // 'pdf', 'print'
          info: false,
        });
      });
    }, 300);
    this.cargarExpensas();
  }

  cargarExpensas() {
    this.expensasSubscription = this._exp.getExpensas()
                  .subscribe(expensas => {
                    this.expensas = expensas; });
    console.log('EXPENSAS SUB - ', this.expensas);
  }

}
