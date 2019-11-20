import { Component, OnInit, ViewChild } from '@angular/core';
import { UnidadFuncional } from 'src/app/models/unidad-funcional.model';
import { Roles } from 'src/app/models/roles.model';
import { Usuario } from 'src/app/models';
import { MatSort, MatTableDataSource } from '@angular/material';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UnidadFuncionalService } from 'src/app/services/unidad-funcional/unidad-funcional.service';
import { SelectionModel } from '@angular/cdk/collections';
import { NgForm } from '@angular/forms';

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
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(public _user:UsuarioService,public _uni:UnidadFuncionalService) { }
  selection = new SelectionModel<ListUnidadesCompleta>(true, []);

  ngOnInit() {
    this.init();
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    // this.init();
    const numSelected = this.selection.selected.length;
    // console.log(this.dataSourceUnidades)
    // const numRows = this.dataSourceUnidades.unidad.length;
    const numRows = 3;
    return numSelected === numRows;
  }
  /** Selects all rows if they are not all selected; otherwise clear selection. */
   masterToggle() {
     this.isAllSelected() ?
         this.selection.clear() :
         this.dataSourceUnidades.data.forEach(row => this.selection.select(row));
   }

   /** The label for the checkbox on the passed row */
   checkboxLabel(row?: ListUnidadesCompleta): string {
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
                console.log("----usuario Propietarios----");
                  console.log(this.usuarioPropietarios);
                  console.log(this.usuarioInquilinos);


                this.unidadesSinPropietario = this.unidades.filter(data=>{ return data.propietario==null && data.propietario==undefined });
                this.unidadesSinInquilino = this.unidades.filter(data => { return data.inquilino==null && data.inquilino==undefined })
                this.unidadesCompletas  = this.unidades.filter(data => { return data.inquilino || data.propietario});
                console.log("----unidades funcionales----");
                console.log(this.unidadesCompletas);
                console.log(this.unidadesSinInquilino);
                console.log(this.unidadesCompletas);
                console.log(this.unidadesSinInquilino);
                console.log(this.unidadesCompletas);
                console.log("--------");
                this.matrizDataSource(this.unidadesSinPropietario,this.usuarioPropietarios,this.listUsuarioPropietario);
                console.log(this.listUsuarioPropietario)
                this.dataSourcePropietario = new MatTableDataSource(this.listUsuarioPropietario);
                this.dataSourcePropietario.sort = this.sort;
                this.matrizDataSource(this.unidadesSinInquilino,this.usuarioInquilinos,this.listUsuarioInquilino);
                console.log(this.listUsuarioInquilino)
                this.dataSourceInquilino = new MatTableDataSource(this.listUsuarioInquilino);
                this.dataSourceInquilino.sort = this.sort;
                this.matrizDataSourceCompletas(this.unidadesCompletas,this.listUnidadesCompleta)
                console.log(this.listUnidadesCompleta)
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
          console.log(`${unidades[i].propietario.nombre} ${unidades[i].propietario.apellido}`)
          tupla.propietario = `${unidades[i].propietario.nombre} ${unidades[i].propietario.apellido}`;

        }else{
          tupla.propietario = null;
        }
        if(unidades[i].inquilino){
         tupla.inquilino = `${unidades[i].inquilino.nombre} ${unidades[i].inquilino.apellido}`;
       }else{
         tupla.inquilino = null;
       }
       tupla.unidad =  unidades[i].codigo;
       tupla.descripcion = unidades[i].descripcion;
       lista.push(tupla);
    }
  }


  guardar(forma:NgForm){
    console.log("UNIDADES guardar", this.unidades);
    console.log("FORMA", forma);
    

    //asignarRol SERVICE

  }

}
