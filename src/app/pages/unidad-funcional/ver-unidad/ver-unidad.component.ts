import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UnidadFuncionalService } from 'src/app/services/unidad-funcional/unidad-funcional.service';
import { UnidadFuncional } from 'src/app/models/unidad-funcional.model';

@Component({
  selector: 'app-ver-unidad',
  templateUrl: './ver-unidad.component.html',
  styleUrls: ['./ver-unidad.component.css']
})
export class VerUnidadComponent implements OnInit {
  unidadesFuncionales:UnidadFuncional[] = [];
  esUnidadFuncional:boolean = true
  esPropietario:boolean = false
  esInquilino:boolean = false

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
      console.log(this.unidadesFuncionales);
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

}
