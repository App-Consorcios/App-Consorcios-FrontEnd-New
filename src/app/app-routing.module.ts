//Module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';

//component
import { LoginComponent , RegisterComponent } from './auth0';
import { PagesComponent } from './pages';
import { PanelComponent } from './dashboard/panel.component';
// import { AuthGuard } from './guards/auth.guard';


const appRoutes: Routes = [
  {
    path: 'panel', component: PanelComponent,
  },
  {
    path: '', component: PagesComponent,
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesModule),
    // canActivate:[ AuthGuard ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**',pathMatch: 'full', redirectTo: 'panel' }
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot( appRoutes,{useHash:true})
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
