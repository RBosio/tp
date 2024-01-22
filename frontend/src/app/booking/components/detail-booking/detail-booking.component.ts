import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { ActivatedRoute } from '@angular/router';
import { BookingIResponse } from 'src/app/models/booking.model';
import { TypeService } from 'src/app/type/services/type.service';
import { ExtraService } from 'src/app/extra/services/extra.service';
import { ExtraIResponse } from 'src/app/models/extra.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detail-booking',
  templateUrl: './detail-booking.component.html',
  styleUrls: ['./detail-booking.component.scss']
})
export class DetailBookingComponent implements OnInit {

  dni: string
  admissionDate: string
  booking: BookingIResponse
  type: string
  extras: ExtraIResponse[]
  url: string

  photo: string

  constructor(
    private bookingService: BookingService,
    private typeService: TypeService,
    private extraService: ExtraService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.dni = data['dni']
      this.admissionDate = data['admissionDate']
      
      this.bookingService.getOne(this.dni, this.admissionDate).subscribe(res => {
        this.booking = res
        if(this.booking.room.image) {
          this.url = `${environment.BASE_URL}uploads/${this.booking.room.image}`
        }

        this.photo = this.url || 'assets/no-image.png'

        this.typeService.getOne(this.booking?.room?.typeId).subscribe(res => {
          this.type = res.name
        })

        this.extraService.getAll().subscribe(res => {
          this.extras = res
          })
      })
    })
  }

  check(extra: ExtraIResponse) {
    const extras = this.booking.extras.map(x => x.name)
    return extras.includes(extra.name)
  }


}
