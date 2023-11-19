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
  extrasChecked: number[]

  constructor(
    private extraService: ExtraService,
    private router: Router
    ) {
      this.days = JSON.parse(localStorage.getItem('room')).days
      this.id = JSON.parse(localStorage.getItem('room')).roomId
      this.extrasChecked = []
  }
  
  ngOnInit(): void {
    this.extraService.getAll().subscribe(res => {
      this.extras = res
    })
  }
  
  booking() {
    localStorage.setItem('room', JSON.stringify({
      "roomId": this.id,
      "days": this.days,
      "extras": this.extrasChecked
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
