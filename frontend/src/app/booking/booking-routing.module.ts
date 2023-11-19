import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './components/booking/booking.component';
import { BookingSellerComponent } from './components/booking-seller/booking-seller.component';
import { DetailBookingComponent } from './components/detail-booking/detail-booking.component';
import { BookingExtrasComponent } from './components/booking-extras/booking-extras.component';
import { BookingBillingComponent } from './components/booking-billing/booking-billing.component';

const routes: Routes = [
  {path: '', component: BookingComponent},
  {path: 'extras', component: BookingExtrasComponent},
  {path: 'billing', component: BookingBillingComponent},
  {path: 'seller', component: BookingSellerComponent},
  {path: 'detail/:dni/:admissionDate', component: DetailBookingComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
