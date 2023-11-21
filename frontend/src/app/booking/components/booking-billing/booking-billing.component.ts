import { Component, OnInit } from '@angular/core';
import { ExtraIResponse } from 'src/app/models/extra.model';
import { environment } from 'src/environments/environment';
import { TypeService } from 'src/app/type/services/type.service';
import { ExtraService } from 'src/app/extra/services/extra.service';
import { RoomService } from 'src/app/room/services/room.service';
import { RoomIResponse } from 'src/app/models/room.model';
import { UserIResponse } from 'src/app/models/user.model';
import { UserService } from 'src/app/user/services/user.service';
import { BookingService } from '../../services/booking.service';
import { BookingI } from 'src/app/models/booking.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-billing',
  templateUrl: './booking-billing.component.html',
  styleUrls: ['./booking-billing.component.scss']
})
export class BookingBillingComponent implements OnInit {

  dni: string
  admissionDate: Date
  departureDate: Date
  room: RoomIResponse
  type: string
  extras: ExtraIResponse[]
  url: string
  roomId: number
  priceRoom: number
  priceExtras: number
  user: UserIResponse

  photo: string

  constructor(
    private roomService: RoomService,
    private typeService: TypeService,
    private extraService: ExtraService,
    private userService: UserService,
    private bookingService: BookingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.roomId = JSON.parse(localStorage.getItem('billing')).roomId
    this.dni = JSON.parse(localStorage.getItem('billing')).dni
    this.admissionDate = JSON.parse(localStorage.getItem('billing')).admissionDate
    this.departureDate = JSON.parse(localStorage.getItem('billing')).departureDate
    this.priceRoom = JSON.parse(localStorage.getItem('billing')).priceRoom
    this.priceExtras = JSON.parse(localStorage.getItem('billing')).priceExtras
    
    this.roomService.getOne(this.roomId).subscribe(res => {
      this.room = res
      
      if(this.room.image) {
        this.url = `${environment.BASE_URL}uploads/${this.room.image}`
      }

      this.photo = this.url || 'assets/no-image.png'

      this.typeService.getOne(this.room?.typeId).subscribe(res => {
        this.type = res.name
      })
      
      this.extraService.getAll().subscribe(res => {
        this.extras = res

        
        this.extras = this.extras.filter(x => {
          return this.test(x)
        })
      })

      this.userService.getOne(this.dni).subscribe(res => {
        this.user = res
      })
    })
 
  }

  test(x: ExtraIResponse): boolean {
    const extrasSelected: number[] = JSON.parse(localStorage.getItem('billing')).extras

    for (let i = 0; i < extrasSelected.length; i++) {
      if(x.id == extrasSelected[i]) {
        return true
      }      
    }
    
    return false
  }

  booking() {
    const booking: BookingI = {
      "admissionDate": this.admissionDate,
      "departureDate": this.departureDate,
      "userDni": this.dni,
      "roomId": this.roomId
    }

    this.bookingService.add(booking).subscribe(() => {
      this.router.navigateByUrl('/')
    })
  }
}