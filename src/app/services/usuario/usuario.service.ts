import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Roles } from 'src/app/models/roles.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http:HttpClient) { }

  recuperarUsuarios(){
    let url = URL_SERVICIOS+'/usuarios';
    return this.http.get(url)
  }
  asignarRol(userId:any,roles:Roles[]){
    let url = URL_SERVICIOS;
    var headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    url+=`/usuario?id=${userId}`

    return this.http.put(url,JSON.stringify(roles),{headers: headers});
  }
}
