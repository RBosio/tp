import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { CityI, CityIResponse } from 'src/app/models/city.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  token: string;
  headers: HttpHeaders

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token')
    this.headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.token);
  }

  getAll(): Observable<CityIResponse[]> {
    return this.http.get(environment.BASE_URL + 'city', {headers: this.headers})
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
    return this.http.get(environment.BASE_URL + 'city/' + zipCode, {headers: this.headers})
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
    return this.http.post(environment.BASE_URL + 'city', city, {headers: this.headers})
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
    return this.http.patch(environment.BASE_URL + 'city/' + zipCode, city, {headers: this.headers})
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
    return this.http.delete(environment.BASE_URL + 'city/' + zipCode, {headers: this.headers})
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
