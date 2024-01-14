import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { TypeService } from '../../services/type.service';
import { TypeIResponse } from 'src/app/models/type.model';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'operations'];
  dataSource: MatTableDataSource<TypeIResponse, MatTableDataSourcePaginator>;

  subscription1$: Subscription
  subscription2$: Subscription

  constructor(
    private typeService: TypeService,
    private sharedService: SharedService
    ) {

  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.subscription1$ = this.typeService.getAll().subscribe(res => {
      this.dataSource = new MatTableDataSource<TypeIResponse>(res);

      this.paginator._intl.itemsPerPageLabel = 'Items por página';
      this.paginator._intl.firstPageLabel = 'Primera página';
      this.paginator._intl.lastPageLabel = 'Ultima página';
      this.paginator._intl.nextPageLabel = 'Siguiente página';
      this.paginator._intl.previousPageLabel = 'Anterior página';
      this.dataSource.paginator = this.paginator;
    })
  }
  
  delete(id: number) {
    this.sharedService.openDialog('Eliminar tipo de habitación').afterClosed().subscribe(res => {
      if(res) {
        this.subscription2$ = this.typeService.delete(id).subscribe(() => {
          const indice = this.dataSource.data.indexOf(this.dataSource.data.find(data => data.id == id))
          this.dataSource.data.splice(indice, 1)
          this.sharedService.openSnackBar('Tipo de habitación eliminado con éxito!', 'Cerrar')
          this.dataSource._updateChangeSubscription()
        }, () => {
          this.sharedService.openSnackBar('No fue posible eliminar el tipo de habitación!', 'Cerrar')
        })
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription1$.unsubscribe()
    if(this.subscription2$){
      this.subscription2$.unsubscribe()
    }
  }
}