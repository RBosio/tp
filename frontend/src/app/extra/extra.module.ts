import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExtraRoutingModule } from './extra-routing.module';
import { ExtraComponent } from './components/extra/extra.component';
import { AngularMaterialModule } from '../angular-material.module';
import { AddExtraComponent } from './components/add-extra/add-extra.component';
import { SharedModule } from '../shared/shared.module';
import { EditExtraComponent } from './components/edit-extra/edit-extra.component';


@NgModule({
  declarations: [
    ExtraComponent,
    AddExtraComponent,
    EditExtraComponent
  ],
  imports: [
    CommonModule,
    ExtraRoutingModule,
    AngularMaterialModule,
    SharedModule
  ]
})
export class ExtraModule { }
