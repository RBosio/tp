import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProvinceService } from '../../services/province.service';
import { CountryService } from 'src/app/country/services/country.service';
import { CountryIResponse } from 'src/app/models/country.model';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-add-province',
  templateUrl: './add-province.component.html',
  styleUrls: ['./add-province.component.scss']
})
export class AddProvinceComponent implements OnInit, OnDestroy {
  add: FormGroup
  countries: CountryIResponse[]

  subscription1$: Subscription
  subscription2$: Subscription

  constructor(
    private fb: FormBuilder,
    private provinceService: ProvinceService,
    private router: Router,
    private countryService: CountryService,
    private sharedService: SharedService
    ) {}

  ngOnInit(): void {
      this.add = this.initForm()
      this.subscription1$ = this.countryService.getAll().subscribe(res => {
        this.countries = res
      })
  }

  initForm(): FormGroup {
    return this.fb.group({
      'name': ['', [Validators.required]],
      'countryId': ['', [Validators.required]]
    })
  }

  onSubmit() {
    if(this.add.valid){
      this.sharedService.openDialog('Agregar provincia').afterClosed().subscribe(res => {
        if(res) {
          const province = {
            'name': this.add.controls['name'].value,
            'countryId': this.add.controls['countryId'].value
          }
          this.subscription2$ = this.provinceService.add(province).subscribe(() => {
            this.sharedService.openSnackBar('Provincia agregada con éxito!', 'Cerrar')
            this.router.navigateByUrl('/province')
          }, err => {
            this.sharedService.openSnackBar(err, 'Cerrar')
          })
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.subscription1$.unsubscribe()
    if(this.subscription2$){
      this.subscription2$.unsubscribe()
    }
  }

}
