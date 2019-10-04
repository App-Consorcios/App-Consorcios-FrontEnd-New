import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerUsuariosComponent } from './ver-usuarios/ver-usuarios.component';
import { EliminarUsuariosComponent } from './eliminar-usuarios/eliminar-usuarios.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';



@NgModule({
  declarations: [
    VerUsuariosComponent,
    EliminarUsuariosComponent
  ],
  imports: [
    CommonModule,
    // UsuariosRoutingModule 
  ],
  exports:[
    VerUsuariosComponent,
    EliminarUsuariosComponent
  ]
})
export class UsuariosModule { }
