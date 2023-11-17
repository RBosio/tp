import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './components/booking/booking.component';
import { BookingSellerComponent } from './components/booking-seller/booking-seller.component';
import { DetailBookingComponent } from './components/detail-booking/detail-booking.component';

const routes: Routes = [
  {path: '', component: BookingComponent},
  {path: 'seller', component: BookingSellerComponent},
  {path: 'detail/:dni/:admissionDate', component: DetailBookingComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
