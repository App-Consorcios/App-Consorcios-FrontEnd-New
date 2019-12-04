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
  periodo:Date = new Date();
  conceptoVisitado:any[]=[];

  constructor(
    private _exp: ExpensasService
  ) { }

  ngOnInit() {
    // hacky way to solve the 'No data available in table' message
    // https://stackoverflow.com/questions/44940021/data-table-is-showing-no-data-available-in-table-using-angular
    // dirty but works ¯\_(°°.)_/¯
    setTimeout(() => {
      // jQuery(() => {
        jQuery('#example23').DataTable({
          dom: 'Bfrtip',
          buttons: [], // 'pdf', 'print'
          info: false,
          ordering:false,
          bPaginate: false,
          // columnDefs: [
          //     { "height": "10%", "targets": 1 }
          //   ],


          language: {
            url: '//cdn.datatables.net/plug-ins/1.10.20/i18n/Spanish.json'
          }
        });
      // });
    }, 300);
    // this.cargarExpensas();
  }
  seleccion(evento){
    this.periodo = evento;

  }
  seleccionTotal(item){

  }
  seleccionconcepto(item){
    let concept = this.conceptoVisitado.filter( data=>{return data == item.concepto.tipoConcepto.nombre;})
    if(concept.length>0){
      return false;
    }else{
      this.conceptoVisitado.push(item.concepto.tipoConcepto.nombre);
    }
    return true;
    // console.log(item)
  }
  recuperaExpensas(){
    let mes = this.periodo.getMonth()+1;
    let contador = mes.toString().length;
    let periodoActual =`${this.periodo.getFullYear()}-${('0'.repeat(2-contador)).concat(mes.toString())}`;
    this.expensasSubscription = this._exp.getExpensas(periodoActual)
                  .subscribe(expensas => {
                    this.expensas = expensas;
                    console.log(this.expensas[0])
                  });
  }

  // cargarExpensas() {
  //   this.expensasSubscription = this._exp.getExpensas()
  //                 .subscribe(expensas => {
  //                   this.expensas = expensas; });
  //   console.log('EXPENSAS SUB - ', this.expensas);
  // }

}
