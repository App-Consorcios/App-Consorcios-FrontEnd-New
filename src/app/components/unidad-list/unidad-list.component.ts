import { Component, OnInit, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { UnidadFuncional } from 'src/app/models/unidad-funcional.model';
import { Roles } from 'src/app/models/roles.model';
import { Usuario } from 'src/app/models';
import { MatSort, MatTableDataSource } from '@angular/material';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UnidadFuncionalService } from 'src/app/services/unidad-funcional/unidad-funcional.service';
import { SelectionModel } from '@angular/cdk/collections';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

export interface ListUsuario {
  nombre:string;
  roles:Roles[];
  unidades:UnidadFuncional[];
}
export interface ListUnidadesCompleta {
  propietario:string;
  inquilino:string;
  unidad:string;
  descripcion:string;
}
@Component({
  selector: 'app-unidad-list',
  templateUrl: './unidad-list.component.html',
  styleUrls: ['./unidad-list.component.css']
})
export class UnidadListComponent implements OnInit {
  loaded:boolean = false;
  rol:Roles;
  element:any;
  nombre:string;
  displayedColumns: string[] = ['nombre', 'roles','unidades'];
  displayedColumnsUnidades: string[] = ['propietario', 'inquilino','unidad','descripcion','select'];
  dataSourcePropietario;
  dataSourceInquilino;
  dataSourceUnidades;
  usuarios:Usuario[]=[];
  usuarioPropietarios:Usuario[]=[];
  usuarioInquilinos:Usuario[]=[];
  roles:Roles[]=[];
  unidades:UnidadFuncional[]=[];
  unidadesSinPropietario:UnidadFuncional[]=[];
  unidadesSinInquilino:UnidadFuncional[]=[];
  unidadesCompletas:UnidadFuncional[]=[];
  listUsuarioPropietario:ListUsuario[] = [];
  listUsuarioInquilino:ListUsuario[] = [];
  listUnidadesCompleta:ListUnidadesCompleta[] = [];
  seleccionado:any[] = [];
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private _user:UsuarioService,
              public router:Router,
              private _uni:UnidadFuncionalService,
              private ref:ChangeDetectorRef) { }
  selection = new SelectionModel<ListUnidadesCompleta>(true, []);

  ngOnInit() {
    this.init();
  }

  isAllSelected() {
    // this.init();
    let count
    if(this.dataSourceUnidades!=undefined) count = this.dataSourceUnidades.filteredData.length
    const numSelected = this.selection.selected.length;
    const numRows = count;
    return numSelected === numRows;
  }
  masterToggle() {
     this.isAllSelected() ?
     this.selection.clear() :
     this.dataSourceUnidades.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: ListUnidadesCompleta): string {
    let seleccionado;
    let noseleccionado;
    if(this.selection.isSelected(row)==true){
      seleccionado = this.seleccionado.filter( data => data.unidad == row.unidad );
      if(seleccionado.length==0){
        this.seleccionado.push(row);
      }
    }else{
      if(this.seleccionado.length>0 && row!=undefined){
        noseleccionado = this.seleccionado.filter( data => data.unidad == row.unidad);
        if(noseleccionado.length>0){
          this.seleccionado.splice(this.seleccionado.indexOf(noseleccionado[0]),1)
        }
      }
    }
   if (!row) {
     return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
   }
   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.propietario + 1}`;
  }
  init(){
    this._user.recuperarUsuarios()
              .subscribe( (resp:any) =>{
                this.usuarios = resp;
                this.usuarioPropietarios = this.usuarios.filter( (data:any) => data.roles[0].nombre=="propietario");
                this.usuarioInquilinos = this.usuarios.filter( (data:any) => data.roles[0].nombre=="inquilino");
      this._uni.getUnidades()
              .subscribe( (resp:any) =>{
                this.unidades = resp;
                let unidadesConPropietario:UnidadFuncional[]=[];
                unidadesConPropietario = this.unidades.filter(data=>{ return data.propietario});
                for(let uniPro of unidadesConPropietario){
                  this.usuarioPropietarios = this.usuarioPropietarios.filter( (data:any) => data.mail != uniPro.propietario.mail);
                }
                let unidadesCoInquilino:UnidadFuncional[]=[];
                unidadesCoInquilino = this.unidades.filter(data=>{ return data.inquilino});
                for(let uniInq of unidadesCoInquilino){
                  this.usuarioInquilinos = this.usuarioInquilinos.filter( (data:any) => data.mail != uniInq.inquilino.mail);
                }
                this.unidadesSinPropietario = this.unidades.filter(data=>{ return data.propietario==null && data.propietario==undefined });
                this.unidadesSinInquilino = this.unidades.filter(data => { return data.inquilino==null && data.inquilino==undefined })
                this.unidadesCompletas  = this.unidades.filter(data => { return data.inquilino || data.propietario});
                  this.matrizDataSource(this.unidadesSinPropietario,this.usuarioPropietarios,this.listUsuarioPropietario);
                this.dataSourcePropietario = new MatTableDataSource(this.listUsuarioPropietario);
                this.dataSourcePropietario.sort = this.sort;
                this.matrizDataSource(this.unidadesSinInquilino,this.usuarioInquilinos,this.listUsuarioInquilino);
                this.dataSourceInquilino = new MatTableDataSource(this.listUsuarioInquilino);
                this.dataSourceInquilino.sort = this.sort;
                this.matrizDataSourceCompletas(this.unidadesCompletas,this.listUnidadesCompleta)
                this.dataSourceUnidades = new MatTableDataSource(this.listUnidadesCompleta);
                this.dataSourceUnidades.sort = this.sort;
      });
    });
  }
  matrizDataSource(unidades:any[],usuarios:any[],lista:any){
    for(let i = 0;i<usuarios.length;i++){
        let tupla = { nombre: `${usuarios[i].nombre} ${usuarios[i].apellido}`, roles: usuarios[i].roles[0].nombre, unidades:unidades};
        lista.push(tupla);
    }
  }
  matrizDataSourceCompletas(unidades:any,lista:any){
    let tupla:ListUnidadesCompleta;
    for(let i = 0;i<unidades.length;i++){
      tupla = {
        propietario: "" ,
        inquilino: "",
        unidad:"",
        descripcion:""
      }
        if(unidades[i].propietario){
          tupla.propietario = `${unidades[i].propietario.nombre} ${unidades[i].propietario.apellido}`;

        }else{
          tupla.propietario = null;
        }
        if(unidades[i].inquilino){
         tupla.inquilino = `${unidades[i].inquilino.nombre} ${unidades[i].inquilino.apellido}`;
       }else{
         tupla.inquilino = null;
       }
       tupla.unidad =  unidades[i].codigoDepartamento;
       tupla.descripcion = unidades[i].descripcionDepartamento;
       lista.push(tupla);
    }
  }
  asignarUnidadPropietario(forma){
    let user, rol, unidad;
    let tupla = {
      nombre:"",
      roles:"",
      unidad:""
    }
    for(let row of forma._directives){
        if(row.name == "nombre" && row.model!="" && row.model!= undefined){
          tupla.nombre = row.model;
        }
        if(row.name == "roles" && row.model!="" && row.model!= undefined ){
          tupla.roles = row.model;
        }
        if(row.name == "unidadesSinPropietario" && row.model!="" && row.model!= undefined){
          tupla.unidad = row.model;
        }
        if(tupla.nombre!="" && tupla.roles!="" && tupla.unidad!=""){
          unidad = this.unidades.filter(data => `${data.codigoDepartamento}` == tupla.unidad);
          user = this.usuarios.filter(data => `${data.nombre} ${data.apellido}` == tupla.nombre);
          rol =  {
                   inquilino:null,
                   propietario:null
                 };
          if(unidad[0].inquilino){
            rol.inquilino = {mail: unidad[0].inquilino.mail};
          }
          rol.propietario = { mail: user[0].mail};
          this._uni.asignarUnidadFuncional(rol,unidad[0].id).subscribe( (data:any) =>{
          //   this.matrizDataSource(this.unidadesSinPropietario,this.usuarioPropietarios,this.listUsuarioPropietario);
          // this.dataSourcePropietario = new MatTableDataSource(this.listUsuarioPropietario);
          // this.dataSourcePropietario.sort = this.sort;
          // this.matrizDataSource(this.unidadesSinInquilino,this.usuarioInquilinos,this.listUsuarioInquilino);
          // this.dataSourceInquilino = new MatTableDataSource(this.listUsuarioInquilino);
          // this.dataSourceInquilino.sort = this.sort;
          this.router.navigate(['/unidad-funcional/asignar-unidad']);
            this.matrizDataSourceCompletas(data,this.listUnidadesCompleta)
            this.dataSourceUnidades = new MatTableDataSource(this.listUnidadesCompleta);
            this.dataSourceUnidades.sort = this.sort;
          });
           tupla = {
            nombre:"",
            roles:"",
            unidad:""
          }
        }
      }
    }
  asignarUnidadInquilino(forma){
      let user, rol, unidad;
      let tupla = {
        nombre:"",
        roles:"",
        unidad:""
      }
      for(let row of forma._directives){
        if(row.name == "nombre" && row.model!="" && row.model!= undefined){
          tupla.nombre = row.model;
        }
        if(row.name == "roles" && row.model!="" && row.model!= undefined ){
          tupla.roles = row.model;
        }
        if(row.name == "unidadesSinInquilino" && row.model!="" && row.model!= undefined){
          tupla.unidad = row.model;
        }
        if(tupla.nombre!="" && tupla.roles!="" && tupla.unidad!=""){
          unidad = this.unidades.filter(data => `${data.codigoDepartamento}` == tupla.unidad);
          user = this.usuarios.filter(data => `${data.nombre} ${data.apellido}` == tupla.nombre);
          rol =  {
                   inquilino:null,
                   propietario:null
                 };
          if(unidad[0].propietario){
            rol.propietario = {mail: unidad[0].propietario.mail};
          }
          rol.inquilino = { mail: user[0].mail};
          this._uni.asignarUnidadFuncional(rol,unidad[0].id).subscribe( (data:any) =>{
            this.router.navigate(['/unidad-funcional/asignar-unidad']);
            this.matrizDataSourceCompletas(data,this.listUnidadesCompleta)
            this.dataSourceUnidades = new MatTableDataSource(this.listUnidadesCompleta);
            this.dataSourceUnidades.sort = this.sort;
          });
           tupla = {
            nombre:"",
            roles:"",
            unidad:""
          }
        }
      }
    }
  eliminarAsignacionesUnidades(){
    let unidad, inquilino, propietario, rol;
    for(let unidad of this.seleccionado){
      unidad = this.unidades.filter(data => `${data.codigoDepartamento}` == unidad.unidad);
      rol =  {
               inquilino: null,
               propietario:null
             };
     this._uni.asignarUnidadFuncional(rol,unidad[0].id).subscribe( (data:any) =>{
       this.router.navigate(['/unidad-funcional/asignar-unidad']);

       this.matrizDataSourceCompletas(data,this.listUnidadesCompleta)
       this.dataSourceUnidades = new MatTableDataSource(this.listUnidadesCompleta);
       this.dataSourceUnidades.sort = this.sort;
     });
    }

  }
}
