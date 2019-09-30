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

const pagesRoutes: Routes =[
  { path: 'perfil',
   component: PerfilComponent,
   data:{ titulo:"Perfil de usuario" }
  },
  { path: 'estadistica',
   component: EstadisticasComponent,
   data:{ titulo:"Estadística" }
  },
  { path: 'expensas',
   component: ExpensasComponent,
   children:[
     { path: 'crear-expensas', component: CrearExpensasComponent },
     { path: 'ver-expensas', component: VerExpensasComponent },
     { path: 'calcular-expensas', component: CalcularExpensasComponent },
     { path: '**',pathMatch: 'full', redirectTo: 'crear-expensas' }]
  },
  { path: 'reuniones',
   component: ReunionesComponent,
   data:{ titulo:"Reuniones"}
  },
  { path: 'unidad-funcional',
   component: UnidadFuncionalComponent,
    children:[
      { path: 'crear-unidad', component: CrearUnidadComponent },
      { path: 'ver-unidades', component: VerUnidadComponent },
      { path: 'asignar-unidad', component: AsignarUnidadComponent },
      { path: '**',pathMatch: 'full', redirectTo: 'crear-unidad' }]
  },
  { path: 'usuarios',
   component: UsuariosComponent,
   data:{ titulo:"Usuarios"}
  },
  { path: 'consorcios',
   component: ConsorciosComponent,
   data:{ titulo:"Consorcios"}
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
