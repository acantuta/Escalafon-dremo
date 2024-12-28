import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegajoModule } from '../legajo.module';

@NgModule({
  imports: [
    CommonModule,
    LegajoModule,
    // ... otros imports
  ],
  declarations: [
    InformacionPersonalComponent,
    // ... otros componentes
  ]
})
export class InformacionPersonalModule { } 