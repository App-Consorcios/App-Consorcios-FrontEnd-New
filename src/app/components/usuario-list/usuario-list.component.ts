import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Usuario } from 'src/app/models';
import { Roles } from 'src/app/models/roles.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

export interface ListUsuario {
  mail:string;
  nombre:string;
  roles:Roles[];
}

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {
  rol:Roles;
  element:any;
  nombre:string;
  displayedColumns: string[] = ['nombre', 'roles'];
  dataSource;
  usuarios:Usuario[]=[];
  roles:Roles[]=[];
  listUsuario:ListUsuario[] = [];
  //lista de usuario con rol
  usuarioConRol:Usuario[]=[];
  cantidadSelected:number = 0;
  selected:Usuario[] =[];

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public _user:UsuarioService,
              public _auth:AuthService,
              public cd:ChangeDetectorRef) {

  }

  ngOnInit() {
    this.init();
  }
  matrizDataSource(){

    for(let i = 0;i<this.usuarios.length;i++){
      if(this.usuarios[i].roles[0].nombre == "usuario"){
        let tupla = { mail:this.usuarios[i].mail, nombre: `${this.usuarios[i].nombre} ${this.usuarios[i].apellido}`, roles: this.roles};
        this.listUsuario.push(tupla);
      }
    }
  }
  init(){
    this._user.recuperarUsuarios()
              .subscribe( (resp:any) =>{
                this.usuarios = resp;
                for(let user of resp){
                  if(user.roles[0].nombre == "propietario" || user.roles[0].nombre == "inquilino"){
                    this.usuarioConRol.push(user);
                  }
                }
      this._auth.buscarRoles()
              .subscribe( (resp:any) =>{
                this.roles = resp;
                this.roles = this.roles.filter(data=>{return data.nombre!="admin" && data.nombre!="usuario" });
                this.matrizDataSource();
              this.dataSource = new MatTableDataSource(this.listUsuario);
              this.dataSource.sort = this.sort;
      });
    });
  }
  onSelection(opciones){
    this.selected = opciones
  }
  borrarRol(){
    let usuario;
    for(let user of this.selected){
      usuario = this.usuarioConRol.filter( (data:any) => data.mail == user);
      if(usuario.length>0){
        let index = this.usuarioConRol.indexOf(usuario[0]);
        this.usuarioConRol.splice(index,1);
        this.usuarios.push(usuario[0])
        console.log("hola")

        this._user.asignarRol(usuario[0].id,{roles:[{nombre: "usuario" }]}).subscribe((data:any)=>{
            let tupla = { mail:data.mail, nombre: `${data.nombre} ${data.apellido}`, roles: data.roles};
            this.listUsuario.push(tupla);
            this.dataSource = new MatTableDataSource(this.listUsuario);
            this.dataSource.sort = this.sort;
        });
      }
    }
  }
  asignarRol(forma){
    let roles;
    let user:any;
    let tupla = {};
    for(let row of forma._directives){
      if(row.name == "nombre" && row.model){
        user = this.usuarios.filter(data => `${data.nombre} ${data.apellido}` == row.model);
      }
      if(row.name == "roles" && row.model!="" && row.model!= undefined){
        roles  = this.roles.filter(data=> data.nombre == row.model);
        let rol={
          roles:roles
        }
        this._user.asignarRol(user[0].id,rol).subscribe( (data:any) =>{
          this.cd.markForCheck();
            for(let i = 0;i<this.listUsuario.length;i++){
              if(this.listUsuario[i].mail === data.mail){
                    this.listUsuario.splice(i,1);
                    this.usuarioConRol.push(data);
                    this.dataSource = new MatTableDataSource(this.listUsuario);
                    this.dataSource.sort = this.sort;
              }
          }
        });
      }
    }
  }
}
