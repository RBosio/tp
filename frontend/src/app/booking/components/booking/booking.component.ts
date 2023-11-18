import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { RoomIResponse } from 'src/app/models/room.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  index: number
  position: number
  rooms: RoomIResponse[]
  BASE_URL: string
  days: number

  constructor(
    private bookingService: BookingService,
    private router: Router
    ) {
    this.BASE_URL = environment.BASE_URL
  }
  
  ngOnInit(): void {
    this.index = 0
    this.position = 0
  }

  range = new FormGroup({
    admissionDate: new FormControl<Date | null>(null),
    departureDate: new FormControl<Date | null>(null),
  })

  back(carouselInner: HTMLElement) {
    if(this.index > 0) {
      this.index--
      carouselInner.style.transform = `translateX(${this.position + 100}%)`
      this.position += 100
    }
  }
  
  next(carouselInner: HTMLElement) {
    if(this.index < Math.ceil(this.rooms.length / 4) - 1) {
      this.index++
      carouselInner.style.transform = `translateX(${this.position - 100}%)`
      this.position -= 100
    }
  }

  getRooms() {
    this.days = this.dateDiffInDays(this.range.controls['admissionDate'].value, this.range.controls['departureDate'].value);
  
    const admissionDate = this.range.controls['admissionDate'].value.toISOString().split('T')[0]
    const departureDate = this.range.controls['departureDate'].value.toISOString().split('T')[0]

    this.bookingService.getAllAvailables(admissionDate, departureDate).subscribe(res => {
      this.rooms = res
    })
  }

  booking(id: number) {
    localStorage.setItem('room', JSON.stringify({
      "roomId": id,
      "days": this.days
    }))

    this.router.navigateByUrl('/booking/extras')
  }
  
  dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;

    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }
}
