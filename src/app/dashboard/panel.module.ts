import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelComponent } from './panel.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    PanelComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports:[
    PanelComponent
  ]
})
export class PanelModule { }
