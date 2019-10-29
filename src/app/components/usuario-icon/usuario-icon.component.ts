import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UnidadFuncionalService } from 'src/app/services/unidad-funcional/unidad-funcional.service';
import { UnidadFuncional } from 'src/app/models/unidad-funcional.model';

@Component({
  selector: 'app-usuario-icon',
  templateUrl: './usuario-icon.component.html',
  styleUrls: ['./usuario-icon.component.css']
})
export class UsuarioIconComponent implements OnInit {
  valorHome:number = 300;
  valorInq:number = 200;
  valorProp:number = 100;
  @Output("propietario") public propietario = new EventEmitter()
  @Output("inquilino") public  inquilino= new EventEmitter()
  @Output("unidad") public unidad = new EventEmitter()


  constructor() {


  }

  ngOnInit() {
  }
  adelantarHome(){
    this.valorHome = 300;
    this.valorInq = 200;
    this.valorProp = 100;
    this.unidad.emit(true);
    this.propietario.emit(false);
    this.inquilino.emit(false);
  }
  adelantarProp(){
    this.valorHome = 100;
    this.valorInq = 200;
    this.valorProp = 300;
    this.unidad.emit(false);
    this.propietario.emit(true);
    this.inquilino.emit(false);
  }
  adelantarInq(){
    this.valorHome = 100;
    this.valorInq = 300;
    this.valorProp = 200;
    this.unidad.emit(false);
    this.propietario.emit(false);
    this.inquilino.emit(true);
  }
}
