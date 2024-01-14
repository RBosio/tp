import { Component, OnInit } from '@angular/core';
import { RoomService } from '../../services/room.service';
import { ActivatedRoute } from '@angular/router';
import { RoomIResponse } from 'src/app/models/room.model';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  room: RoomIResponse
  url: string
  file: File
  photoSelected: string | ArrayBuffer
  disable: boolean

  photo: string | ArrayBuffer

  constructor(
    private roomService: RoomService,
    private router: ActivatedRoute,
    private sharedService: SharedService
    ) {}
  
  ngOnInit(): void {
    this.router.params.subscribe(params => {
      const { id } = params

      this.roomService.getOne(id).subscribe(res => {
        this.room = res

        if(this.room.image) {
          this.url = `${environment.BASE_URL}uploads/${this.room.image}`
        }

        this.photo = this.url || 'assets/no-image.png'
        this.disable = true
      })
    })
  }

  onPhotoSelected(e) {
    if(e.target.files && e.target.files[0]) {
      this.file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = () => this.photo = reader.result
      reader.readAsDataURL(this.file)
      this.disable = false
    }
  }

  loadImage() {
    this.roomService.loadImage(this.room.id, this.file).subscribe(() => {
      this.sharedService.openSnackBar('Imagen cargada con éxito!', 'Cerrar')
      this.disable = true
    }, () => {
      this.sharedService.openSnackBar('No fue posible cargar la imagen!', 'Cerrar')
    })
  }
}
