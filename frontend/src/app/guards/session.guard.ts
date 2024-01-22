import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanLoad {

  constructor(private authService: AuthService){}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const helper = new JwtHelperService()
      const token = localStorage.getItem('token')
      
      const isExpired = helper.isTokenExpired(token)
      
      if(!isExpired){
        return true;
      };
      
      localStorage.clear()
      return false;
  }
}