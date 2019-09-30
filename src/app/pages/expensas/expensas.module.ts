import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearExpensasComponent } from './crear-expensas/crear-expensas.component';
import { VerExpensasComponent } from './ver-expensas/ver-expensas.component';
import { CalcularExpensasComponent } from './calcular-expensas/calcular-expensas.component';



@NgModule({
  declarations: [CrearExpensasComponent, VerExpensasComponent, CalcularExpensasComponent],
  imports: [
    CommonModule
  ]
})
export class ExpensasModule { }
