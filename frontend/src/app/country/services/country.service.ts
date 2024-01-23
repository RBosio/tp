import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { CountryI, CountryIResponse } from 'src/app/models/country.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  token: string;
  headers: HttpHeaders

  constructor(private http: HttpClient,
    private sharedService: SharedService) {}

  getAll(): Observable<CountryIResponse[]> {
    const headers = this.sharedService.setHeader()
    return this.http.get(environment.BASE_URL + 'country', {headers})
    .pipe(
      map((res: CountryIResponse[]) => {
        return res
      }),
      catchError(err => {
        return throwError(err.error.message)
      })
    )
  }

  getOne(id: number): Observable<CountryIResponse> {
    const headers = this.sharedService.setHeader()
    return this.http.get(environment.BASE_URL + 'country/' + id, {headers})
    .pipe(
      map((res: CountryIResponse) => {
        return res
      }),
      catchError(err => {
        return throwError(err.error.message)
      })
    )
  }

  add(country: CountryI): Observable<CountryIResponse> {
    const headers = this.sharedService.setHeader()
    return this.http.post(environment.BASE_URL + 'country', country, {headers})
    .pipe(
      map((res: CountryIResponse) => {
        return res
      }),
      catchError(err => {
        return throwError(err.error.message)
      })
    )
  }
  
  edit(country: CountryI, id: number): Observable<CountryIResponse> {
    const headers = this.sharedService.setHeader()
    return this.http.patch(environment.BASE_URL + 'country/' + id, country, {headers})
    .pipe(
      map((res: CountryIResponse) => {
        return res
      }),
      catchError(err => {
        return throwError(err.error.message)
      })
    )
  }

  delete(id: number) {
    const headers = this.sharedService.setHeader()
    return this.http.delete(environment.BASE_URL + 'country/' + id, {headers})
    .pipe(
      map((res) => {
        return res
      }),
      catchError(err => {
        return throwError(err.error.message)
      })
    )
  }
}
