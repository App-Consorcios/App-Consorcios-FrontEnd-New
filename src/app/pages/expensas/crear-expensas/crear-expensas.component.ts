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
  fileContent:any[] =[];
  impGuardar:boolean = false;
  filename:string="categoría.xlsx";
  tipo:Tipo = {
    nombre:"",
    color:""
  };
  titulo:string;
  nuevoConcepto:any;
  nuevoTipo:any;
  mensaje:boolean = false;
  conceptos:Concepto[]=[];
  concepto:Concepto = {
    nombre:"",
    tipoConcepto:{
      nombre:"",
      color:""
    }
  }
  conceptosSubscription:Subscription;
  // mensaje:string="";

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
        forma.reset( {
          nombre:"",
          color:""
        });
        this.nuevoTipo = result.nombre;
        this.mensaje = true;
        setTimeout(()=>{this.mensaje = false},3000)
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
      let concepto = new Concepto(forma.value.nombreConcepto,{nombre:tipo.nombre});
      this._exp.postConcepto(concepto).subscribe(result =>{
        this.nuevoConcepto  = result;
        forma.reset({ nombre:"", tipoConcepto:{
          nombre:"",
          color:""
        }});
        this.mensaje = true;
        setTimeout(()=>{this.mensaje = false},3000)
        this._exp.getConceptos()
                      .subscribe(conceptos =>{
                        this.conceptos = conceptos;});
      })
    }
  }
  eliminarConcepto(item){
    let nombre =item.nombre.replace(/ /g,"+");
    this._exp.deleteConcepto(nombre).subscribe(data =>{
       console.log(data);
    })
  }
  importar(){
    let tipos:any;
    let tupla;

    for(let f = 0;f<this.fileContent.length;f++){
      if(f!=0){
        if(this.titulo == "Categoría"){
          tipos = this.tipos.filter(data=>{
            return data.nombre.toLowerCase().trim() ==  this.fileContent[f][1].toLowerCase().trim()});

          tupla = {
              nombre: this.fileContent[f][0].toString(),
              tipoConcepto: {
                    nombre: tipos[0].nombre
                }
              }
          this._exp.postConcepto(tupla).subscribe(result =>{
                  this.impGuardar = false;
                  this.filename = "";
                  this.fileContent = [];
            console.log(result)});

        }else{
          tupla = ({
            nombre:this.fileContent[f][0].toString(),
            color:this.fileContent[f][1].toString()
          })
         this._exp.postTipo(tupla).subscribe(result =>{console.log(result)

                 this.impGuardar = false;
                 this.filename = "";
                 this.fileContent = [];
         });
        }
      }
    }


    }

}
