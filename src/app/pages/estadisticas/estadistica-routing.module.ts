import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CrearEstadisticaComponent } from './crear-estadistica/crear-estadistica.component';
import { VerEstadisticaComponent } from './ver-estadistica/ver-estadistica.component';

const estadisticaRoutes:Routes = [
  { path: 'crear-estadisticas', component: CrearEstadisticaComponent },
  { path: 'ver-estadisticas', component: VerEstadisticaComponent },
  { path: '',pathMatch: 'full', redirectTo: 'crear-estadistica' }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(estadisticaRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class EstadisticaRoutingModule { }
