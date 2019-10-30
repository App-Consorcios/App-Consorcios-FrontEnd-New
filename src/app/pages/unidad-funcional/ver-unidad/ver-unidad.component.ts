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
  unidadesFuncionales:UnidadFuncional[] = [];
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
    console.log(this.forma)
    this.forma.controls['codigo'].setValue(this.unidadesFuncionales[this.pagActual].codigo)
    this.forma.controls['prorrateo'].setValue(this.unidadesFuncionales[this.pagActual].prorrateo)
    this.forma.controls['tamanio'].setValue(this.unidadesFuncionales[this.pagActual].tamanio)
    this.forma.controls['ubicacion'].controls['codigo'].setValue(this.unidadesFuncionales[this.pagActual].ubicacion)
    this.forma.controls['ubicacion'].controls['descrp'].setValue(this.unidadesFuncionales[this.pagActual].descripcion)
    this.inquilino = this.unidadesFuncionales[this.pagActual].inquilino;
    this.propietario = this.unidadesFuncionales[this.pagActual].propietario;
  }

}
