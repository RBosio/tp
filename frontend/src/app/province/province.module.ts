import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProvinceRoutingModule } from './province-routing.module';
import { ProvinceComponent } from './components/province/province.component';
import { AddProvinceComponent } from './components/add-province/add-province.component';
import { EditProvinceComponent } from './components/edit-province/edit-province.component';
import { AngularMaterialModule } from '../angular-material.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProvinceComponent,
    AddProvinceComponent,
    EditProvinceComponent
  ],
  imports: [
    CommonModule,
    ProvinceRoutingModule,
    AngularMaterialModule,
    SharedModule
  ]
})
export class ProvinceModule { }
