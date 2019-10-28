import { Injectable } from '@angular/core';
import { UnidadFuncional } from 'src/app/models/unidad-funcional.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnidadFuncionalService {
  unidadFuncionales:UnidadFuncional[] = [
    {
      id: 0,
      codigo: 'PB-01',
      ubicacion:'FI-PB',
      descripcion:'Frente izquierdo, planta baja ',
      tamanio: 42,
      prorrateo: 0.07,
      propietario:{
        nombre: "Lucas",
        apellido: "Ganzoroli",
        password: "123456",
        mail: "lganzoroli@gmail.com",
        imagen: "",
        roles: [
          {
            nombre: "propietario"
          }
        ]
      },
      inquilino:{
        nombre: "Alberto",
        apellido: "Rodriguez",
        password: "123456",
        mail: "arodriguez@gmail.com",
        imagen: "",
        roles: [
            {
              nombre: "inquilino"
            }
          ]
      }
    },
    {
        id: 1,
        codigo: 'PB-02',
        ubicacion:'FD-PB',
        descripcion:'Frente derecho, planta baja',
        tamanio: 60,
        prorrateo: 0.10,
<<<<<<< HEAD
        propietario:null,
        inquilino:null
      },
      {
          id: 2,
          codigo: 'P2-01',
          ubicacion:'FD-P2',
          descripcion:'Frente derecho, segundo piso',
          tamanio: 60,
          prorrateo: 0.10,
          propietario:null,
          inquilino:null
      },
      {
          id: 3,
          codigo: 'P2-02',
          ubicacion:'FI-P2',
          descripcion:'Frente izquierdo, segundo piso',
          tamanio: 60,
          prorrateo: 0.10,
          propietario:{
              id: 6,
              nombre: "lucas",
              apellido: "Perdroza",
              mail: "mpedroza@gmail.com",
              imagen: "",
              roles: [
                  {
                      nombre: "propietario"
                  }
              ]
          },
          inquilino:null
      },
      {
          id: 4,
          codigo: 'P3-01',
          ubicacion:'FI-P3',
          descripcion:'Frente izquierdo, Tercer piso',
          tamanio: 60,
          prorrateo: 0.10,
          propietario:null,
          inquilino:{
            id: 7,
            nombre: "Martin",
            apellido: "Cañete",
            mail: "mcanete@gmail.com",
            imagen: "",
            roles: [
                {
                    nombre: "inquilino"
                }
            ]
=======
        propietario:{
          nombre:'Javier Lopez',
          mail: 'jlopez@gmail.com',
          password: '**********'
>>>>>>> 2c3f36dc98592642e7b404e9079114ae3b88746c
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
