import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeService } from '../../services/type.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-type',
  templateUrl: './edit-type.component.html',
  styleUrls: ['./edit-type.component.scss']
})
export class EditTypeComponent {
  edit: FormGroup
  id: number
  name: string

  subscription1$: Subscription
  subscription2$: Subscription
  subscription3$: Subscription

  constructor(
    private fb: FormBuilder,
    private typeService: TypeService,
    private router: Router,
    private route: ActivatedRoute) {
      this.subscription1$ = this.route.params.subscribe(params => {
        this.id = params['id']

        this.subscription2$ = this.typeService.getOne(this.id).subscribe(res => {
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
    if(this.edit.valid){
      const type = {
        'name': this.edit.controls['name'].value
      }
      this.subscription3$ = this.typeService.edit(type, this.id).subscribe(() => {
      this.router.navigateByUrl('/type')
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
