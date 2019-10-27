import { Injectable } from '@angular/core';
import { Observable, combineLatest, throwError } from 'rxjs';
import { catchError,  map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Roles } from 'src/app/models/roles.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  usuario:Usuario = null;
  menu:any[]=[];

  constructor(public http:HttpClient,
              private _router: Router) {
   this.cargarStorage();
 }

  guardarStorage(id:string, usuario:Usuario){
    localStorage.setItem('id',id);
    localStorage.setItem('usuario',JSON.stringify(usuario));
    this.usuario = usuario;
  }
  logout(){
    this.usuario = null;
    this.menu = [];

    localStorage.removeItem('usuario');
    this._router.navigate(['/login']);
  }
  estaLogueado(){
    return this.usuario != null;
  }
  cargarStorage(){
    let usuario = JSON.parse(localStorage.getItem('usuario'));
    if(usuario){
      this.usuario =  usuario
      this.menu =  JSON.parse(localStorage.getItem('menu'));
    }else{
      this.usuario = null;
      this.menu = [];
    }
  }
  login(mail:string, password:string, recordar:boolean){
    let url = URL_SERVICIOS

    if(recordar){
      localStorage.setItem('mail',mail);
      localStorage.setItem('recordar',"true");
    }else{
      localStorage.removeItem('mail');
      localStorage.removeItem('recordar');
    }
    url = `${url}/login?mail=${mail}&password=${password}`
    return this.http.get(url)
    .pipe(map((resp:any)=>{
      this.guardarStorage(resp.usuario.id, resp.usuario);
      return resp;      
    }),catchError( err => {
        return throwError(err);
     }));
  }
  buscarRoles(){
    let url = URL_SERVICIOS+'/roles'
    return this.http.get(url);
  }
  crearRoles(rol:Roles){
    let url = URL_SERVICIOS+'/rol'
    var headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
   return this.http.post<Roles>(url,JSON.stringify(rol),{headers: headers})
  }

  crearUsuario(usuario:Usuario){
    let url = URL_SERVICIOS +'/usuario';
    var headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
     return this.http.post<Usuario>(url,JSON.stringify(usuario),{headers: headers});
  }
  // actualizarUsuario(usuario:any){
  //   let url = URL_SERVICIOS +'/usuario/'+usuario._id;
  //   return this.http.put(url, usuario)
  //     .pipe(map((resp:any)=>{
  //       if(usuario._id === this.usuario._id){
  //         let usuarioDB:Usuario = resp.usuario;
  //         this.guardarStorage(usuarioDB._id,usuarioDB,resp.menu);
  //       }
  //       return true;
  //     }));
  // }
  cargarUsuarios(desde:number = 0){
    let url = URL_SERVICIOS+'/usuario?desde='+desde;
    return this.http.get(url);
  }
  buscarUsuario(termino:string){
    let url = URL_SERVICIOS+'/busqueda/coleccion/usuarios/'+termino;
    return this.http.get(url)
      .pipe(map((resp:any)=> resp.usuarios));
  }
  borrarUsuario(id:string){
    let url = URL_SERVICIOS+'/usuario/'+id
    return this.http.delete(url)
      .pipe(map(resp =>{
        return true;
      }))
  }
}
