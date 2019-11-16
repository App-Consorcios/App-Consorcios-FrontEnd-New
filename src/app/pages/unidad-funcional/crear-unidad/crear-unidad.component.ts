import { Component, OnInit } from '@angular/core';
import { UnidadFuncional } from 'src/app/models/unidad-funcional.model';
import { UnidadFuncionalService } from 'src/app/services/unidad-funcional/unidad-funcional.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-unidad',
  templateUrl: './crear-unidad.component.html',
  styleUrls: ['./crear-unidad.component.css']
})
export class CrearUnidadComponent implements OnInit {
  // unidadesFuncionales:UnidadFuncional[] = [];
  unidadFuncional: UnidadFuncional
  unidadesFuncionales:any
  // unidadFuncional:object = {
  //   codigo:"",
  //   prorrateo:"",
  //   tamanio:"",
  //   ubicacion:{
  //     codigo: "",
  //     descrp: ""
  //   }
  // }
  unidad:string = "";
  mensaje:boolean = false;
  forma:FormGroup;
  forma2:FormGroup;

  constructor(private _uf:UnidadFuncionalService) {
    this._uf.getUnidades().subscribe( data =>{
      this.unidadesFuncionales = data;
      console.log("UNIDADES FUNCIONALES -", this.unidadesFuncionales);
    });
    this.forma = new FormGroup({
      'codigoDepartamento': new FormControl('',[Validators.required,Validators.minLength(2)]),
      'descripcionDepartamento': new FormControl(''),
      'prorrateo': new FormControl('',Validators.required),
      'metrosCuadrados': new FormControl('',Validators.required),
      'ubicacion': new FormGroup({
        'codigoUbicacion': new FormControl('',[Validators.required,Validators.minLength(2)]),
        'descripcionUbicacion': new FormControl('')
      })
    });
    this.forma2 = new FormGroup({
      'buscar':new FormControl('')
    })

  }

  ngOnInit() {
  }
  guardarCambios(){
    // console.log(this.forma.value);
    // console.log(this.forma);
    this.mensaje = true;
    setTimeout(()=>{ this.mensaje = false},3000)

    _uf:UnidadFuncionalService
    // this._uf.crearUnidad.subscribe( data =>{
    //   this.unidadesFuncionales = data;
    //   console.log("UNIDADES FUNCIONALES -", this.unidadesFuncionales);
    // });

    this._uf.crearUnidad(this.forma.value)

    // this._user.asignarRol(user[0].id,roles);

    this.unidad = this.forma.get('codigoDepartamento').value;
    console.log("UNIDAD GUARDADA - ",this.forma.value);
    
    //  this.forma.reset({
    //   codigoDepartamento:"",
    //    prorrateo:"",
    //    metrosCuadrados:"",
    //    ubicacion:{
    //     codigoUbicacion: "",
    //     descripcionUbicacion: ""
    //    }
    //  });
  }



}
