import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { RoomComponent } from './components/room/room.component';
import { AddRoomComponent } from './components/add-room/add-room.component';
import { EditRoomComponent } from './components/edit-room/edit-room.component';
import { AngularMaterialModule } from '../angular-material.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { InfoComponent } from './components/info/info.component';


@NgModule({
  declarations: [
    RoomComponent,
    AddRoomComponent,
    EditRoomComponent,
    InfoComponent
  ],
  imports: [
    CommonModule,
    RoomRoutingModule,
    AngularMaterialModule,
    SharedModule,
    FormsModule
  ]
})
export class RoomModule { }
