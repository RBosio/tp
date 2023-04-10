import { Component } from '@angular/core';
import { faUser, faRightToBracket, faRightFromBracket, faHouse } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  faHouse = faHouse
  faUser = faUser
  faRightToBracket = faRightToBracket
  faRightFromBracket = faRightFromBracket
}
