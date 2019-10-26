import { Injectable } from '@angular/core';
import { Observable, combineLatest, throwError } from 'rxjs';
import { catchError,  map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models';
import { HttpClient } from '@angular/common/http';
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
  login(email:string, password:string, recordar:boolean){
    let url = URL_SERVICIOS

    if(recordar){
      localStorage.setItem('email',email);
      localStorage.setItem('recordar',"true");
    }else{
      localStorage.removeItem('email');
      localStorage.removeItem('recordar');
    }
    url = `${url}/login?mail=${email}&password=${password}`
    return this.http.get(url)
    .pipe(map((resp:any)=>{
       this.usuario.apellido = resp.apellido
       console.log(resp)
        // this.guardarStorage(resp.id, this.usuario);
      return true;
    }),catchError( err => {
        return throwError(err);
     }));
  }
  buscarRoles(){
    let url = URL_SERVICIOS
    return this.http.get(url);
  }
  crearRoles(roles:Roles[]){
    let url = URL_SERVICIOS
    for(let rol in roles){
      this.http.post(url,rol);
    }
  }

  crearUsuario(usuario:Usuario){
    let url = URL_SERVICIOS +'/usuario';
     return this.http.post(url,usuario)
    // .pipe(map((res:any) => {
    //   return res.usuario;
    // }),catchError( err => {
    //     return throwError(err);
    //  }));
  }
  actualizarUsuario(usuario:any){
    let url = URL_SERVICIOS +'/usuario/'+usuario._id;
    return this.http.put(url, usuario)
      .pipe(map((resp:any)=>{
        if(usuario._id === this.usuario._id){
          let usuarioDB:Usuario = resp.usuario;
          this.guardarStorage(usuarioDB._id,usuarioDB,resp.menu);
        }
        return true;
      }));
  }
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
