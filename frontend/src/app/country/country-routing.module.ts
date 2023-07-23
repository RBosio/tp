import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountryComponent } from './components/country/country.component';
import { AddCountryComponent } from './components/add-country/add-country.component';
import { EditCountryComponent } from './components/edit-country/edit-country.component';

const routes: Routes = [
  {
    path: '', component: CountryComponent
  },
  {
    path: 'add', component: AddCountryComponent
  },
  {
    path: 'edit/:id', component: EditCountryComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountryRoutingModule { }
