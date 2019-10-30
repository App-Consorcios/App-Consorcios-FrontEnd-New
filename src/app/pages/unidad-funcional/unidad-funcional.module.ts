import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearUnidadComponent } from './crear-unidad/crear-unidad.component';
import { VerUnidadComponent } from './ver-unidad/ver-unidad.component';
import { AsignarUnidadComponent } from './asignar-unidad/asignar-unidad.component';
import { UnidadRoutingModule } from './unidad-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResultadosComponent } from './ver-unidad/resultados/resultados.component';



@NgModule({
  declarations: [
    CrearUnidadComponent,
    VerUnidadComponent,
    AsignarUnidadComponent,
    ResultadosComponent
  ],
  imports: [
    CommonModule,
    //UnidadRoutingModule,
    SharedModule
  ],
  exports: [
    CrearUnidadComponent,
    VerUnidadComponent,
    AsignarUnidadComponent
  ]
})
export class UnidadFuncionalModule { }
