import { Injectable } from '@angular/core';
import { UnidadFuncional } from 'src/app/models/unidad-funcional.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnidadFuncionalService {
  unidadFuncionales:UnidadFuncional[] = [
    {
      nro: 0,
      codigo: 'PB-01',
      ubicacion:'FI-2',
      tamanio: 42,
      prorrateo: 0.07,
      propietario:{
        nombre:'Juan Gomez',
        mail: 'jgomez@gmail.com',
        password: '**********'
      }
    },
    {
        nro: 1,
        codigo: 'PB-02',
        ubicacion:'FD-1',
        tamanio: 60,
        prorrateo: 0.10,
        propietario:{
          nombre:'Javier Lopez',
          mail: 'jlopez@gmail.com',
          password: '**********'
        }
      }
    ]

  constructor() { }
  getUnidades():Observable<any>{
   return new Observable(unidadFuncionales =>{
     unidadFuncionales.next(this.unidadFuncionales);
    });
  }
}
