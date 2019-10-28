import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Usuario } from 'src/app/models';

@Component({
  selector: 'app-usuario-rol',
  templateUrl: './usuario-rol.component.html',
  styleUrls: ['./usuario-rol.component.css']
})
export class UsuarioRolComponent implements OnInit {
  usuarios: Usuario[] = [];
  cantidadSelected:number = 0;
  selected:Usuario[] =[]

  constructor(public _user:UsuarioService,
              public _auth:AuthService) { }

  ngOnInit() {
    this.init()
  }
  init(){
    this._user.recuperarUsuarios()
              .subscribe( (resp:any) =>{
                for(let user of resp){
                  if(user.roles[0].nombre == "propietario" || user.roles[0].nombre == "inquilino"){
                    this.usuarios.push(user);
                  }
                }
    });

  }
  onSelection(opciones){
    this.cantidadSelected = opciones.selected.length;
  }
  getValue(user){
    let pos = this.selected.indexOf(user.mail)
    if(pos<0){
      if(this.selected.length == this.cantidadSelected-1){
          this.selected.push(user.mail)
      }
    }else{
       this.selected.splice(pos,1);
    }
  }
  guardar(){
    let usuario;
    for(let user of this.selected){
      usuario = this.usuarios.filter( (data:any) => data.mail == user );
      this._user.asignarRol(usuario.id,[{nombre: "usuario" }]);
    }
  }
}
