import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UserLoginI } from 'src/app/models/user.model';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  user: UserLoginI = {
    email: '',
    password: ''
  };
  err: string;

  login: FormGroup;

  subscription$: Subscription

  constructor(
    private readonly fb: FormBuilder,
    private authService: AuthService,
    private sharedService: SharedService,
    private _snackBar: MatSnackBar,
    private router: Router) {
    
  }

  ngOnInit(): void {
      this.login = this.initForm();
  }

  onSubmit(): void {
    if(this.login.valid){
      this.user = {
        email: this.login.controls['email'].value,
        password: this.login.controls['password'].value  
      }  
      this.subscription$ = this.authService.login(this.user).subscribe(
        () => {
          this.router.navigateByUrl('/');
        },
        () => this.openSnackBar('Email y/o contraseña incorrectos', 'Cerrar')
        )
    }
  }
  
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  initForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnDestroy(): void {
    if(this.subscription$){
      this.subscription$.unsubscribe()
    }
  }
}