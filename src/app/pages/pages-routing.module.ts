import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ExpensasComponent } from './expensas/expensas.component';
import { PerfilComponent } from './perfil/perfil.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { ReunionesComponent } from './reuniones/reuniones.component';
import { UnidadFuncionalComponent } from './unidad-funcional/unidad-funcional.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ConsorciosComponent } from './consorcios/consorcios.component';
import { CrearUnidadComponent } from './unidad-funcional/crear-unidad/crear-unidad.component';
import { VerUnidadComponent } from './unidad-funcional/ver-unidad/ver-unidad.component';
import { AsignarUnidadComponent } from './unidad-funcional/asignar-unidad/asignar-unidad.component';
import { CrearExpensasComponent } from './expensas/crear-expensas/crear-expensas.component';
import { VerExpensasComponent } from './expensas/ver-expensas/ver-expensas.component';
import { CalcularExpensasComponent } from './expensas/calcular-expensas/calcular-expensas.component';
import { CrearReunionesComponent } from './reuniones/crear-reuniones/crear-reuniones.component';
import { VerReunionesComponent } from './reuniones/ver-reuniones/ver-reuniones.component';
import { AgendarReunionesComponent } from './reuniones/agendar-reuniones/agendar-reuniones.component';
import { CrearEstadisticaComponent } from './estadisticas/crear-estadistica/crear-estadistica.component';
import { VerEstadisticaComponent } from './estadisticas/ver-estadistica/ver-estadistica.component';
import { VerUsuariosComponent } from './usuarios/ver-usuarios/ver-usuarios.component';
import { EliminarUsuariosComponent } from './usuarios/eliminar-usuarios/eliminar-usuarios.component';
import { DetalleExpensasComponent } from './expensas/detalle-expensas/detalle-expensas.component';
import { CrearConsorcioComponent } from './consorcios/crear-consorcio/crear-consorcio.component';
import { VerConsorcioComponent } from './consorcios/ver-consorcio/ver-consorcio.component';

const pagesRoutes: Routes =[
  { path: 'perfil',
   component: PerfilComponent,
   data:{ titulo:"Perfil de usuario" }
  },
  { path: 'estadistica',
   component: EstadisticasComponent,
   children:[
     { path: 'crear-estadisticas', component: CrearEstadisticaComponent },
     { path: 'ver-estadisticas', component: VerEstadisticaComponent },
     { path: '**',pathMatch: 'full', redirectTo: 'crear-estadisticas' }]
  },
  { path: 'expensas',
   component: ExpensasComponent,
   children:[
     { path: 'crear-expensas', component: CrearExpensasComponent },
     { path: 'detalle-expensas', component: DetalleExpensasComponent },
     { path: 'ver-expensas', component: VerExpensasComponent },
     { path: 'calcular-expensas', component: CalcularExpensasComponent },
     { path: '**',pathMatch: 'full', redirectTo: 'crear-expensas' }]
  },
  { path: 'reuniones',
   component: ReunionesComponent,
   children:[
     { path: 'crear-reuniones', component: CrearReunionesComponent },
     { path: 'ver-reuniones', component: VerReunionesComponent },
     { path: 'agendar-reuniones', component: AgendarReunionesComponent },
     { path: '**',pathMatch: 'full', redirectTo: 'agendar-reuniones' }]
  },
  { path: 'unidad-funcional',
   component: UnidadFuncionalComponent,
    children:[
      { path: 'crear-unidad', component: CrearUnidadComponent },
      { path: 'ver-unidades/:id', component: VerUnidadComponent},
      { path: 'asignar-unidad', component: AsignarUnidadComponent },
      { path: '**',pathMatch: 'full', redirectTo: 'crear-unidad' }]
  },
  { path: 'usuarios',
   component: UsuariosComponent,
   children:[
     { path: 'ver-usuarios', component: VerUsuariosComponent },
     { path: 'eliminar-usuario', component: EliminarUsuariosComponent },
     { path: '**',pathMatch: 'full', redirectTo: 'ver-usuarios' }]
  },
  { path: 'consorcios',
   component: ConsorciosComponent,
   children:[
     { path: 'crear-consorcio', component: CrearConsorcioComponent },
     { path: 'ver-consorcios', component: VerConsorcioComponent },
     { path: '**',pathMatch: 'full', redirectTo: 'crear-consorcio' }]
  },
  {
    path: '',
    pathMatch: 'full',
    // canActivate:[VerificaTokenGuard],
    redirectTo: '/unidad-funcional'
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(pagesRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class PagesRoutingModule { }
