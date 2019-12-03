import { Injectable } from '@angular/core';
import { UnidadFuncional } from 'src/app/models/unidad-funcional.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class ReunionesService {
 

  constructor(private http:HttpClient) { }
  

  getReuniones(){
    let url = URL_SERVICIOS+'/reuniones';
    let servicio = this.http.get(url)
    console.log("GET REUNIONES - ", servicio);
    return servicio
   }



  crearReunion(nombre:string, color:string, temas:any[], fecha:any){
    let url = URL_SERVICIOS+'/reunion';
    console.log("URL - ", url);
    
    var headers = new HttpHeaders({
      "Content-Type": "application/json"
    });


    let reunion = {
      "color": color,
      "descripcion": nombre,
      "temas": temas,
      "fecha": fecha,
    }

    return this.http.post(url,JSON.stringify(reunion),{headers: headers})
  }

  agendarReunion(idReunion:any, fecha:Date){
    console.log("SERVICE AGENDAR REUNION - ", idReunion, fecha );
    let url = URL_SERVICIOS+'/reunion?id='+idReunion;
    console.log("URL - ", url);
    
    var headers = new HttpHeaders({
      "Content-Type": "application/json"
    });


    let fechaRequest = {
      "fecha": fecha
    }

    return this.http.put(url,JSON.stringify(fechaRequest),{headers: headers})
  }
  
}
