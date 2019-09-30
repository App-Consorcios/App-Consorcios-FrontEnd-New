//Module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';

//component
import { LoginComponent , RegisterComponent } from './auth0';
import { PagesComponent } from './pages';
import { PanelComponent } from './dashboard/panel/panel.component';
import { CallbackComponent } from './components/callback/callback.component';
import { AuthGuard } from './guards/auth.guard';


const appRoutes: Routes = [
  {
    path: 'panel', component: PanelComponent,
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardModule)
  },
  {
    path: '', component: PagesComponent,
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesModule),
    // canActivate:[ AuthGuard ]
  },
  // { path: 'register', component: RegisterComponent },
  { path: 'callback', component: CallbackComponent },
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
