import { HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import jwt_decode from 'jwt-decode';
import { DialogComponent } from '../components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  nameEvent: EventEmitter<string> = new EventEmitter<string>()
  surnameEvent: EventEmitter<string> = new EventEmitter<string>()
  titleDialog: EventEmitter<string> = new EventEmitter<string>()
  textDialog: EventEmitter<string> = new EventEmitter<string>()

  constructor(public dialog: MatDialog) { }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch(Error) {
      return null;
    }
  }

  setHeader(): HttpHeaders {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders()
    .set('Authorization', 'Bearer ' + token)

    return headers
  }

  openDialog(title: string): MatDialogRef<DialogComponent, any> {
    const _dialog = this.dialog.open(DialogComponent, {
      width: '250px',
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
      data: {
        title
      }
    });

    return _dialog
  }
}
