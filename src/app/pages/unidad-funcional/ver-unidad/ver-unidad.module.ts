import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultadosComponent } from './resultados/resultados.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ResultadosComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],exports:[
    ResultadosComponent,
    RouterModule
  ]
})
export class VerUnidadModule { }
