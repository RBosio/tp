import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { UserIResponse } from 'src/app/models/user.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token: string;
  headers: HttpHeaders

  constructor(private http: HttpClient,
    private sharedService: SharedService) {}

  getAll(): Observable<UserIResponse[]> {
    const headers = this.sharedService.setHeader()
    return this.http.get(environment.BASE_URL + 'user', {headers})
    .pipe(
      map((res: UserIResponse[]) => {
        return res
      }),
      catchError(err => {
        return throwError(err.error.message)
      })
    )
  }

  getOne(dni: string): Observable<UserIResponse> {
    const headers = this.sharedService.setHeader()
    return this.http.get(environment.BASE_URL + 'user/' + dni, {headers})
    .pipe(
      map((res: UserIResponse) => {
        return res
      }),
      catchError(err => {
        return throwError(err.error.message)
      })
    )
  }
}
