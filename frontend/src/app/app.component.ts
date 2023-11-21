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
    this.authService.tokenE.subscribe(res => {
      const { token } = res
      const { roles } = this.sharedService.getDecodedAccessToken(token)
      
      let role = roles.filter(x => x == 'seller')[0]
      
      if(role) {
        this.seller = true
      } else {
        this.seller = false
      }
      
      role = roles.filter(x => x == 'admin')[0]
  
      if(role) {
        this.admin = true
      } else {
        this.admin = false
      }
    })
  
    
  }

  closeSidenav(sidenav: MatSidenav) {
    sidenav.close()
  }
}
