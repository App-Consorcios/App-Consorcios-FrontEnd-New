import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CrearReunionesComponent } from './crear-reuniones/crear-reuniones.component';
import { VerReunionesComponent } from './ver-reuniones/ver-reuniones.component';
import { AgendarReunionesComponent } from './agendar-reuniones/agendar-reuniones.component';

const reunionesRoutes:Routes = [
  { path: 'crear-reuniones', component: CrearReunionesComponent },
  { path: 'ver-reuniones', component: VerReunionesComponent },
  { path: 'agendar-reuniones', component: AgendarReunionesComponent },
  { path: '**',pathMatch: 'full', redirectTo: 'crear-reuniones' }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(reunionesRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class ReunionesRoutingModule { }
