import { Component, OnInit } from '@angular/core';
import { UnidadFuncional } from 'src/app/models/unidad-funcional.model';
import { UnidadFuncionalService } from 'src/app/services/unidad-funcional/unidad-funcional.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-crear-unidad',
  templateUrl: './crear-unidad.component.html',
  styleUrls: ['./crear-unidad.component.css']
})
export class CrearUnidadComponent implements OnInit {
  public unidadesFuncionales:UnidadFuncional[] = [];
  unidadFuncional: UnidadFuncional;
  unidad:string = "";
  mensaje:boolean = false;
  forma:FormGroup;
  forma2:FormGroup;

  constructor(private _uf:UnidadFuncionalService) {
    this._uf.getUnidades().subscribe( (data:any) =>{
      this.unidadesFuncionales = data;
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
  }

  ngOnInit() {
  }
  guardarCambios(){
    this.mensaje = true;
    setTimeout(()=>{this.mensaje = false},3000)
    let unidadFuncional = {
       "codigoDepartamento": this.forma.get('codigoDepartamento').value,
       "descripcionDepartamento": this.forma.get('descripcionDepartamento').value,
       "metrosCuadrados": this.forma.get('metrosCuadrados').value,
       "prorrateo": this.forma.get('prorrateo').value,
       "codigoUbicacion": this.forma.get('ubicacion').get('codigoUbicacion').value,
       "descripcionUbicacion": this.forma.get('ubicacion').get('descripcionUbicacion').value
    }
    this._uf.crearUnidad(unidadFuncional).subscribe((data:any) =>{
      this.unidadFuncional = data;
      this.unidad = this.unidadFuncional.codigoDepartamento;
    }),catchError( err=>{
        return throwError(err);
    })
    this.forma.reset({
     codigoDepartamento:"",
      prorrateo:"",
      metrosCuadrados:"",
      ubicacion:{
       codigoUbicacion: "",
       descripcionUbicacion: ""
      }
    });
    this._uf.getUnidades().subscribe( (data:any) =>{
      this.unidadesFuncionales = data;
    });
  }

}
