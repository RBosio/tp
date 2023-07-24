import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProvinceComponent } from './components/province/province.component';
import { AddProvinceComponent } from './components/add-province/add-province.component';
import { EditProvinceComponent } from './components/edit-province/edit-province.component';

const routes: Routes = [
  {
    path: '', component: ProvinceComponent
  },
  {
    path: 'add', component: AddProvinceComponent
  },
  {
    path: 'edit/:id', component: EditProvinceComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvinceRoutingModule { }
