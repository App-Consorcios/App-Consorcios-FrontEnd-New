import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuAccionesComponent } from './menu-acciones/menu-acciones.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DatePickerComponent } from './date-picker/date-picker.component';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule, MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { CarrouselMultipleComponent } from './carrousel-multiple/carrousel-multiple.component';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioRolComponent } from './usuario-rol/usuario-rol.component';
import { UnidadListComponent } from './unidad-list/unidad-list.component';
import { UsuarioIconComponent } from './usuario-icon/usuario-icon.component';
import { FormInquilinoComponent } from './form-inquilino/form-inquilino.component';
import { SelectUnidadComponent } from './select-unidad/select-unidad.component';
import { CalcularTotalesComponent } from './calcular-totales/calcular-totales.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ReunionesVistaComponent } from './reuniones-vista/reuniones-vista.component';
import { VotacionComponent } from './votacion/votacion.component';
import { IconLikeComponent } from './icon-like/icon-like.component';
import { ModalComponent } from './modal/modal.component';
import { PipesModule } from '../pipes/pipes.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExeclsMigrationComponent } from './execls-migration/execls-migration.component';
import { AngularTableComponent } from './angular-table/angular-table.component';
import { TableConceptosExpComponent } from './table-conceptos-exp/table-conceptos-exp.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
  MenuAccionesComponent,
  DatePickerComponent,
  CarrouselMultipleComponent,
  UsuarioListComponent,
  UsuarioRolComponent,
  UnidadListComponent,
  UsuarioIconComponent,
  FormInquilinoComponent,
  SelectUnidadComponent,
  CalcularTotalesComponent,
  CalendarComponent,
  ReunionesVistaComponent,
  VotacionComponent,
  IconLikeComponent,
  ModalComponent,
  ExeclsMigrationComponent,
  AngularTableComponent,
  TableConceptosExpComponent,
  PaginationComponent
],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PipesModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatNativeDateModule,
    FullCalendarModule,
    ScrollingModule,
    DragDropModule
  ],
  exports:[
    MenuAccionesComponent,
    DatePickerComponent,
    CarrouselMultipleComponent,
    UsuarioListComponent,
    UsuarioRolComponent,
    UnidadListComponent,
    UsuarioIconComponent,
    FormInquilinoComponent,
    SelectUnidadComponent,
    CalcularTotalesComponent,
    CalendarComponent,
    ReunionesVistaComponent,
    VotacionComponent,
    ExeclsMigrationComponent,
    AngularTableComponent,
    TableConceptosExpComponent,
    PaginationComponent
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ]
})
export class ComponentsModule { }
