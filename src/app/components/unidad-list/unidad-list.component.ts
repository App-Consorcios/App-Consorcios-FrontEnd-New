import { Component, OnInit, ViewChild } from '@angular/core';
import { UnidadFuncional } from 'src/app/models/unidad-funcional.model';
import { Roles } from 'src/app/models/roles.model';
import { Usuario } from 'src/app/models';
import { MatSort, MatTableDataSource } from '@angular/material';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UnidadFuncionalService } from 'src/app/services/unidad-funcional/unidad-funcional.service';

export interface ListUsuario {
  nombre:string;
  roles:Roles[];
  unidades:UnidadFuncional[];
}
@Component({
  selector: 'app-unidad-list',
  templateUrl: './unidad-list.component.html',
  styleUrls: ['./unidad-list.component.css']
})
export class UnidadListComponent implements OnInit {
  rol:Roles;
  element:any;
  nombre:string;
  displayedColumns: string[] = ['nombre', 'roles','unidades'];
  dataSourcePropietario;
  dataSourceInquilino;
  usuarios:Usuario[]=[];
  // usuarioPropietarios:Usuario[]=[];
  usuarioInquilinos:Usuario[]=[];
  roles:Roles[]=[];
  unidades:UnidadFuncional[]=[];
  unidadesSinPropietario:UnidadFuncional[]=[];
  unidadesSinInquilino:UnidadFuncional[]=[];

  listUsuarioPropietario:ListUsuario[] = [];
  listUsuarioInquilino:ListUsuario[] = [];
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public _user:UsuarioService,public _uni:UnidadFuncionalService) { }

  ngOnInit() {
    this.init();
  }
  init(){
    this._user.recuperarUsuarios()
              .subscribe( (resp:any) =>{
                this.usuarios = resp;
                let usuarioPropietarios:Usuario[]=[];
                usuarioPropietarios = this.usuarios.filter( (data:any) => data.roles[0].nombre=="propietario");
                this.usuarioInquilinos = this.usuarios.filter( (data:any) => data.roles[0].nombre=="inquilino");
      this._uni.getUnidades()
              .subscribe( (resp:any) =>{
                this.unidades = resp;
                console.log(this.unidades);
                let unidadesSinPropietario:UnidadFuncional[]=[];
                this.unidadesSinPropietario = this.unidades.filter(data=>{ return data.propietario==null || data.propietario==undefined });
                this.unidadesSinInquilino = this.unidades.filter(data => { return data.inquilino==null || data.inquilino==undefined })

              this.matrizDataSource(this.unidadesSinPropietario,usuarioPropietarios,this.listUsuarioPropietario);
              console.log(this.listUsuarioPropietario)
              this.dataSourcePropietario = new MatTableDataSource(this.listUsuarioPropietario);
              this.dataSourcePropietario.sort = this.sort;
              this.matrizDataSource(this.unidadesSinInquilino,this.usuarioInquilinos,this.listUsuarioInquilino);
              console.log(this.listUsuarioInquilino)
              this.dataSourceInquilino = new MatTableDataSource(this.listUsuarioInquilino);
              this.dataSourceInquilino.sort = this.sort;
      });
    });
  }
  matrizDataSource(unidades:any[],usuarios:any[],lista){
    for(let i = 0;i<usuarios.length;i++){
        let tupla = { nombre: `${usuarios[i].nombre} ${usuarios[i].apellido}`, roles: usuarios[i].roles[0].nombre, unidades:unidades};
        lista.push(tupla);
    }
  }

}
