import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

import { DatosFormacionComponent } from './datos-formacion/datos-formacion.component';
import { DatosCapacitacionesComponent } from './datos-capacitaciones/datos-capacitaciones.component';
import { FormacionAcademicaComponent } from './formacion-academica.component';
import { ArchivoHandlerComponent } from '../../../components/archivo-handler/archivo-handler.component';

@NgModule({
  declarations: [
    FormacionAcademicaComponent,
    DatosFormacionComponent,
    DatosCapacitacionesComponent,
    ArchivoHandlerComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatTabsModule,
    MatSnackBarModule,
    MatDialogModule
  ]
})
export class FormacionAcademicaModule { } 