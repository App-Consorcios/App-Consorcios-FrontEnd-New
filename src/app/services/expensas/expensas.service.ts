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
  saldos:Saldo[] = [];
  conceptoVisitado:any[] = [];
  total:boolean=false;

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
    return this._http.post(url,JSON.stringify(expensa),{headers: headers});
  }
  getExpensas(periodo):Observable<any>{
    let item = [];
    let arritem = [];
    let totalCat = 0;
    let contador = 1;
    let url = `${URL_SERVICIOS}/expensas-unidades-funcionales?periodo=${periodo}`;
    return this._http.get(url).pipe(map((data:any)=>{
        if(data.expensasUnidadesFuncionales.length>0){
          for(let  exp of data.expensasUnidadesFuncionales[0].items ){

            let concept = this.conceptoVisitado.filter( data=>{return data == exp.concepto.tipoConcepto.nombre;})
            if(concept.length>0){
              item.push({nombre:exp.conceptoNombre,descripcion:"",gasto:exp.monto,css:'rows'});
            }else{
              if(this.total){
                item.push({nombre:"", descripcion:"Total categoría",gasto:totalCat,css:'totales'});
                totalCat = 0;
              }
              this.conceptoVisitado.push(exp.concepto.tipoConcepto.nombre);
              item.push({nombre:exp.concepto.tipoConcepto.nombre,descripcion:"",gasto:"GASTO A",css:"cabecera"});
              item.push({nombre:exp.conceptoNombre,descripcion:"",gasto:exp.monto,css:'rows'});
              totalCat += exp.monto
              this.total=true;
            }
            contador++;
          }
              item.push({nombre:"", descripcion:"Total categoría",gasto:totalCat,css:'totales'});
          return item;
        }
      return [];
    }));
   }
   //POST de total expensas generales
   postExpensas(expensas:any):Observable<any>{
     let url = `${URL_SERVICIOS}/expensas-unidades-funcionales`;
     var headers = new HttpHeaders({
       "Content-Type": "application/json"
     });
     return this._http.post(url,JSON.stringify(expensas),{headers: headers});
   }

}
