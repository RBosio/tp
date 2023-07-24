import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from './components/city/city.component';
import { AddCityComponent } from './components/add-city/add-city.component';
import { EditCityComponent } from './components/edit-city/edit-city.component';

const routes: Routes = [
  {
    path: '', component: CityComponent
  },
  {
    path: 'add', component: AddCityComponent
  },
  {
    path: 'edit/:zipCode', component: EditCityComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityRoutingModule { }
