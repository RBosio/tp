import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExtraComponent } from './components/extra/extra.component';
import { AddExtraComponent } from './components/add-extra/add-extra.component';
import { EditExtraComponent } from './components/edit-extra/edit-extra.component';

const routes: Routes = [
  {
    path: '', component: ExtraComponent
  },
  {
    path: 'add', component: AddExtraComponent
  },
  {
    path: 'edit/:id', component: EditExtraComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtraRoutingModule { }
