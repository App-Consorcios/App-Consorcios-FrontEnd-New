import { Component, OnInit } from '@angular/core';
import { UnidadFuncional } from 'src/app/models/unidad-funcional.model';
import { ExpensasService } from 'src/app/services/expensas/expensas.service';
import { UnidadFuncionalService } from 'src/app/services/unidad-funcional/unidad-funcional.service';

@Component({
  selector: 'app-crear-unidad',
  templateUrl: './crear-unidad.component.html',
  styleUrls: ['./crear-unidad.component.css']
})
export class CrearUnidadComponent implements OnInit {
  unidadesFuncionales:UnidadFuncional[] = [];
  
  constructor(private _uf:UnidadFuncionalService) {
    this._uf.getUnidades().subscribe( data =>{
      this.unidadesFuncionales = data;
    });

  }

  ngOnInit() {
  }



}
