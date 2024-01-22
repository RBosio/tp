import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './components/booking/booking.component';
import { BookingSellerComponent } from './components/booking-seller/booking-seller.component';
import { DetailBookingComponent } from './components/detail-booking/detail-booking.component';
import { BookingExtrasComponent } from './components/booking-extras/booking-extras.component';
import { BookingBillingComponent } from './components/booking-billing/booking-billing.component';
import { UserRoleGuard } from '../guards/user-role.guard';
import { SellerRoleGuard } from '../guards/seller-role.guard';
import { BookingUserComponent } from './components/booking-user/booking-user.component';

const routes: Routes = [
  {path: '', component: BookingComponent, canActivate: [UserRoleGuard]},
  {path: 'extras', component: BookingExtrasComponent, canActivate: [UserRoleGuard]},
  {path: 'billing', component: BookingBillingComponent, canActivate: [UserRoleGuard]},
  {path: 'seller', component: BookingSellerComponent, canActivate: [SellerRoleGuard]},
  {path: 'user', component: BookingUserComponent, canActivate: [UserRoleGuard]},
  {path: 'detail/:dni/:admissionDate', component: DetailBookingComponent, canActivate: [SellerRoleGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
