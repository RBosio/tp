import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(AuthService);
  });

  it('debe de crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('probando login', (done) => {
    const email = 'user@gmail.com';
    const password = '123456';

    service.login({ email, password }).subscribe((res) => {
      expect(res.token).toBeDefined();

      done();
    });
  });
});
