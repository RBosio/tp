import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomService } from '../../services/room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { TypeIResponse } from 'src/app/models/type.model';
import { TypeService } from 'src/app/type/services/type.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss']
})
export class AddRoomComponent {
  add: FormGroup
  id: number
  room = {
    price: 0,
    ac: true,
    tv: true,
    shower: true,
    towel: true
  }
  types: TypeIResponse[]

  subscription1$: Subscription
  subscription2$: Subscription
  subscription3$: Subscription
  subscription4$: Subscription

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private router: Router,
    private route: ActivatedRoute,
    private typeService: TypeService,
    private sharedService: SharedService
    ) {
      this.subscription1$ = this.route.params.subscribe(params => {
        this.id = params['id']

        this.subscription2$ = this.roomService.getOne(this.id).subscribe(res => {
          this.room = res
          this.add.controls['price'].setValue(this.room.price)
        })
        
        this.subscription3$ = this.typeService.getAll().subscribe(res => {
          this.types = res
        })
      })
    }

  ngOnInit(): void {
      this.add = this.initForm()
  }

  initForm(): FormGroup {
    return this.fb.group({
      'price': ['', [Validators.required]],
      'typeId': ['', [Validators.required]],
      'ac': [''],
      'tv': [''],
      'towel': [''],
      'shower': [''],
    })
  }

  onSubmit() {
    this.sharedService.openDialog('Agregar habitación').afterClosed().subscribe(res => {
      if(res) {
        if(this.add.valid){
          const room = {
            'price': this.add.controls['price'].value,
            'typeId': this.add.controls['typeId'].value,
            'ac': this.add.controls['ac'].value,
            'tv': this.add.controls['tv'].value,
            'towel': this.add.controls['towel'].value,
            'shower': this.add.controls['shower'].value
          }
          this.subscription4$ = this.roomService.add(room).subscribe(() => {
            this.sharedService.openSnackBar('Habitación agregada con éxito!', 'Cerrar')
            this.router.navigateByUrl('/room')
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
    this.subscription3$.unsubscribe()
    if(this.subscription4$){
      this.subscription4$.unsubscribe()
    }
  }
}
