import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearUnidadComponent } from '../unidad-funcional/crear-unidad/crear-unidad.component';
import { VerUnidadComponent } from '../unidad-funcional/ver-unidad/ver-unidad.component';
import { Routes, RouterModule } from '@angular/router';

const usuarioRoute:Routes = [
  { path: 'ver-usuarios', component: CrearUnidadComponent },
  { path: 'eliminar-usuarios', component: VerUnidadComponent },
  { path: '**',pathMatch: 'full', redirectTo: 'ver-usuarios' }
];

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(usuarioRoute)
  ],
  exports:[
    RouterModule
  ]
})
export class UsuariosRoutingModule { }
