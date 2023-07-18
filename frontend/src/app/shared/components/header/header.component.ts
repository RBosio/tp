import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  login: boolean;
  token: string;

  ngOnInit(): void {
    this.authService.tokenEvent.subscribe(res => {
      this.login = res;
    });

    this.token = localStorage.getItem('token');
  }
  
  constructor(
    private readonly authService: AuthService,
    private router: Router
    ) {}

  toggleSideNav(){
    this.sidenav.toggle();
  }

  logout() {
    this.authService.logout();
    this.token = localStorage.getItem('token');
    this.router.navigateByUrl('auth/login');
  }
}
