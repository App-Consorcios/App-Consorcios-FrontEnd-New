//module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
//Module personalizados
import { PagesModule } from './pages/pages.module';
import { ComponentsModule } from './components/components.module';
import { AuthModule } from './auth0/auth.module';
import { DirectivesModule } from './directives/directives.module';
import { GuardsModule } from './guards/guards.module';
import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
//components
import { AppComponent } from './app.component';
//Routes
import { AppRoutingModule } from './app-routing.module';


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
    AuthModule,
    DirectivesModule,
    GuardsModule,
    SharedModule,
    DashboardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
