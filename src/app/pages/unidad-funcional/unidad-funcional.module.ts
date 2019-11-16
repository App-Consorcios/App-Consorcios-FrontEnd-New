import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearUnidadComponent } from './crear-unidad/crear-unidad.component';
import { VerUnidadComponent } from './ver-unidad/ver-unidad.component';
import { AsignarUnidadComponent } from './asignar-unidad/asignar-unidad.component';
import { UnidadRoutingModule } from './unidad-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    CrearUnidadComponent,
    VerUnidadComponent,
    AsignarUnidadComponent

  ],
  imports: [
    CommonModule,
    //UnidadRoutingModule,
    SharedModule
  ],
  exports: [
    CrearUnidadComponent,
    VerUnidadComponent
  ]
})
export class UnidadFuncionalModule { }
