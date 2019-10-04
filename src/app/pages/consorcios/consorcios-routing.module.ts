import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CrearUnidadComponent } from '../unidad-funcional/crear-unidad/crear-unidad.component';
import { VerUnidadComponent } from '../unidad-funcional/ver-unidad/ver-unidad.component';

const consorciosRoutes: Routes =[
  { path: 'crear-consorcio', component: CrearUnidadComponent },
  { path: 'ver-consorcios', component: VerUnidadComponent },
  { path: '**',pathMatch: 'full', redirectTo: '/crear-consorcio' }]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(consorciosRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class ConsorciosRoutingModule { }
