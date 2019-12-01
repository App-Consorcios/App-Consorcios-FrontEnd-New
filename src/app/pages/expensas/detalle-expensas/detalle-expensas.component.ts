import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ExpensasService } from 'src/app/services/expensas/expensas.service';
import { Subscription, throwError } from 'rxjs';
import { Concepto } from 'src/app/models/concepto.model';
import { Detalle } from 'src/app/models/detalle.model';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Saldo } from 'src/app/models/saldo.model';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-detalle-expensas',
  templateUrl: './detalle-expensas.component.html',
  styleUrls: ['./detalle-expensas.component.css']
})
export class DetalleExpensasComponent implements OnInit {
  categorias:Concepto[] = [];
  detalles:Saldo[] = [];
  saveDetalle:any;
  periodo:Date = new Date();
  fileContent:any[] =[];
  conceptosSubscription:Subscription;
  impGuardar:boolean = false;
  filename:string="Detalles-expensas.xlsx";
  constructor(private _exp:ExpensasService,
              public cd:ChangeDetectorRef) {

   }

  ngOnInit() {
    this.cd.markForCheck();
    this.cargarConceptos();
    this.cargarExpensas();
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
      }else{
        this.detalles = [];
      }
    })

  }
  drop(event: CdkDragDrop<string[]>) {
    // let  array = event.container.element.nativeElement.textContent.split(" ");
    let item:string;
    let categoria:any;
    let mes = this.periodo.getMonth()+1
    let contador = mes.toString().length
    let periodoActual =`${this.periodo.getFullYear()}-${('0'.repeat(2-contador)).concat(mes.toString())}`
    categoria = this.categorias[parseInt((event.container.id).replace("cdk-drop-list-",""))]
    this.saveDetalle = {periodo:periodoActual,itemsGenerales:[]}
      this.cd.markForCheck();
      let detalle = this.detalles.filter( data=> {return data.periodo == periodoActual})[0]
      if(detalle==undefined){
        this.detalles.push({periodo:periodoActual,itemsGenerales:[]});
        detalle = this.detalles[0];
      }
      detalle.itemsGenerales.push(
        {
           conceptoNombre:categoria,
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
    this.detalles.splice(this.detalles.indexOf(item),1);
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
              });
          }
        })
    }else{
      this._exp.getSaldos(periodoActual).subscribe(saldos =>{
        this.detalles=saldos;
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
               conceptoNombre: categoria[0],
               descripcion:this.fileContent[f][2],
               monto:this.fileContent[f][3]
             };
          this.detalles[0].itemsGenerales.push(item);
          this.saveDetalle.itemsGenerales.push({
           conceptoNombre:categoria[0].nombre,
           descripcion:this.fileContent[f][2],
           monto:this.fileContent[f][3]})
        }
      }

      this.impGuardar = false;
      this.filename = "";
      this.fileContent = [];
      this.guardarMesActual();
    }

  guardarMesActual(){
    let periodo =  this.detalles[0].periodo;
    this.saveDetalle = {periodo:this.detalles[0].periodo,itemsGenerales:[]}
    for(let saldoDetalle of this.detalles[0].itemsGenerales){
      this.saveDetalle.itemsGenerales.push({
           conceptoNombre:saldoDetalle.conceptoNombre,
           descripcion:saldoDetalle.descripcion,
           monto:saldoDetalle.monto});
    }

    this._exp.postSaldos(this.saveDetalle).subscribe( data =>{
      console.log(data);
    },(error)=>{

      if(error.error.status==400){
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          html: 'La expensa ya para el periodo <strong>'+ periodo.toString()+'</strong> ya se encuentra fue cargada',
        })
      }
    });
    // console.log(this.detalles);
  }

}
