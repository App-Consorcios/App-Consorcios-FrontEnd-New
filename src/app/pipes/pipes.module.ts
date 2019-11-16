import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './truncate.pipe';
import { SiglaPipe } from './sigla.pipe';



@NgModule({
  declarations: [TruncatePipe, SiglaPipe],
  imports: [
    CommonModule
  ],
  exports:[
    TruncatePipe, SiglaPipe
  ]
})
export class PipesModule { }
