import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { CountryI, CountryIResponse } from 'src/app/models/country.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  token: string;
  headers: HttpHeaders

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token')
    this.headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.token);
  }

  getAll(): Observable<CountryIResponse[]> {
    return this.http.get(environment.BASE_URL + 'country', {headers: this.headers})
    .pipe(
      map((res: any) => {
        return res
      }),
      catchError(err => {
        return throwError(err.error.message)
      })
    )
  }

  getOne(id: number): Observable<CountryIResponse> {
    return this.http.get(environment.BASE_URL + 'country/' + id, {headers: this.headers})
    .pipe(
      map((res: any) => {
        return res
      }),
      catchError(err => {
        return throwError(err.error.message)
      })
    )
  }

  add(country: CountryI): Observable<CountryIResponse> {
    return this.http.post(environment.BASE_URL + 'country', country, {headers: this.headers})
    .pipe(
      map((res: any) => {
        return res
      }),
      catchError(err => {
        return throwError(err.error.message)
      })
    )
  }
  
  edit(country: CountryI, id: number): Observable<CountryIResponse> {
    return this.http.patch(environment.BASE_URL + 'country/' + id, country, {headers: this.headers})
    .pipe(
      map((res: any) => {
        return res
      }),
      catchError(err => {
        return throwError(err.error.message)
      })
    )
  }

  delete(id: number) {
    return this.http.delete(environment.BASE_URL + 'country/' + id, {headers: this.headers})
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
