import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() tope:number;
  @Input() cantidadResultados:number;

  //Devuelve si estoy viendo la última página
  @Output('ultimaPagina') public ultimaPagina:EventEmitter<boolean> = new EventEmitter();

    termino:string;
    storeSubscription:Subscription;
    paginas:number[] = [];
    paginaActual:number = 1;
    offset:number = 0;
    limit:number

  constructor() { }

  ngOnInit() {
    this.paginas = [];
    let cantidadPaginas = Math.floor(this.cantidadResultados/this.tope) + 1
    if (this.cantidadResultados == 0) {
      cantidadPaginas = 0
    }
    for (let i = 1; i <= cantidadPaginas; i++) {
        this.paginas.push(i)
    }
    this.limit = this.tope
  }
  cambiodePagina(numeroPagina:number){
    this.paginaActual = numeroPagina;
    this.offset = (numeroPagina*this.tope) - this.tope
    this.limit = numeroPagina*this.tope
    this.emitoUltimaPagina();
  }

  anterior(){
    this.paginaActual = this.paginaActual-1;
    this.offset = this.offset - this.tope
    this.limit = this.limit - this.tope
    this.emitoUltimaPagina();
  }

  siguiente(){
    this.paginaActual = this.paginaActual+1;
    this.offset = this.offset + this.tope
    this.limit = this.limit + this.tope
    this.emitoUltimaPagina();
  }

  emitoUltimaPagina(){
    if (this.paginaActual == this.paginas.length){
      this.ultimaPagina.emit(true);
    }
    else {
      this.ultimaPagina.emit(false);
    }
  }

}
