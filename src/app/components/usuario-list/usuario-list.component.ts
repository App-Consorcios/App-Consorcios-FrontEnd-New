import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Usuario } from 'src/app/models';
import { Roles } from 'src/app/models/roles.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

export interface ListUsuario {
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

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public _user:UsuarioService,public _auth:AuthService) {

  }

  ngOnInit() {
    this.init();
  }
  matrizDataSource(){

    for(let i = 0;i<this.usuarios.length;i++){
      if(this.usuarios[i].roles[0].nombre == "usuario"){
        let tupla = { nombre: `${this.usuarios[i].nombre} ${this.usuarios[i].apellido}`, roles: this.roles};
        this.listUsuario.push(tupla);
      }
    }
  }
  init(){
    this._user.recuperarUsuarios()
              .subscribe( (resp:any) =>{
                this.usuarios = resp;
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
  guardar(forma){
    let roles;
    let user:any;
    let tupla = {};
    for(let row of forma._directives){
      if(row.name == "nombre" && row.model){
        user = this.usuarios.filter(data => `${data.nombre} ${data.apellido}` == row.model);
      }

      if(row.name == "roles" && row.model!="" && row.model!= undefined){
        console.log(row.model);
        roles  = this.roles.filter(data=> data.nombre == row.model);

        this._user.asignarRol(user[0].id,roles);
      }
    }
    // console.log(this.usuarios);
    // let usuario = this.usuarios.filter(data => `${data.nombre} ${data.apellido}` == forma._directives[0].model)
    // console.log(usuario)
    //
  }
}
