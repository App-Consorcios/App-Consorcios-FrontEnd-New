import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerEstadisticaComponent } from './ver-estadistica/ver-estadistica.component';
import { CrearEstadisticaComponent } from './crear-estadistica/crear-estadistica.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    VerEstadisticaComponent,
    CrearEstadisticaComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    VerEstadisticaComponent,
    CrearEstadisticaComponent
  ]
})
export class EstadisticaModule { }
