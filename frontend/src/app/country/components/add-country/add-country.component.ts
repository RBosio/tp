import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-country',
  templateUrl: './add-country.component.html',
  styleUrls: ['./add-country.component.scss']
})
export class AddCountryComponent implements OnInit {
  add: FormGroup

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
    private router: Router) {}

  ngOnInit(): void {
      this.add = this.initForm()
  }

  initForm(): FormGroup {
    return this.fb.group({
      'name': ['', [Validators.required]]
    })
  }

  onSubmit() {
    const country = {
      'name': this.add.controls['name'].value
    }
    this.countryService.add(country).subscribe(res => {
    this.router.navigateByUrl('/country')
    })
  }
}
