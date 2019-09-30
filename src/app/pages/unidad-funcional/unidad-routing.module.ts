import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AsignarUnidadComponent } from './asignar-unidad/asignar-unidad.component';
import { CrearUnidadComponent } from './crear-unidad/crear-unidad.component';
import { VerUnidadComponent } from './ver-unidad/ver-unidad.component';

const unidadRoutes:Routes = [
  { path: '', component: CrearUnidadComponent },
  { path: '/ver-unidad', component: VerUnidadComponent },
  { path: '/asignar-unidad', component: AsignarUnidadComponent },
  { path: '**',pathMatch: 'full', redirectTo: 'crear-unidad' }
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(unidadRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class UnidadRoutingModule { }
