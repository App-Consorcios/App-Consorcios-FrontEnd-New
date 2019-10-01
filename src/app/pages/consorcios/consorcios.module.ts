import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearConsorcioComponent } from './crear-consorcio/crear-consorcio.component';
import { VerConsorcioComponent } from './ver-consorcio/ver-consorcio.component';

@NgModule({
  declarations: [

  CrearConsorcioComponent,

  VerConsorcioComponent],
  imports: [
    CommonModule
  ]
})
export class ConsorciosModule { }
