import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class UnidadFuncionalService {

  constructor(private http:HttpClient) { }

  getUnidades(){
    let url = URL_SERVICIOS+'/unidades-funcionales';
    return  this.http.get(url)
   }

  crearUnidad(unidadFuncional:any){
    let url = URL_SERVICIOS+'/unidad-funcional';
    console.log("URL - ", url);
    var headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    console.log(JSON.stringify(unidadFuncional))
    return this.http.post(url,JSON.stringify(unidadFuncional),{headers: headers})
  }
/*

    let url = URL_SERVICIOS+'/rol'
    var headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
   return this.http.post<Roles>(url,JSON.stringify(rol),{headers: headers})




  asignarRol(userId:any,roles:Roles[]){
    let url = URL_SERVICIOS;
    var headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    url+=`/usuario?id=${userId}`

    return this.http.put(url,JSON.stringify(roles),{headers: headers});
  }*/





  asignarUnidad(){
    //PUT
  }

}
