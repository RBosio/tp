import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { SessionGuard } from './guards/session.guard';
import { AdminRoleGuard } from './guards/admin-role.guard';

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
    loadChildren: () => import('./country/country.module').then(m => m.CountryModule),
    canLoad: [SessionGuard, AdminRoleGuard]
  },
  {
    path: 'province',
    loadChildren: () => import('./province/province.module').then(m => m.ProvinceModule),
    canLoad: [SessionGuard, AdminRoleGuard]
  },
  {
    path: 'city',
    loadChildren: () => import('./city/city.module').then(m => m.CityModule),
    canLoad: [SessionGuard, AdminRoleGuard]
  },
  {
    path: 'type',
    loadChildren: () => import('./type/type.module').then(m => m.TypeModule),
    canLoad: [SessionGuard, AdminRoleGuard]
  },
  {
    path: 'room',
    loadChildren: () => import('./room/room.module').then(m => m.RoomModule),
    canLoad: [SessionGuard, AdminRoleGuard]
  },
  {
    path: 'extra',
    loadChildren: () => import('./extra/extra.module').then(m => m.ExtraModule),
    canLoad: [SessionGuard, AdminRoleGuard]
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canLoad: [SessionGuard, AdminRoleGuard]
  },
  {
    path: 'booking',
    loadChildren: () => import('./booking/booking.module').then(m => m.BookingModule),
    canLoad: [SessionGuard]
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
