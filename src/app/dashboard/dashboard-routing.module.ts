import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from '../pages';
import { PagesModule } from '../pages/pages.module';

const dashboardRoutes:Routes = [

]


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PagesModule,
    RouterModule.forChild(dashboardRoutes)
  ]
})
export class DashboardRoutingModule { }
