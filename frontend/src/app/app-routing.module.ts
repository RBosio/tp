import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'country',
    loadChildren: () => import('./country/country.module').then(m => m.CountryModule)
  },
  {
    path: 'province',
    loadChildren: () => import('./province/province.module').then(m => m.ProvinceModule)
  },
  {
    path: 'city',
    loadChildren: () => import('./city/city.module').then(m => m.CityModule)
  },
  {
    path: 'type',
    loadChildren: () => import('./type/type.module').then(m => m.TypeModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
