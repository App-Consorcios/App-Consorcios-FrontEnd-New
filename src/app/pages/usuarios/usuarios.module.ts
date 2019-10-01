import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerUsuariosComponent } from './ver-usuarios/ver-usuarios.component';
import { EliminarUsuariosComponent } from './eliminar-usuarios/eliminar-usuarios.component';



@NgModule({
  declarations: [
    VerUsuariosComponent,
    EliminarUsuariosComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UsuariosModule { }
