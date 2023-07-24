import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CityService } from '../../services/city.service';
import { ProvinceService } from 'src/app/province/services/province.service';
import { ProvinceIResponse } from 'src/app/models/province.model';
import { Subscription } from 'rxjs';
import { CountryIResponse } from 'src/app/models/country.model';
import { CountryService } from 'src/app/country/services/country.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss']
})
export class AddCityComponent implements OnInit, OnDestroy {
  add: FormGroup
  countries: CountryIResponse[]
  provinces: ProvinceIResponse[]

  subscription1$: Subscription
  subscription2$: Subscription
  subscription3$: Subscription

  constructor(
    private fb: FormBuilder,
    private cityService: CityService,
    private router: Router,
    private countryService: CountryService,
    private provinceService: ProvinceService
    ) {}

  ngOnInit(): void {
      this.add = this.initForm()
      this.subscription1$ = this.countryService.getAll().subscribe(res => {
        this.countries = res
      })
  }

  initForm(): FormGroup {
    return this.fb.group({
      'zipCode': ['', [Validators.required]],
      'name': ['', [Validators.required]],
      'countryId': ['', [Validators.required]],
      'provinceId': ['', [Validators.required]]
    })
  }

  onSubmit() {
    if(this.add.valid){
      const city = {
        'zipCode': this.add.controls['zipCode'].value,
        'name': this.add.controls['name'].value,
        'provinceId': this.add.controls['provinceId'].value
      }
      this.subscription2$ = this.cityService.add(city).subscribe(() => {
      this.router.navigateByUrl('/city')
      })
    }
  }
  
  onChange() {
    this.subscription3$ = this.provinceService.getAll().subscribe(res => {
      this.provinces = res.filter(province => province.country.id == this.add.controls['countryId'].value)
    })
  }

  ngOnDestroy(): void {
    this.subscription1$.unsubscribe()
    if(this.subscription2$){
      this.subscription2$.unsubscribe()
      this.subscription3$.unsubscribe()
    }
  }

}
