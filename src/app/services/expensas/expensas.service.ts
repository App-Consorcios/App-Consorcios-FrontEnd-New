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
  tipos:Tipo[] = [];
  conceptos:Concepto[] = [];
  expensas:any[] = [];
  unidadFuncionales:UnidadFuncional[]=[];
  saldos:Saldo[] = []

  constructor(public _uf:UnidadFuncionalService,
              private _http:HttpClient) {
     this._uf.getUnidades().subscribe( (data:any) =>{
         this.unidadFuncionales = data;
     })

  }

  getTipos():Observable<any>{
    let url = URL_SERVICIOS + '/conceptos/tipos'
    return this._http.get(url);
  }
  postTipo(tipo:Tipo):Observable<any>{
    let url = URL_SERVICIOS + '/conceptos/tipo'
    var headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this._http.post(url,JSON.stringify(tipo),{headers: headers});
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
   let url = URL_SERVICIOS + '/conceptos'
   return this._http.get(url);

  }
  postConcepto(concepto:Concepto):Observable<any>{
    let url = URL_SERVICIOS + '/concepto'
    var headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this._http.post(url,JSON.stringify(concepto),{headers: headers});
  }
  deleteConcepto(nombre:string):Observable<any>{
    let url = `${URL_SERVICIOS}/concepto?nombre=${nombre}`;
    return this._http.delete(url);
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
      }
      matriz.push(item);

    }
    return matriz;

  }
  getSaldos(periodo):Observable<any>{
    let url = `${URL_SERVICIOS}/expensas?periodo=${periodo}`;
    return this._http.get(url).pipe(map((data:any) =>{
      this.saldos =[];
      if(data.length>0 && data!=undefined){
        this.saldos.push({periodo:data[0].periodo,itemsGenerales:[]})
        for(let saldo of data[0].itemsGenerales){
          this.saldos[0].itemsGenerales.push({
              conceptoNombre:saldo.concepto,
              descripcion: saldo.descripcion,
              monto: saldo.monto
            });
        }
        return this.saldos;
      }
      return data;
    }));
  }
  postSaldos(expensa:any):Observable<any>{
    let url = `${URL_SERVICIOS}/expensa`;
    var headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    console.log(JSON.stringify(expensa))
    return this._http.post(url,JSON.stringify(expensa),{headers: headers});
  }
  putSaldos(saldos):Observable<any>{
    return new Observable((payload) =>{
      console.log(saldos);
      // for(let i = 0;i<this.saldos.length;i++){
      //   if(this.saldos[i].concepto.nombre == saldos[i].nombre){
      //     this.saldos[i].monto = saldos[i].monto;
      //   }
      // }
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


   //POST de total expensas generales
   postExpensas(){
   }

}
