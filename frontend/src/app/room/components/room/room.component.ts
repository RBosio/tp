import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { RoomService } from '../../services/room.service';
import { RoomIResponse } from 'src/app/models/room.model';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['id', 'price', 'tv', 'ac', 'towel', 'type', 'operations'];
  dataSource: MatTableDataSource<RoomIResponse, MatTableDataSourcePaginator>;

  subscription1$: Subscription
  subscription2$: Subscription

  constructor(
    private roomService: RoomService,
    private sharedService: SharedService
    ) {

  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.subscription1$ = this.roomService.getAll().subscribe(res => {
      this.dataSource = new MatTableDataSource<RoomIResponse>(res);

      this.paginator._intl.itemsPerPageLabel = 'Items por página';
      this.paginator._intl.firstPageLabel = 'Primera página';
      this.paginator._intl.lastPageLabel = 'Ultima página';
      this.paginator._intl.nextPageLabel = 'Siguiente página';
      this.paginator._intl.previousPageLabel = 'Anterior página';
      this.dataSource.paginator = this.paginator;
    })
  }
  
  delete(id: number) {
        this.subscription2$ = this.roomService.delete(id).subscribe(() => {
          const indice = this.dataSource.data.indexOf(this.dataSource.data.find(data => data.id == id))
          this.dataSource.data.splice(indice, 1)
          this.dataSource._updateChangeSubscription()
          this.sharedService.openSnackBar('Habitación eliminada con éxito!', 'Cerrar')
        }, () => {
          this.sharedService.openSnackBar('No fue posible eliminar la habitación!', 'Cerrar')
        })
  }

  ngOnDestroy(): void {
    this.subscription1$.unsubscribe()
    if(this.subscription2$){
      this.subscription2$.unsubscribe()
    }
  }
}