import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserSignupI } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CountryIResponse } from 'src/app/models/country.model';
import { ProvinceIResponse } from 'src/app/models/province.model';
import { CityIResponse } from 'src/app/models/city.model';
import { CountryService } from 'src/app/country/services/country.service';
import { ProvinceService } from 'src/app/province/services/province.service';
import { CityService } from 'src/app/city/services/city.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  signup: FormGroup;
  countries: CountryIResponse[]
  provinces: ProvinceIResponse[]
  cities: CityIResponse[]

  subscription$: Subscription

  ngOnInit(): void {
      this.signup = this.initForm();

      this.countryService.getAll().subscribe(res => {
        this.countries = res
      })
  }

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
    private router: Router,
    private countryService: CountryService,
    private provinceService: ProvinceService,
    private cityService: CityService
    ) {}

  initForm(): FormGroup {
    return this.fb.group({
      dni: ['', Validators.required],
      phone: [''],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      countryId: ['', Validators.required],
      provinceId: ['', Validators.required],
      cityZipCode: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if(this.signup.valid){
      const user: UserSignupI = {
        name: this.signup.controls['name'].value,
        surname: this.signup.controls['surname'].value,
        email: this.signup.controls['email'].value,
        password: this.signup.controls['password'].value,
        dni: this.signup.controls['dni'].value,
        phone: this.signup.controls['phone'].value,
        cityZipCode: this.signup.controls['cityZipCode'].value
      }

      this.subscription$ = this.authService.signup(user).subscribe(() => {
        this.router.navigateByUrl('/auth/login')
      })
    }
  }

  async onChangeCountry() {
    await this.provinceService.getAllByCountry(this.signup.get('countryId').value).subscribe(res => {
      this.provinces = res
    })
  }

  async onChangeProvince() {
    await this.cityService.getAllByProvince(this.signup.get('provinceId').value).subscribe(res => {
      this.cities = res
    })
  }

  ngOnDestroy(): void {
    if(this.subscription$){
      this.subscription$.unsubscribe()
    }
  }
}
