import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ExpensasService } from 'src/app/services/expensas/expensas.service';
import { Subscription, throwError } from 'rxjs';
import { Concepto } from 'src/app/models/concepto.model';
import { Detalle } from 'src/app/models/detalle.model';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Saldo } from 'src/app/models/saldo.model';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-detalle-expensas',
  templateUrl: './detalle-expensas.component.html',
  styleUrls: ['./detalle-expensas.component.css']
})
export class DetalleExpensasComponent implements OnInit {
  descripcion:string;
  monto:any;
  categorias:Concepto[] = [];
  detalles:any[] = [];
  saveDetalle:any;
  periodo:Date = new Date();
  fileContent:any[] =[];
  conceptosSubscription:Subscription;
  impGuardar:boolean = false;
  filename:string="Detalles-expensas.xlsx";
  constructor(private _exp:ExpensasService,
              public cd:ChangeDetectorRef,
              public router:Router) {
    // this.router.routeReuseStrategy.shouldReuseRoute = function(){
    //   return false;
    // }
    //
    // this.router.events.subscribe((evt) => {
    //     if (evt instanceof NavigationEnd) {
    //     this.router.navigated = false;
    //     window.scrollTo(0, 0);
    //   }
    // });
    // this.cargarConceptos();
   }

  ngOnInit() {
    this.cd.markForCheck();
  this.cd.detectChanges();
    this.cargarConceptos();

    // this.cargarExpensas();
    this.cd.detectChanges();

  }
  cargarConceptos(){
    this.conceptosSubscription = this._exp.getConceptos()
                  .subscribe(categorias =>{
                    this.categorias = categorias;
                  });
  }
  cargarExpensas(){
    let mes = this.periodo.getMonth()+1;
    let contador = mes.toString().length;
    let periodoActual =`${this.periodo.getFullYear()}-${('0'.repeat(2-contador)).concat(mes.toString())}`;
    let categoria;
    this._exp.getSaldos(periodoActual).subscribe( data=>{
      if(data!=undefined){
        this.detalles = data;
        console.log(this.detalles);
      }else{
        this.detalles = [];
      }
    });
  }
  seleccion(evento){
    this.periodo = evento
  }
  drop(event: CdkDragDrop<string[]>) {
    let  array = event.container.element.nativeElement.textContent.split("#");

    let item:string;
    let categoria:any;
    let mes = this.periodo.getMonth()+1
    let contador = mes.toString().length
    let periodoActual =`${this.periodo.getFullYear()}-${('0'.repeat(2-contador)).concat(mes.toString())}`
    categoria = this.categorias[parseInt(array[0])];
    this.saveDetalle = {periodo:periodoActual,itemsGenerales:[]}
      this.cd.markForCheck();
      let detalle = this.detalles.filter( data=> {return data.periodo == periodoActual})[0]
      if(detalle==undefined){
        this.detalles.push({periodo:periodoActual,itemsGenerales:[]});
        detalle = this.detalles[0];
      }
      detalle.itemsGenerales.push(
        {
           concepto:categoria,
           descripcion:"",
           monto:0}
      )
      // this.saveDetalle.itemsGenerales.push({
      //      conceptoNombre:categoria.nombre,
      //      descripcion:"",
      //      monto:0});


      this.cd.detectChanges();

  }
  eliminarDetalle(item){
    this.detalles[0].itemsGenerales.splice(item,1);
  }
  recuperarUltimoMes(){
    let mes = this.periodo.getMonth()+1
    let contador = mes.toString().length
    let periodoActual =`${this.periodo.getFullYear()}-${('0'.repeat(2-contador)).concat(mes.toString())}`
    if(this.detalles.length>0){
      Swal.fire({
        title: '<h4><strong>Atención</strong></h4>',
        type: 'warning',
        html:
          'Hay elementos ya cargados, ' +
          '¿Que desea hacer?',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-check"></i>  Agregarlos',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
          '<i class="fa fa-close"></i> Reemplazarlos',
        cancelButtonAriaLabel: 'Thumbs down'
      }).then((result) => {
          if (result.value) {
            console.log("agregar");
            console.log(this.detalles)
            this._exp.getSaldos(periodoActual).subscribe(saldos =>{
              for(let saldo of saldos[0].itemsGenerales){
                this.detalles[0].itemsGenerales.push(saldo);
              }
            });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            console.log("reemplazarlos");
              this.detalles = [];
              this._exp.getSaldos(periodoActual).subscribe(saldos =>{
                this.detalles=saldos;
                console.log(this.detalles);
              });
          }
        })
    }else{
      this._exp.getSaldos(periodoActual).subscribe(saldos =>{
        this.detalles=saldos;
          console.log(this.detalles);
      });
    }

  }
  importar(){
    let mes = this.periodo.getMonth()+1
    let contador = mes.toString().length
    let periodoActual =`${this.periodo.getFullYear()}-${('0'.repeat(2-contador)).concat(mes.toString())}`
    let categoria;
    let item;
    let arrayItem:any[];
    this.detalles.push({periodo:periodoActual,itemsGenerales:[]});
    this.saveDetalle = {periodo:periodoActual,itemsGenerales:[]}

    for(let f = 0;f<this.fileContent.length;f++){
      if(f!=0){
        categoria = this.categorias.filter(data=>{
          return data.nombre.toLowerCase().trim() ==  this.fileContent[f][1].toLowerCase().trim()}
        );
          item ={
               concepto: categoria[0],
               descripcion:this.fileContent[f][2],
               monto:this.fileContent[f][3]
             };
          this.detalles[0].itemsGenerales.push(item);

          this.saveDetalle.itemsGenerales.push({
           conceptoNombre:categoria[0].nombre,
           descripcion:this.fileContent[f][2],
           monto:this.fileContent[f][3]});
        }
      }

      this.impGuardar = false;
      this.filename = "";
      this.fileContent = [];
      this.guardarMesActual();
    }

  guardarMesActual(){
    let mes = this.periodo.getMonth()+1;
    let contador = mes.toString().length;
    let periodoActual =`${this.periodo.getFullYear()}-${('0'.repeat(2-contador)).concat(mes.toString())}`;
    this.saveDetalle = {periodo:periodoActual,itemsGenerales:[]}
    console.log(this.descripcion)
    for(let saldoDetalle of this.detalles[0].itemsGenerales){

      // console.log(saldoDetalle)
      // console.log(saldoDetalle.monto)
      this.saveDetalle.itemsGenerales.push({
           conceptoNombre:saldoDetalle.concepto.nombre,
           descripcion:this.descripcion,
           monto:this.monto});
    }
    this._exp.getSaldos(periodoActual).subscribe( data=>{
      console.log(data);
      if(data.length>0 && data!=undefined){
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          html: 'La expensa para el periodo <strong>'+ periodoActual.toString()+'</strong> ya se encuentra fue cargada',
        })
      }else{
        console.log(this.saveDetalle)
        this._exp.postSaldos(this.saveDetalle).subscribe( data =>{
          console.log(data);
        },(error)=>{
          if(error.error.status==400){
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              html: 'La expensa para el periodo <strong>'+ periodoActual.toString()+'</strong> ya se encuentra fue cargada',
            })
          }
        });
      }
    });
  }

}
