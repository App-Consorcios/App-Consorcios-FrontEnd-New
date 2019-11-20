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



  crearReunion(nombre:string, color:string){
    let url = URL_SERVICIOS+'/reunion';
    console.log("URL - ", url);
    
    var headers = new HttpHeaders({
      "Content-Type": "application/json"
    });


    let reunion = {
      "color": nombre,
      "descripcion": color
    }

    return this.http.post(url,JSON.stringify(reunion),{headers: headers}).subscribe(
      (response) => console.log(response),
      (error) => console.log(error))


  }
  
}
