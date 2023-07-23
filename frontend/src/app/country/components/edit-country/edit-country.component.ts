import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.scss']
})
export class EditCountryComponent {
  edit: FormGroup
  id: number
  name: string

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
    private router: Router,
    private route: ActivatedRoute) {
      this.route.params.subscribe(params => {
        this.id = params['id']

        this.countryService.getOne(this.id).subscribe(res => {
          this.name = res.name
        })
      })
    }

  ngOnInit(): void {
      this.edit = this.initForm()
  }

  initForm(): FormGroup {
    return this.fb.group({
      'name': ['', [Validators.required]]
    })
  }

  onSubmit() {
    const country = {
      'name': this.edit.controls['name'].value
    }
    this.countryService.edit(country, this.id).subscribe(res => {
    this.router.navigateByUrl('/country')
    })
  }
}
