import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Expensa } from 'src/app/models/expensa.model';
import { ExpensasService } from 'src/app/services/expensas/expensas.service';
import { Router, NavigationEnd } from '@angular/router';
declare var jQuery: any;
@Component({
  selector: 'app-ver-expensas',
  templateUrl: './ver-expensas.component.html',
  styleUrls: ['./ver-expensas.component.css']
})
export class VerExpensasComponent implements OnInit{

  expensasSubscription: Subscription;
  expensas: Expensa[] = [];
  periodo:Date = new Date();
  conceptoVisitado:any[]=[];

  constructor(
    private _exp: ExpensasService,public router:Router) { }

  ngOnInit() {
  }
  seleccion(evento){
    this.periodo = evento;
  }
  seleccionconcepto(item){
    let concept = this.conceptoVisitado.filter( data=>{return data == item.concepto.tipoConcepto.nombre;})
    if(concept.length>0){
      return false;
    }else{
      this.conceptoVisitado.push(item.concepto.tipoConcepto.nombre);
    }
    return true;
  }
  recuperaExpensas(){
    let mes = this.periodo.getMonth()+1;
    let contador = mes.toString().length;
    let periodoActual =`${this.periodo.getFullYear()}-${('0'.repeat(2-contador)).concat(mes.toString())}`;
    this.expensasSubscription = this._exp.getExpensas(periodoActual)
                  .subscribe(expensas => {
                    this.expensas = expensas;
                    console.log(expensas)

                  });
  }
}
