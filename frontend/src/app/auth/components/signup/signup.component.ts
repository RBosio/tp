import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserSignupI } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  signup: FormGroup;

  subscription$: Subscription

  ngOnInit(): void {
      this.signup = this.initForm();
  }

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private router: Router
    ) {}

  initForm(): FormGroup {
    return this.fb.group({
      dni: ['', Validators.required],
      phone: [''],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    console.log(this.signup.controls['dni'].value)
    const user: UserSignupI = {
      name: this.signup.controls['name'].value,
      surname: this.signup.controls['surname'].value,
      email: this.signup.controls['email'].value,
      password: this.signup.controls['password'].value,
      dni: this.signup.controls['dni'].value,
      phone: this.signup.controls['phone'].value,
    }
    
    this.subscription$ = this.authService.signup(user).subscribe(() => {
      this.router.navigateByUrl('/auth/login');
    });
  }

  ngOnDestroy(): void {
    if(this.subscription$){
      this.subscription$.unsubscribe()
    }
  }
}
