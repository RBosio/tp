import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CityRoutingModule } from './city-routing.module';
import { CityComponent } from './components/city/city.component';
import { AddCityComponent } from './components/add-city/add-city.component';
import { EditCityComponent } from './components/edit-city/edit-city.component';
import { AngularMaterialModule } from '../angular-material.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CityComponent,
    AddCityComponent,
    EditCityComponent
  ],
  imports: [
    CommonModule,
    CityRoutingModule,
    AngularMaterialModule,
    SharedModule
  ]
})
export class CityModule { }
