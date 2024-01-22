import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  login: boolean
  user: boolean
  
  constructor(private sharedService: SharedService) {}
  
  ngOnInit(): void {
    if(localStorage.getItem('token')){
      this.login = true
      const token = localStorage.getItem('token')
      const { roles } = this.sharedService.getDecodedAccessToken(token)    
    
      const role = roles.filter(x => x == 'user')[0]
    
      if(role) {
        this.user = true
      } else {
        this.user = false
      }
      
    } else {
      this.login = false
    }
  }
  
}
