import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReunionesRoutingModule } from './reuniones-routing.module';
import { ReunionesComponent } from './reuniones.component';
import { CrearReunionesComponent } from './crear-reuniones/crear-reuniones.component';
import { VerReunionesComponent } from './ver-reuniones/ver-reuniones.component';
import { AgendarReunionesComponent } from './agendar-reuniones/agendar-reuniones.component';


@NgModule({
  declarations: [
    ReunionesComponent,
    CrearReunionesComponent,
    VerReunionesComponent,
    AgendarReunionesComponent
  ],
  imports: [
    CommonModule,
    ReunionesRoutingModule
  ],
  exports:[
    ReunionesComponent,
    CrearReunionesComponent,
    VerReunionesComponent,
    AgendarReunionesComponent
  ]
})
export class ReunionesModule { }
