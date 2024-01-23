import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ProvinceI, ProvinceIResponse } from 'src/app/models/province.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {
  token: string;
  headers: HttpHeaders

  constructor(private http: HttpClient,
    private sharedService: SharedService) {}

  getAll(): Observable<ProvinceIResponse[]> {
    const headers = this.sharedService.setHeader()
    return this.http.get(environment.BASE_URL + 'province', {headers})
    .pipe(
      map((res: any) => {
        return res
      }),
      catchError(err => {
        return throwError(err.error.message)
      })
    )
  }

  getAllByCountry(countryId: number): Observable<ProvinceIResponse[]> {
    const headers = this.sharedService.setHeader()
    return this.http.get(environment.BASE_URL + 'province/country/' + countryId, {headers})
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
    const headers = this.sharedService.setHeader()
    return this.http.get(environment.BASE_URL + 'province/' + id, {headers})
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
    const headers = this.sharedService.setHeader()
    return this.http.post(environment.BASE_URL + 'province', province, {headers})
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
    const headers = this.sharedService.setHeader()
    return this.http.patch(environment.BASE_URL + 'province/' + id, province, {headers})
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
    const headers = this.sharedService.setHeader()
    return this.http.delete(environment.BASE_URL + 'province/' + id, {headers})
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
