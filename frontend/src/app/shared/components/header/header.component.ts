import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  login: boolean;
  token: string;

  name: string
  surname: string

  user: boolean

  ngOnInit(): void {
    this.authService.tokenEvent.subscribe(res => {
      this.login = res
    })

    this.authService.tokenE.subscribe(res => {
      const { token } = res
      const { roles } = this.sharedService.getDecodedAccessToken(token)
      const { name } = this.sharedService.getDecodedAccessToken(token)
      const { surname } = this.sharedService.getDecodedAccessToken(token)
      
      this.name = name
      this.surname = surname
      
      this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
      this.surname = this.surname.charAt(0).toUpperCase() + this.surname.slice(1);
      
      let role = roles.filter(x => x == 'user')[0]
      
      if(role) {
        this.user = true    
      } else {
        this.user = false
      }
    })
    
    if(localStorage.getItem('token')) {
      this.token = localStorage.getItem('token')
      
      const { name } = this.sharedService.getDecodedAccessToken(this.token)
      const { surname } = this.sharedService.getDecodedAccessToken(this.token)
      this.name = name
      this.surname = surname
      
      this.name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
      this.surname = this.surname.charAt(0).toUpperCase() + this.surname.slice(1);
    } else {
      this.user = true
    }
  }
  
  constructor(
    private readonly authService: AuthService,
    private router: Router,
    private sharedService: SharedService
    ) {}

  toggleSideNav(){
    this.sidenav.toggle();
  }

  logout() {
    this.authService.logout();
    this.token = localStorage.getItem('token');
    this.user = true
    this.router.navigateByUrl('auth/login');
  }
}
