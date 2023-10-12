import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeComponent } from './components/type/type.component';
import { AddTypeComponent } from './components/add-type/add-type.component';
import { EditTypeComponent } from './components/edit-type/edit-type.component';

const routes: Routes = [
  {
    path: '', component: TypeComponent
  },
  {
    path: 'add', component: AddTypeComponent
  },
  {
    path: 'edit/:id', component: EditTypeComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeRoutingModule { }
