import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearExpensasComponent } from './crear-expensas/crear-expensas.component';
import { VerExpensasComponent } from './ver-expensas/ver-expensas.component';
import { CalcularExpensasComponent } from './calcular-expensas/calcular-expensas.component';
import { DetalleExpensasComponent } from './detalle-expensas/detalle-expensas.component';
import { ContratosComponent } from './contratos/contratos.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {ScrollingModule} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    CrearExpensasComponent,
    VerExpensasComponent,
    CalcularExpensasComponent,
    DetalleExpensasComponent,
    ContratosComponent
  ],
  imports: [
    CommonModule,
    ScrollingModule,
    DragDropModule
  ],
  exports:[
    CrearExpensasComponent,
    VerExpensasComponent,
    CalcularExpensasComponent,
    DetalleExpensasComponent
  ]
})
export class ExpensasModule { }
