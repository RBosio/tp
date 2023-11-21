import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from '../shared/services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class UserRoleGuard implements CanActivate, CanLoad {
  constructor(private sharedService: SharedService) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = localStorage.getItem('token')
    const { roles } = this.sharedService.getDecodedAccessToken(token)
  
    const role = roles.filter(x => x == 'user')[0]
    
    if(role) {
      return true
    }
    
    return false
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token = localStorage.getItem('token')
      const { roles } = this.sharedService.getDecodedAccessToken(token)

      const role = roles.filter(x => x == 'User')[0]
      
      console.log('holaa')
      if(role) {
        return true
      }
      
      return false
  }
}