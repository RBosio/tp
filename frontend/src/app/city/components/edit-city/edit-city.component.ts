import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CityService } from '../../services/city.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryIResponse } from 'src/app/models/country.model';
import { CountryService } from 'src/app/country/services/country.service';
import { Subscription } from 'rxjs';
import { ProvinceIResponse } from 'src/app/models/province.model';
import { ProvinceService } from 'src/app/province/services/province.service';

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.scss']
})
export class EditCityComponent {
  edit: FormGroup
  zipCode: string
  name: string
  countries: CountryIResponse[]
  provinces: ProvinceIResponse[]

  subscription1$: Subscription
  subscription2$: Subscription
  subscription3$: Subscription
  subscription4$: Subscription
  subscription5$: Subscription

  constructor(
    private fb: FormBuilder,
    private cityService: CityService,
    private router: Router,
    private route: ActivatedRoute,
    private countryService: CountryService,
    private provinceService: ProvinceService,
    ) {
      this.subscription1$ = this.route.params.subscribe(params => {
        this.zipCode = params['zipCode']

        this.subscription2$ = this.cityService.getOne(this.zipCode).subscribe(res => {
          this.name = res.name
        })
        
        this.subscription3$ = this.countryService.getAll().subscribe(res => {
          this.countries = res
        })
      })
    }

  ngOnInit(): void {
      this.edit = this.initForm()
  }

  initForm(): FormGroup {
    return this.fb.group({
      'name': ['', [Validators.required]],
      'countryId': ['', [Validators.required]],
      'provinceId': ['', [Validators.required]]
    })
  }

  onSubmit() {
    if(this.edit.valid){
      const city = {
        'zipCode': this.zipCode,
        'name': this.edit.controls['name'].value,
        'provinceId': this.edit.controls['provinceId'].value
      }
      this.subscription4$ = this.cityService.edit(city, this.zipCode).subscribe(() => {
        this.router.navigateByUrl('/city')
      })
    }
  }

  onChange() {
    this.subscription5$ = this.provinceService.getAll().subscribe(res => {
      this.provinces = res.filter(province => province.country.id == this.edit.controls['countryId'].value)
    })
  }

  ngOnDestroy(): void {
    this.subscription1$.unsubscribe()
    this.subscription2$.unsubscribe()
    this.subscription3$.unsubscribe()
    if(this.subscription4$){
      this.subscription4$.unsubscribe()
      this.subscription5$.unsubscribe()
    }
  }
}
