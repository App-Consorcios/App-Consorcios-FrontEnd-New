import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from './truncate.pipe';
import { SiglaPipe } from './sigla.pipe';
import { ImagenPipe } from './imagen.pipe';



@NgModule({
  declarations: [TruncatePipe, SiglaPipe, ImagenPipe],
  imports: [
    CommonModule
  ],
  exports:[
    TruncatePipe, SiglaPipe,ImagenPipe
  ]
})
export class PipesModule { }
