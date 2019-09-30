import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerEstadisticaComponent } from './ver-estadistica/ver-estadistica.component';
import { CrearEstadisticaComponent } from './crear-estadistica/crear-estadistica.component';



@NgModule({
  declarations: [
    VerEstadisticaComponent,
    CrearEstadisticaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EstadisticaModule { }
