import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeService } from '../../services/type.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.scss']
})
export class AddTypeComponent implements OnInit, OnDestroy {
  add: FormGroup

  subscription1$: Subscription

  constructor(
    private fb: FormBuilder,
    private typeService: TypeService,
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
    if(this.add.valid){
      const type = {
        'name': this.add.controls['name'].value
      }
      this.subscription1$ = this.typeService.add(type).subscribe(() => {
      this.router.navigateByUrl('/type')
      })
    }
  }

  ngOnDestroy(): void {
    if(this.subscription1$){
      this.subscription1$.unsubscribe()
    }
  }
}
