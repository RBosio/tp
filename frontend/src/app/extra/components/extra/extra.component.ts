import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { ExtraService } from '../../services/extra.service';
import { ExtraIResponse } from 'src/app/models/extra.model';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-extra',
  templateUrl: './extra.component.html',
  styleUrls: ['./extra.component.scss']
})
export class ExtraComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'price', 'operations'];
  dataSource: MatTableDataSource<ExtraIResponse, MatTableDataSourcePaginator>;

  subscription1$: Subscription
  subscription2$: Subscription

  constructor(
    private extraService: ExtraService,
    private sharedService: SharedService
    ) {

  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.subscription1$ = this.extraService.getAll().subscribe(res => {
      this.dataSource = new MatTableDataSource<ExtraIResponse>(res);

      this.paginator._intl.itemsPerPageLabel = 'Items por página';
      this.paginator._intl.firstPageLabel = 'Primera página';
      this.paginator._intl.lastPageLabel = 'Ultima página';
      this.paginator._intl.nextPageLabel = 'Siguiente página';
      this.paginator._intl.previousPageLabel = 'Anterior página';
      this.dataSource.paginator = this.paginator;
    })
  }
  
  delete(id: number) {
    this.subscription2$ = this.extraService.delete(id).subscribe(() => {
      const indice = this.dataSource.data.indexOf(this.dataSource.data.find(data => data.id == id))
      this.dataSource.data.splice(indice, 1)
      this.dataSource._updateChangeSubscription()
      this.sharedService.openSnackBar('Extra eliminado con éxito!', 'Cerrar')
    }, () => {
      this.sharedService.openSnackBar('No fue posible eliminar el extra!', 'Cerrar')
    })
  }

  ngOnDestroy(): void {
    this.subscription1$.unsubscribe()
    if(this.subscription2$){
      this.subscription2$.unsubscribe()
    }
  }
}