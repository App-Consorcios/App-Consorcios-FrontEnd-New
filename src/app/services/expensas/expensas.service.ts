import { Injectable } from '@angular/core';
import { Tipo } from 'src/app/models/tipo.model';
import { Observable } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Concepto } from 'src/app/models/concepto.model';
import { Expensa } from 'src/app/models/expensa.model';
import { UnidadFuncionalService } from '../unidad-funcional/unidad-funcional.service';
import { UnidadFuncional } from 'src/app/models/unidad-funcional.model';
import { Saldo } from 'src/app/models/saldo.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExpensasService {
  tipos:Tipo[] = []
  conceptos:Concepto[] = [
    {
      nombre: "Cargas Sociales",
      tipo: {
        nombre: "Generales",
        color: "Rojo",
      },
    },
    {
      nombre: "Limpieza y servicios",
      tipo: {
        nombre: "Generales",
        color: "Rojo",
      }
    },
    {
      nombre: "Fumigación",
      tipo: {
        nombre: "Generales",
        color: "Rojo",
      }
    },
    {
      nombre: "Papeluchos",
      tipo: {
        nombre: "Gastos Varios",
        color: "Verde",
      }
    },
    {
      nombre: "Abonos Servicios",
      tipo: {
        nombre: "Generales",
        color: "Rojo",
      }
    },
    {
      nombre: "Servicios Publicos",
      tipo: {
        nombre: "Generales",
        color: "Rojo",
      }
    },
    {
      nombre: "Gastos Administrativos",
      tipo: {
        nombre: "Generales",
        color: "Rojo",
      }
    },
    {
      nombre: "Gastos Mantenimiento",
      tipo: {
        nombre: "Generales",
        color: "Rojo",
      }
    }
  ]
  expensas:any[] = [
    {
      id: '001',
      periodo:'01-10-2019',
      unidad:{
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
      total: 6000,
      item:[
        {
          id:'001',
          numero: 1,
          concepto:{
            nombre: "Cargas Sociales",
            tipo: {
              nombre: "Generales",
              color: "Rojo",
              sigla: "G"
            }
          },
          monto:300
        },
        {
          id:'001',
          numero: 2,
          concepto:{
            nombre: "Papeluchos",
            tipo:{
              nombre: "Gastos Varios",
              color: "Verde",
              sigla: "V"
            }
          },
          monto:300
        },
        {
          id:'001',
          numero: 3,
          concepto:{
            nombre: "Abonos Servicios",
            tipo: {
              nombre: "Generales",
              color: "Rojo",
              sigla: "G"
            }
          },
          monto:300
        },
        {
          id:'001',
          numero: 4,
          concepto:{
            nombre: "Reparaciones de Edificio",
            tipo: {
              nombre: "Generales",
              color: "Rojo",
              sigla: "G"
            }
          },
          monto:300
        },
        {
          id:'001',
          numero: 5,
          concepto:{
            nombre: "Servicios Publicos",
            tipo: {
              nombre: "Generales",
              color: "Rojo",
              sigla: "G"
            }
          },
          monto:300
        },
        {
          id:'001',
          numero: 5,
          concepto:{
            nombre: "Gastos Administrativos",
            tipo: {
              nombre: "Generales",
              color: "Rojo",
              sigla: "G"
            }
          },
          monto:300
        },
        {
          id:'001',
          numero: 5,
          concepto:{
            nombre: "Gastos Mantenimiento",
            tipo: {
              nombre: "Generales",
              color: "Rojo",
              sigla: "G"
            }
          },
          monto:300
        }
      ]
    },
    {
      id: '002',
      periodo:'01-10-2019',
      unidad:{
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
      },
      total: 6000,
      item:[
        {
          id:'002',
          numero: 1,
          concepto:{
            nombre: "Cargas Sociales",
            tipo: {
              nombre: "Generales",
              color: "Rojo",
              sigla: "G"
            }
          },
          monto:300
        },
        {
          id:'002',
          numero: 2,
          concepto:{
            nombre: "Papeluchos",
            tipo:{
              nombre: "Gastos Varios",
              color: "Verde",
              sigla: "V"
            }
          },
          monto:300
        },
        {
          id:'002',
          numero: 3,
          concepto:{
            nombre: "Abonos Servicios",
            tipo: {
              nombre: "Generales",
              color: "Rojo",
              sigla: "G"
            }
          },
          monto:300
        },
        {
          id:'002',
          numero: 4,
          concepto:{
            nombre: "Reparaciones de Edificio",
            tipo: {
              nombre: "Generales",
              color: "Rojo",
              sigla: "G"
            }
          },
          monto:300
        },
        {
          id:'002',
          numero: 5,
          concepto:{
            nombre: "Servicios Publicos",
            tipo: {
              nombre: "Generales",
              color: "Rojo",
              sigla: "G"
            }
          },
          monto:300
        },
        {
          id:'002',
          numero: 5,
          concepto:{
            nombre: "Gastos Administrativos",
            tipo: {
              nombre: "Generales",
              color: "Rojo",
              sigla: "G"
            }
          },
          monto:300
        },
        {
          id:'002',
          numero: 5,
          concepto:{
            nombre: "Gastos Mantenimiento",
            tipo: {
              nombre: "Generales",
              color: "Rojo",
              sigla: "G"
            }
          },
          monto:300
        }
      ]
    }
  ];
  // unidadFuncionales:UnidadFuncional[]=[];
  unidadFuncionales:any
  saldos:Saldo[] = [
    {
      periodo:'01-09-2019',
      concepto:{
        nombre: "Cargas Sociales",
        tipo: {
          nombre: "Generales",
          color: "Rojo"
        },
      },
      descripcion:"Portería",
      monto: 14000
    },
    {
     periodo:'01-09-2019',
     concepto:{
       nombre: "Papeluchos",
       tipo: {
         nombre: "Gastos Varios",
         color: "Verde"
       }
     },
     descripcion:"Imprenta Don Jose: Actas e impresiones",
     monto: 600
    },
    {
      periodo:'01-09-2019',
      concepto:{
        nombre: "Abonos Servicios",
        tipo: {
          nombre: "Generales",
          color: "Rojo"
        }
      },
      descripcion:"ABL",
      monto: 20000
    },
    {
      periodo:'01-09-2019',
      concepto:{
        nombre: "Fumigación",
        tipo: {
          nombre: "Generales",
          color: "Rojo"
        }
      },
      descripcion:"Masacre de roedores",
      monto: 20000
    },
    {
      periodo:'01-09-2019',
      concepto:{
        nombre: "Limpieza y servicios",
        tipo: {
          nombre: "Generales",
          color: "Rojo"
        }
      },
      descripcion:"Barrido de pasillo y limpieza de ventanas",
      monto: 20000
    },
    {
      periodo:'01-09-2019',
      concepto:{
        nombre: "Servicios Publicos",
        tipo: {
          nombre: "Generales",
          color: "Rojo"
          }
      },
      descripcion:"Entongado: Acomodo de inspector municipal",
      monto: 16000
    },
    {
      periodo:'01-09-2019',
      concepto:{
           nombre: "Gastos Administrativos",
           tipo: {
             nombre: "Generales",
             color: "Rojo"
             }
         },
         descripcion:"Viaticos y sellos",
         monto: 17000
    },
    {
      periodo:'01-09-2019',
      concepto:{
        nombre: "Gastos Mantenimiento",
        tipo: {
          nombre: "Generales",
          color: "Rojo"
        }
      },
      descripcion:"Mantenimiento de luminarias",
      monto: 6000
    }
]

  constructor(public _uf:UnidadFuncionalService,
              private _http:HttpClient) {
     this._uf.getUnidades().subscribe( data =>{
         this.unidadFuncionales = data;
     })

  }

  getTipos():Observable<any>{
    let url = URL_SERVICIOS + '/conceptos/tipos'
    return this._http.get(url);
   // return new Observable(tipos =>{
   //   tipos.next(this.tipos);
   //  });
  }
  postTipo(tipo:Tipo):Observable<any>{
    let url = URL_SERVICIOS + '/conceptos/tipo'
    var headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this._http.post(url,JSON.stringify(tipo),{headers: headers});

    // return new Observable( payload =>{
    //   this.tipos.push(tipo);
    //   payload.next({
    //     ok:true,
    //     message: 'El tipo se guardo correctamente'
    //   });
    // })
  }
  deleteTipo(tipo:Tipo):Observable<any>{
    return new Observable( tipos =>{
      this.tipos.splice(this.tipos.indexOf(tipo), 1);
      tipos.next({
        ok:true,
        message: 'El tipo fue eliminado correctamente'
      });
    })
  }
  getConceptos():Observable<any>{
   // let url = URL_SERVICIOS + '/conceptos'
   // return this._http.get(url);
   return new Observable(conceptos =>{
     conceptos.next(this.conceptos);
    });
  }
  postConcepto(concepto:Concepto):Observable<any>{
    // let url = URL_SERVICIOS + '/concepto'
    // var headers = new HttpHeaders({
    //   "Content-Type": "application/json"
    // });
    // console.log(JSON.stringify(concepto))
    // return this._http.post(url,JSON.stringify(concepto),{headers: headers});

    return new Observable( payload =>{
      this.conceptos.push(concepto);
      this.postSaldos(concepto).subscribe( data =>{
        console.log(data);
      });
      payload.next({
        ok:true,
        message: 'El concepto se guardo correctamente'
      });
    })
  }
  deleteConcepto(concepto:Concepto):Observable<any>{
    return new Observable( conceptos =>{
      this.conceptos.splice(this.conceptos.indexOf(concepto), 1);
      conceptos.next({
        ok:true,
        message: 'El concepto fue eliminado correctamente'
      });
    })
  }
  createMatrizNovedad(){
    let matriz:any[] = [];
    let item:any = [];
    let cantConceptos = this.conceptos.length;
    let j
    for(let i = 0; i<cantConceptos+1; i++){
      item = [];
      for(j = 0; j < this.unidadFuncionales.length; j++){
        item.push(this.unidadFuncionales[j].prorrateo);
        console.log("PRORRATEO - ", this.unidadFuncionales[j].prorrateo);
      }
      matriz.push(item);

    }
    return matriz;

  }
  getSaldos():Observable<any>{
    return new Observable(saldos =>{
      saldos.next(this.saldos);
    })
  }
  postSaldos(concepto):Observable<any>{
    return new Observable((payload) =>{
    let saldo = {
        periodo :'',
        concepto: concepto,
        descripcion: "",
        monto: 0
      }
      this.saldos.push(saldo);
      console.log(this.saldos);

      payload.next({
        ok:true,
        message: 'Los saldos agregaron correctamente'
      });
    })
  }
  putSaldos(saldos):Observable<any>{
    return new Observable((payload) =>{
      console.log(saldos);
      for(let i = 0;i<this.saldos.length;i++){
        if(this.saldos[i].concepto.nombre == saldos[i].nombre){
          this.saldos[i].monto = saldos[i].monto;
        }
      }
      console.log(this.saldos);

      payload.next({
        ok:true,
        message: 'Los saldos se modificaron correctamente'
      });
    })
  }


  getExpensas():Observable<any>{
    console.log("SERVICE GET EXPENSAS");

    return new Observable(expensas => {
      expensas.next(this.expensas);
     });
   }

}
