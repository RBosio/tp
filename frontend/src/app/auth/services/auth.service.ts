import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { UserLoginI } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';

interface resToken {
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenEvent: EventEmitter<boolean> = new EventEmitter()
  name: EventEmitter<string> = new EventEmitter()
  surname: EventEmitter<string> = new EventEmitter()

  constructor(
    private http: HttpClient,
    ) { }

  login(user: UserLoginI) {
    return this.http.post(environment.BASE_URL + 'auth/login', user)
    .pipe(
      map((res: resToken) => {
        localStorage.setItem('token', res.token)
        this.tokenEvent.emit(true);
        return res
      }),
      catchError(err => {
        return throwError(err.error.message)
      })
    )
  }
  
  signup(user: UserLoginI) {
    return this.http.post(environment.BASE_URL + 'auth/signup', user)
    .pipe(
      map((res) => {
        return res
      }),
      catchError(err => {
        return throwError(err.error.message)
      })
    )
  }

  logout(): void {
    this.tokenEvent.emit(false);
    localStorage.clear();
  }
}
