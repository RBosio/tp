import { Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SharedService } from './shared/services/shared.service';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  seller: boolean
  admin: boolean

  constructor(
    private sharedService: SharedService,
    private authService: AuthService
    ) {}
  
  ngOnInit(): void {
    const token = localStorage.getItem('token')
    if(token) {
      const { roles }: { roles: string[] } = this.sharedService.getDecodedAccessToken(token)
      
      if(roles.includes('seller')){
        this.seller = true
      }
      
      if(roles.includes('admin')){
        this.admin = true
      }
    }
    
    this.authService.tokenEvent.subscribe(() => {
      this.seller = false
      this.admin = false

      const token = localStorage.getItem('token')
      const { roles }: { roles: string[] } = this.sharedService.getDecodedAccessToken(token)
      
      if(roles.includes('seller')){
        this.seller = true
      }
      
      if(roles.includes('admin')){
        this.admin = true
      }
    })
  }

  closeSidenav(sidenav: MatSidenav) {
    sidenav.close()
  }
}
