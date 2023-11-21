import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../shared/services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AdminRoleGuard implements CanLoad {
  constructor(private sharedService: SharedService) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = localStorage.getItem('token')
      const { roles } = this.sharedService.getDecodedAccessToken(token)

      const role = roles.filter(x => x == 'admin')[0]
      
      if(role) {
        return true
      }
      
      return false
  }
}