import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryRoutingModule } from './country-routing.module';
import { CountryComponent } from './components/country/country.component';
import { AngularMaterialModule } from '../angular-material.module';
import { AddCountryComponent } from './components/add-country/add-country.component';
import { SharedModule } from '../shared/shared.module';
import { EditCountryComponent } from './components/edit-country/edit-country.component';


@NgModule({
  declarations: [
    CountryComponent,
    AddCountryComponent,
    EditCountryComponent
  ],
  imports: [
    CommonModule,
    CountryRoutingModule,
    AngularMaterialModule,
    SharedModule
  ]
})
export class CountryModule { }
