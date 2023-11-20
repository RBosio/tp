import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExtraService } from 'src/app/extra/services/extra.service';
import { ExtraIResponse } from 'src/app/models/extra.model';

@Component({
  selector: 'app-booking-extras',
  templateUrl: './booking-extras.component.html',
  styleUrls: ['./booking-extras.component.scss']
})
export class BookingExtrasComponent implements OnInit {
  extras: ExtraIResponse[]
  id: number
  days: number
  dni: string
  admissionDate: Date
  departureDate: Date
  price: number
  extrasChecked: number[]

  constructor(
    private extraService: ExtraService,
    private router: Router
    ) {
      this.days = JSON.parse(localStorage.getItem('billing')).days
      this.id = JSON.parse(localStorage.getItem('billing')).roomId
      this.dni = JSON.parse(localStorage.getItem('billing')).dni
      this.admissionDate = JSON.parse(localStorage.getItem('billing')).admissionDate
      this.departureDate = JSON.parse(localStorage.getItem('billing')).departureDate
      this.price = JSON.parse(localStorage.getItem('billing')).price
      this.extrasChecked = []
  }
  
  ngOnInit(): void {
    this.extraService.getAll().subscribe(res => {
      this.extras = res
    })
  }

  test(x: ExtraIResponse): boolean {
    for (let i = 0; i < this.extrasChecked.length; i++) {
      if(x.id == this.extrasChecked[i]) {
        return true
      }      
    }
    
    return false
  }
  
  booking() {
    this.extras = this.extras.filter(x => {
      return this.test(x)
    })

    console.log(this.extras)

    this.extras.map(x => {
      this.price += x.price * this.days
    }) 

    localStorage.setItem('billing', JSON.stringify({
      "roomId": this.id,
      "days": this.days,
      "dni": this.dni,
      "admissionDate": this.admissionDate,
      "departureDate": this.departureDate,
      "extras": this.extrasChecked,
      "price": this.price
    }))

    this.router.navigateByUrl('/booking/billing')
  }

  check(id: number) {
    if(this.extrasChecked.find(x => x == id)) {
      this.extrasChecked = this.extrasChecked.filter(x => x !== id)
    } else {
      this.extrasChecked.push(id)
    }
  }
}
