//module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule} from "@angular/common/http";
import { ScrollingModule } from '@angular/cdk/scrolling';

//Module personalizados
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';
import { AuthModule } from './auth0/auth.module';
import { DirectivesModule } from './directives/directives.module';
import { GuardsModule } from './guards/guards.module';
import { SharedModule } from './shared/shared.module';
//components
import { AppComponent } from './app.component';
//Routes
import { AppRoutingModule } from './app-routing.module';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PanelModule } from './dashboard/panel.module';

import { FullCalendarModule } from '@fullcalendar/angular'; // for FullCalendar!


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    PagesModule,
    ComponentsModule,
    PanelModule,
    AuthModule,
    DirectivesModule,
    HttpClientModule,
    GuardsModule,
    SharedModule,
    ScrollingModule,
    DragDropModule,
    BrowserAnimationsModule,
    FullCalendarModule // for FullCalendar!
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
