import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [SharedModule, HttpClientModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deberia ser un formulario invalido', () => {
    const email = component.login.controls['email'];

    email.setValue('hola@gmail.com');

    expect(component.login.invalid).toBeTruthy();
  });

  it('deberia ser un formulario valido', () => {
    const email = component.login.controls['email'];
    const password = component.login.controls['password'];

    email.setValue('hola@gmail.com');
    password.setValue('123456');

    expect(component.login.valid).toBeTruthy();
  });

  it('probando validez de password', () => {
    const password = component.login.controls['password'];

    password.setValue('test123');

    expect(password.valid).toBeTruthy();
  });

  interface Response {
    token: string;
  }  
});
