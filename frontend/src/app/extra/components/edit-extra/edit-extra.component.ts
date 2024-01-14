import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExtraService } from '../../services/extra.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-edit-extra',
  templateUrl: './edit-extra.component.html',
  styleUrls: ['./edit-extra.component.scss']
})
export class EditExtraComponent {
  edit: FormGroup
  id: number
  name: string
  price: number

  subscription1$: Subscription
  subscription2$: Subscription
  subscription3$: Subscription

  constructor(
    private fb: FormBuilder,
    private extraService: ExtraService,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService
    ) {
      this.subscription1$ = this.route.params.subscribe(params => {
        this.id = params['id']

        this.subscription2$ = this.extraService.getOne(this.id).subscribe(res => {
          this.name = res.name
          this.price = res.price
          this.edit.controls['name'].setValue(this.name)
          this.edit.controls['price'].setValue(this.price)
        })
      })
    }

  ngOnInit(): void {
      this.edit = this.initForm()
  }

  initForm(): FormGroup {
    return this.fb.group({
      'name': ['', [Validators.required]],
      'price': ['', [Validators.required]]
    })
  }

  onSubmit() {
    this.sharedService.openDialog('Editar extra').afterClosed().subscribe(res => {
      if(res) {
        if(this.edit.valid){
          const extra = {
            'name': this.edit.controls['name'].value,
            'price': this.edit.controls['price'].value
          }
          this.subscription3$ = this.extraService.edit(extra, this.id).subscribe(() => {
            this.sharedService.openSnackBar('Extra editado con éxito!', 'Cerrar')
            this.router.navigateByUrl('/extra')
          }, err => {
            this.sharedService.openSnackBar(err, 'Cerrar')
          })
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription1$.unsubscribe()
    this.subscription2$.unsubscribe()
    if(this.subscription3$){
      this.subscription3$.unsubscribe()
    }
  }
}
