import { Component, OnInit } from '@angular/core';
import { Tipo } from 'src/app/models/tipo.model';
import { ExpensasService } from 'src/app/services/expensas/expensas.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Concepto } from 'src/app/models/concepto.model';

@Component({
  selector: 'app-crear-expensas',
  templateUrl: './crear-expensas.component.html',
  styleUrls: ['./crear-expensas.component.css']
})
export class CrearExpensasComponent implements OnInit {
  tipos:Tipo[] = [];
  tiposSubscription:Subscription;
  tipo:Tipo = {
    nombre:"",
    color:""
  };
  conceptos:Concepto[]=[];
  concepto:Concepto = {
    nombre:"",
    tipo:{
      nombre:"",
      color:""
    }
  }
  conceptosSubscription:Subscription;
  mensaje:string="";

  constructor(private _exp:ExpensasService) {

  }

  ngOnInit() {
    this.cargarTipos();
    this.cargarConceptos();
  }
  cargarTipos(){
    this.tiposSubscription = this._exp.getTipos()
                  .subscribe(tipos =>{
                    this.tipos = tipos;
                  });
  }
  guardarTipoConcepto(forma:NgForm){
    if(forma.value.nombre != ""){
      let tipo = new Tipo(forma.value.nombre,forma.value.color);
      this._exp.postTipo(tipo).subscribe(result =>{
        this.mensaje = result.message;
        this._exp.getTipos()
                      .subscribe(tipos =>{
                        this.tipos = tipos;
                      });
      })
    }
  }
  eliminarTipoConcepto(item){
    let tipo = new Tipo(item.nombre,item.color);
    this._exp.deleteTipo(item).subscribe(data =>{
       this.mensaje = data.message;
    })
  }
  cargarConceptos(){
    this.conceptosSubscription = this._exp.getConceptos()
                  .subscribe(conceptos =>{
                    this.conceptos = conceptos;});
  }
  guardarConcepto(forma:NgForm){
    if(forma.value.nombre != ""){
      let tipo:any = this.tipos.filter((data:any)=> {return data.nombre === forma.value.tipo})[0];
      let concepto = new Concepto(forma.value.nombreConcepto,tipo);
      this._exp.postConcepto(concepto).subscribe(result =>{
        this.mensaje = result.message;
        this._exp.getConceptos()
                      .subscribe(conceptos =>{
                        this.conceptos = conceptos;});
      })
    }
  }
  eliminarConcepto(item){
    let concepto = new Concepto(item.nombre,this.tipo);
    this._exp.deleteConcepto(concepto).subscribe(data =>{
       this.mensaje = data.message;
    })
  }

}
