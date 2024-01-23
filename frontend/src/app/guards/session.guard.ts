import { Injectable } from '@angular/core';
import { CanLoad, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanLoad {

  canLoad(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const helper = new JwtHelperService()
      const token = localStorage.getItem('token')
      
      const isExpired = helper.isTokenExpired(token)
      
      if(!isExpired){
        return true;
      }
      
      localStorage.clear()
      return false;
  }
}