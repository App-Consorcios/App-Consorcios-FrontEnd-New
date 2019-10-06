import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';
import { PerfilComponent } from './perfil/perfil.component';
import { ExpensasComponent } from './expensas/expensas.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ConsorciosComponent } from './consorcios/consorcios.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ReunionesComponent } from './reuniones/reuniones.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { UnidadFuncionalComponent } from './unidad-funcional/unidad-funcional.component';
import { CrearUnidadComponent } from './unidad-funcional/crear-unidad/crear-unidad.component';
import { VerUnidadComponent } from './unidad-funcional/ver-unidad/ver-unidad.component';
import { AsignarUnidadComponent } from './unidad-funcional/asignar-unidad/asignar-unidad.component';
import { CrearExpensasComponent } from './expensas/crear-expensas/crear-expensas.component';
import { VerExpensasComponent } from './expensas/ver-expensas/ver-expensas.component';
import { CalcularExpensasComponent } from './expensas/calcular-expensas/calcular-expensas.component';
import { VerReunionesComponent } from './reuniones/ver-reuniones/ver-reuniones.component';
import { CrearReunionesComponent } from './reuniones/crear-reuniones/crear-reuniones.component';
import { AgendarReunionesComponent } from './reuniones/agendar-reuniones/agendar-reuniones.component';
import { CrearEstadisticaComponent } from './estadisticas/crear-estadistica/crear-estadistica.component';
import { VerEstadisticaComponent } from './estadisticas/ver-estadistica/ver-estadistica.component';
import { VerUsuariosComponent } from './usuarios/ver-usuarios/ver-usuarios.component';
import { EliminarUsuariosComponent } from './usuarios/eliminar-usuarios/eliminar-usuarios.component';
import { CrearConsorcioComponent } from './consorcios/crear-consorcio/crear-consorcio.component';
import { VerConsorcioComponent } from './consorcios/ver-consorcio/ver-consorcio.component';

@NgModule({
  declarations: [
    PagesComponent,
    PerfilComponent,
    ExpensasComponent,
    ConsorciosComponent,
    UsuariosComponent,
    ReunionesComponent,
    EstadisticasComponent,
    UnidadFuncionalComponent,
    CrearUnidadComponent,
    VerUnidadComponent,
    AsignarUnidadComponent,
    CrearExpensasComponent,
    VerExpensasComponent,
    CalcularExpensasComponent,
    CrearReunionesComponent,
    VerReunionesComponent,
    AgendarReunionesComponent,
    CrearEstadisticaComponent,
    VerEstadisticaComponent,
    UsuariosComponent,
    VerUsuariosComponent,
    EliminarUsuariosComponent,
    CrearConsorcioComponent,
    VerConsorcioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    RouterModule,
    PagesRoutingModule,
    SharedModule,
    PipesModule,
  ],
  exports:[
    PerfilComponent,
    ExpensasComponent,
    ConsorciosComponent,
    UsuariosComponent,
    ReunionesComponent,
    EstadisticasComponent,
    UnidadFuncionalComponent
  ]
})
export class PagesModule { }
