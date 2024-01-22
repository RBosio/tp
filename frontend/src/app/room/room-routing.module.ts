import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './components/room/room.component';
import { AddRoomComponent } from './components/add-room/add-room.component';
import { EditRoomComponent } from './components/edit-room/edit-room.component';
import { InfoComponent } from './components/info/info.component';

const routes: Routes = [
  {
    path: '', component: RoomComponent
  },
  {
    path: 'add', component: AddRoomComponent
  },
  {
    path: 'edit/:id', component: EditRoomComponent
  },
  {
    path: 'info/:id', component: InfoComponent
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule { }
