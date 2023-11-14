import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { ActivatedRoute } from '@angular/router';
import { BookingIResponse } from 'src/app/models/booking.model';
import { TypeService } from 'src/app/type/services/type.service';
import { ExtraService } from 'src/app/extra/services/extra.service';
import { ExtraIResponse } from 'src/app/models/extra.model';

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

        this.typeService.getOne(this.booking?.room?.typeId).subscribe(res => {
          this.type = res.name
        })

        this.extraService.getAll().subscribe(res => {
          this.extras = res
          console.log(this.booking.extras)
          console.log(this.extras)
        })
      })
    })

    
  }

  check(extra: ExtraIResponse) {
    const extras = this.booking.extras.map(x => x.name)
    return extras.includes(extra.name)
  }


}
