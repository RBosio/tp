import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ProvinceI, ProvinceIResponse } from 'src/app/models/province.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {
  token: string;
  headers: HttpHeaders

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token')
    this.headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + this.token);
  }

  getAll(): Observable<ProvinceIResponse[]> {
    return this.http.get(environment.BASE_URL + 'province', {headers: this.headers})
    .pipe(
      map((res: any) => {
        return res
      }),
      catchError(err => {
        return throwError(err.error.message)
      })
    )
  }

  getOne(id: number): Observable<ProvinceIResponse> {
    return this.http.get(environment.BASE_URL + 'province/' + id, {headers: this.headers})
    .pipe(
      map((res: any) => {
        return res
      }),
      catchError(err => {
        return throwError(err.error.message)
      })
    )
  }

  add(province: ProvinceI): Observable<ProvinceIResponse> {
    return this.http.post(environment.BASE_URL + 'province', province, {headers: this.headers})
    .pipe(
      map((res: any) => {
        return res
      }),
      catchError(err => {
        return throwError(err.error.message)
      })
    )
  }
  
  edit(province: ProvinceI, id: number): Observable<ProvinceIResponse> {
    return this.http.patch(environment.BASE_URL + 'province/' + id, province, {headers: this.headers})
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
    return this.http.delete(environment.BASE_URL + 'province/' + id, {headers: this.headers})
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
