import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { TypeI, TypeIResponse } from 'src/app/models/type.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  token: string;
  headers: HttpHeaders

  constructor(
    private http: HttpClient,
    private sharedService: SharedService) { }

  getAll(): Observable<TypeIResponse[]> {
    const headers = this.sharedService.setHeader()
    return this.http.get(environment.BASE_URL + 'type', {headers})
    .pipe(
      map((res: TypeIResponse[]) => {
        return res
      }),
      catchError(err => {
        return throwError(err.error.message)
      })
    )
  }

  getOne(id: number): Observable<TypeIResponse> {
    const headers = this.sharedService.setHeader()
    return this.http.get(environment.BASE_URL + 'type/' + id, {headers})
    .pipe(
      map((res: TypeIResponse) => {
        return res
      }),
      catchError(err => {
        return throwError(err.error.message)
      })
    )
  }

  add(type: TypeI): Observable<TypeIResponse> {
    const headers = this.sharedService.setHeader()
    return this.http.post(environment.BASE_URL + 'type', type, {headers})
    .pipe(
      map((res: TypeIResponse) => {
        return res
      }),
      catchError(err => {
        return throwError(err.error.message)
      })
    )
  }
  
  edit(type: TypeI, id: number): Observable<TypeIResponse> {
    const headers = this.sharedService.setHeader()
    return this.http.patch(environment.BASE_URL + 'type/' + id, type, {headers})
    .pipe(
      map((res: TypeIResponse) => {
        return res
      }),
      catchError(err => {
        return throwError(err.error.message)
      })
    )
  }

  delete(id: number) {
    const headers = this.sharedService.setHeader()
    return this.http.delete(environment.BASE_URL + 'type/' + id, {headers})
    .pipe(
      map((res: TypeIResponse) => {
        return res
      }),
      catchError(err => {
        return throwError(err.error.message)
      })
    )
  }
}
