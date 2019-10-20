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
  
  expensasSubscription:Subscription
  expensas:Expensa[] = [];

  constructor(
    private _exp:ExpensasService
  ) { }

  ngOnInit() {
    jQuery('#example23').DataTable({
        dom: 'Bfrtip',
        buttons: [
          'pdf', 'print'
        ]
    });

    this.cargarExpensas();
  }

  cargarExpensas(){
    this.expensasSubscription = this._exp.getExpensas()
                  .subscribe(expensas =>{
                    this.expensas = expensas;});
    console.log("EXPENSAS SUB - ", this.expensas);
    
  }

}
