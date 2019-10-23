import { Component, OnInit } from '@angular/core';
import { UnidadFuncional } from 'src/app/models/unidad-funcional.model';
import { ExpensasService } from 'src/app/services/expensas/expensas.service';
import { UnidadFuncionalService } from 'src/app/services/unidad-funcional/unidad-funcional.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-unidad',
  templateUrl: './crear-unidad.component.html',
  styleUrls: ['./crear-unidad.component.css']
})
export class CrearUnidadComponent implements OnInit {
  unidadesFuncionales:UnidadFuncional[] = [];
  unidadFuncional:object = {
    codigo:"",
    prorrateo:"",
    tamanio:"",
    ubicacion:{
      codigo: "",
      descrp: ""
    }
  }
  unidad:string = "";
  mensaje:boolean = false;
  forma:FormGroup;

  constructor(private _uf:UnidadFuncionalService) {
    this._uf.getUnidades().subscribe( data =>{
      this.unidadesFuncionales = data;
    });
    this.forma = new FormGroup({
      'codigo': new FormControl('',[Validators.required,Validators.minLength(3)]),
      'prorrateo': new FormControl('',Validators.required),
      'tamanio': new FormControl('',Validators.required),
      'ubicacion': new FormGroup({
        'codigo': new FormControl('',[Validators.required,Validators.minLength(3)]),
        'descrp': new FormControl('')
      })
    })

  }

  ngOnInit() {
  }
  guardarCambios(){
    console.log(this.forma.value);
    console.log(this.forma);
    this.mensaje = true;
    setTimeout(()=>{ this.mensaje = false},3000)
    this.unidad = this.forma.get('codigo').value;

     this.forma.reset({
       codigo:"",
       prorrateo:"",
       tamanio:"",
       ubicacion:{
         codigo: "",
         descrp: ""
       }
     });
  }



}
