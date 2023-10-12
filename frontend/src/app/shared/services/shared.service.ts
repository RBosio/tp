import { HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';

import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  nameEvent: EventEmitter<string> = new EventEmitter<string>()
  surnameEvent: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  setHeader(): HttpHeaders {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + token)

    return headers
  }
}
