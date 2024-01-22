import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.scss']
})
export class EditCountryComponent {
  edit: FormGroup
  id: number
  name: string

  subscription1$: Subscription
  subscription2$: Subscription
  subscription3$: Subscription

  constructor(
    private fb: FormBuilder,
    private countryService: CountryService,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService
    ) {
      this.subscription1$ = this.route.params.subscribe(params => {
        this.id = params['id']

        this.subscription2$ = this.countryService.getOne(this.id).subscribe(res => {
          this.name = res.name
          this.edit.controls['name'].setValue(this.name)
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
    if(this.edit.valid){
      this.sharedService.openDialog('Editar país').afterClosed().subscribe(res => {
        if(res) {
          const country = {
            'name': this.edit.controls['name'].value
          }
          this.subscription3$ = this.countryService.edit(country, this.id).subscribe(() => {
            this.sharedService.openSnackBar('País editado con éxito!', 'Cerrar')
            this.router.navigateByUrl('/country')
          }, err => {
            this.sharedService.openSnackBar(err, 'Cerrar')
          })
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.subscription1$.unsubscribe()
    this.subscription2$.unsubscribe()
    if(this.subscription3$){
      this.subscription3$.unsubscribe()
    }
  }
}
