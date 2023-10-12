import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExtraService } from '../../services/extra.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-extra',
  templateUrl: './add-extra.component.html',
  styleUrls: ['./add-extra.component.scss']
})
export class AddExtraComponent implements OnInit, OnDestroy {
  add: FormGroup

  subscription1$: Subscription

  constructor(
    private fb: FormBuilder,
    private extraService: ExtraService,
    private router: Router) {}

  ngOnInit(): void {
      this.add = this.initForm()
  }

  initForm(): FormGroup {
    return this.fb.group({
      'name': ['', [Validators.required]],
      'price': ['', [Validators.required]]
    })
  }

  onSubmit() {
    if(this.add.valid){
      const extra = {
        'name': this.add.controls['name'].value,
        'price': this.add.controls['price'].value
      }
      this.subscription1$ = this.extraService.add(extra).subscribe(() => {
      this.router.navigateByUrl('/extra')
      })
    }
  }

  ngOnDestroy(): void {
    if(this.subscription1$){
      this.subscription1$.unsubscribe()
    }
  }
}
