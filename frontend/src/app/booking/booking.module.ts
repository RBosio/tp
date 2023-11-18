import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookingSellerComponent } from './components/booking-seller/booking-seller.component';
import { AngularMaterialModule } from '../angular-material.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DetailBookingComponent } from './components/detail-booking/detail-booking.component';
import { BookingComponent } from './components/booking/booking.component';
import { BookingExtrasComponent } from './components/booking-extras/booking-extras.component';


@NgModule({
  declarations: [
    BookingSellerComponent,
    DetailBookingComponent,
    BookingComponent,
    BookingExtrasComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    AngularMaterialModule,
    SharedModule,
    FormsModule
  ]
})
export class BookingModule { }
