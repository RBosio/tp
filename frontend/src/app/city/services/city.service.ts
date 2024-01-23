import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { CityI, CityIResponse } from 'src/app/models/city.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  token: string;
  headers: HttpHeaders

  constructor(private http: HttpClient,
    private sharedService: SharedService) {}

  getAll(): Observable<CityIResponse[]> {
    const headers = this.sharedService.setHeader()
    return this.http.get(environment.BASE_URL + 'city', {headers})
    .pipe(
      map((res: any) => {
        return res
      }),
      catchError(err => {
        return throwError(err.error.message)
      })
    )
  }

  getAllByProvince(provinceId: number): Observable<CityIResponse[]> {
    const headers = this.sharedService.setHeader()
    return this.http.get(environment.BASE_URL + 'city/province/' + provinceId, {headers})
    .pipe(
      map((res: any) => {
        return res
      }),
      catchError(err => {
        return throwError(err.error.message)
      })
    )
  }

  getOne(zipCode: string): Observable<CityIResponse> {
    const headers = this.sharedService.setHeader()
    return this.http.get(environment.BASE_URL + 'city/' + zipCode, {headers})
    .pipe(
      map((res: any) => {
        return res
      }),
      catchError(err => {
        return throwError(err.error.message)
      })
    )
  }

  add(city: CityI): Observable<CityIResponse> {
    const headers = this.sharedService.setHeader()
    return this.http.post(environment.BASE_URL + 'city', city, {headers})
    .pipe(
      map((res: any) => {
        return res
      }),
      catchError(err => {
        return throwError(err.error.message)
      })
    )
  }
  
  edit(city: CityI, zipCode: string): Observable<CityIResponse> {
    const headers = this.sharedService.setHeader()
    return this.http.patch(environment.BASE_URL + 'city/' + zipCode, city, {headers})
    .pipe(
      map((res: any) => {
        return res
      }),
      catchError(err => {
        return throwError(err.error.message)
      })
    )
  }

  delete(zipCode: string) {
    const headers = this.sharedService.setHeader()
    return this.http.delete(environment.BASE_URL + 'city/' + zipCode, {headers})
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
