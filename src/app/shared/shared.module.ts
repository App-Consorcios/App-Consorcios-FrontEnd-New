import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { TopbarComponent } from './topbar/topbar.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { LoadingComponent } from './loading/loading.component';


@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    BreadcrumbComponent,
    NopagefoundComponent,
    TopbarComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    BreadcrumbComponent,
    NopagefoundComponent,
    TopbarComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
