import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypeRoutingModule } from './type-routing.module';
import { TypeComponent } from './components/type/type.component';
import { AngularMaterialModule } from '../angular-material.module';
import { AddTypeComponent } from './components/add-type/add-type.component';
import { SharedModule } from '../shared/shared.module';
import { EditTypeComponent } from './components/edit-type/edit-type.component';


@NgModule({
  declarations: [
    TypeComponent,
    AddTypeComponent,
    EditTypeComponent
  ],
  imports: [
    CommonModule,
    TypeRoutingModule,
    AngularMaterialModule,
    SharedModule
  ]
})
export class TypeModule { }
