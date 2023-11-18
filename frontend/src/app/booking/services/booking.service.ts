import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { BookingI, BookingIResponse } from 'src/app/models/booking.model';
import { RoomIResponse } from 'src/app/models/room.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient,
    private sharedService: SharedService) {}

  getAll(): Observable<BookingIResponse[]> {
    const headers = this.sharedService.setHeader()
    return this.http.get(environment.BASE_URL + 'booking', {headers})
    .pipe(
      map((res: any) => {
        return res
      }),
      catchError(err => {
        return throwError(err.error.message)
      })
    )
  }

  getAllAvailables(admissionDate: string, departureDate: string): Observable<RoomIResponse[]> {
    const headers = this.sharedService.setHeader()
    return this.http.get(environment.BASE_URL + `booking/rooms/${admissionDate}/${departureDate}`, {headers})
    .pipe(
      map((res: any) => {
        return res
      }),
      catchError(err => {
        return throwError(err.error.message)
      })
    )
  }

  getOne(dni: string, admissionDate: string): Observable<BookingIResponse> {
    const headers = this.sharedService.setHeader()
    return this.http.get(environment.BASE_URL + `booking/${dni}/${admissionDate}`, {headers})
    .pipe(
      map((res: any) => {
        return res
      }),
      catchError(err => {
        return throwError(err.error.message)
      })
    )
  }

  add(country: BookingI): Observable<BookingIResponse> {
    const headers = this.sharedService.setHeader()
    return this.http.post(environment.BASE_URL + 'country', country, {headers})
    .pipe(
      map((res: any) => {
        return res
      }),
      catchError(err => {
        return throwError(err.error.message)
      })
    )
  }

  checkin(dni: string, admissionDate: string): Observable<BookingIResponse> {
    const headers = this.sharedService.setHeader()

    return this.http.patch(environment.BASE_URL + `booking/checkin/${dni}/${admissionDate}`, null, {headers})
    .pipe(
      map((res: any) => {
        return res
      }),
      catchError(err => {
        return throwError(err.error.message)
      })
    )
  }

  checkout(dni: string, admissionDate: string): Observable<BookingIResponse> {
    const headers = this.sharedService.setHeader()

    return this.http.patch(environment.BASE_URL + `booking/checkout/${dni}/${admissionDate}`, null, {headers})
    .pipe(
      map((res: any) => {
        return res
      }),
      catchError(err => {
        return throwError(err.error.message)
      })
    )
  }

  cancel(dni: string, admissionDate: string): Observable<BookingIResponse> {
    const headers = this.sharedService.setHeader()

    return this.http.patch(environment.BASE_URL + `booking/cancel/${dni}/${admissionDate}`, null, {headers})
    .pipe(
      map((res: any) => {
        return res
      }),
      catchError(err => {
        return throwError(err.error.message)
      })
    )
  }
}
