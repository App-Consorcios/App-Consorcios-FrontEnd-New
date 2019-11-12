import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { UnidadFuncionalService } from 'src/app/services/unidad-funcional/unidad-funcional.service';
import { UnidadFuncional } from 'src/app/models/unidad-funcional.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Usuario } from 'src/app/models';

@Component({
  selector: 'app-ver-unidad',
  templateUrl: './ver-unidad.component.html',
  styleUrls: ['./ver-unidad.component.css']
})
export class VerUnidadComponent implements OnInit {
  // unidadesFuncionales:UnidadFuncional[] = [];
  unidadesFuncionales:any
  esUnidadFuncional:boolean = true
  esPropietario:boolean = false
  esInquilino:boolean = false
  pagActual:number = 1;
  usuarios:Usuario[]=[];
  inquilino:Usuario;
  propietario:Usuario;

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

  constructor(private _uf:UnidadFuncionalService,
              private _ar:ActivatedRoute,
              private _auth:AuthService) {
    this._ar.params.subscribe( params =>{
      this.pagActual = params['id'];
    })
    this._auth.cargarUsuarios().subscribe( (user:any) =>{
      this.usuarios = user;
    })
    this._uf.getUnidades().subscribe( data =>{
      this.unidadesFuncionales = data;
      console.log("GET UF VER UNIDAD - ",this.unidadesFuncionales);
    });
    this.forma = new FormGroup({
      'codigoDepartamento': new FormControl('',[Validators.required,Validators.minLength(3)]),
      'prorrateo': new FormControl('',Validators.required),
      'metrosCuadrados': new FormControl('',Validators.required),
        'codigoUbicacion': new FormControl('',[Validators.required,Validators.minLength(3)]),
        'descripcionUbicacion': new FormControl('')
    })

  }
  ngOnInit() {
    console.log(this.forma)
    console.log("PAG ACTUAL - ", this.pagActual);
    
    this.forma.controls['codigoDepartamento'].setValue(this.unidadesFuncionales[this.pagActual].codigoDepartamento)
    this.forma.controls['prorrateo'].setValue(this.unidadesFuncionales[this.pagActual].prorrateo)
    this.forma.controls['metrosCuadrados'].setValue(this.unidadesFuncionales[this.pagActual].metrosCuadrados)
    this.forma.controls['codigoUbicacion'].setValue(this.unidadesFuncionales[this.pagActual].codigoUbicacion)
    this.forma.controls['descripcionUbicacion'].setValue(this.unidadesFuncionales[this.pagActual].descripcionUbicacion)
    this.inquilino = this.unidadesFuncionales[this.pagActual].inquilino;
    this.propietario = this.unidadesFuncionales[this.pagActual].propietario;
  }

}
