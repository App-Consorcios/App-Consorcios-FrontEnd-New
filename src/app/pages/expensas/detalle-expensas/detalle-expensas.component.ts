import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ExpensasService } from 'src/app/services/expensas/expensas.service';
import { Subscription } from 'rxjs';
import { Concepto } from 'src/app/models/concepto.model';
import { Detalle } from 'src/app/models/detalle.model';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Saldo } from 'src/app/models/saldo.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-expensas',
  templateUrl: './detalle-expensas.component.html',
  styleUrls: ['./detalle-expensas.component.css']
})
export class DetalleExpensasComponent implements OnInit {
  categorias:Concepto[] = [];
  detalles:Saldo[] = [];
  periodo:Date = new Date();

  conceptosSubscription:Subscription;
  constructor(private _exp:ExpensasService,
              public cd:ChangeDetectorRef) {

   }

  ngOnInit() {
    this.cd.markForCheck();
    this.cargarConceptos();
    this.cd.detectChanges();

  }
  cargarConceptos(){
    this.conceptosSubscription = this._exp.getConceptos()
                  .subscribe(categorias =>{
                    this.categorias = categorias;
                  });

  }
  drop(event: CdkDragDrop<string[]>) {
    let  array = event.container.element.nativeElement.textContent.split(" ");
    let item:string;
    let categoria:Concepto[] = []
    array.shift()
    item = array.join(" ");
    console.log();
    categoria =this.categorias.filter(data =>{
      return data.nombre == item.trim();
    })
    if(categoria.length>0){
      this.cd.markForCheck();
        this.detalles.push({periodo:'01-10-2019',concepto: categoria[0],descripcion:"",monto:0});
      this.cd.detectChanges();

    }
  }
  eliminarDetalle(item){
    this.detalles.splice(this.detalles.indexOf(item),1);
  }
  recuperarUltimoMes(){
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
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            console.log("reemplazarlos");
              this.detalles = [];
              this._exp.getSaldos().subscribe(saldos =>{

                for(let i of saldos){
                  this.detalles.push(i);
                }
                console.log(this.detalles);
              });
          }
        })
    }
    this._exp.getSaldos().subscribe(saldos =>{
      for(let i of saldos){
        this.detalles.push(i);
      }
    });
  }
  guardarMesActual(){


  }

}
