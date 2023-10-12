import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { TypeService } from '../../services/type.service';
import { TypeIResponse } from 'src/app/models/type.model';
import { Subscription } from 'rxjs';

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
    this.subscription2$ = this.typeService.delete(id).subscribe(() => {
      const indice = this.dataSource.data.indexOf(this.dataSource.data.find(data => data.id == id))
      this.dataSource.data.splice(indice, 1)
      this.dataSource._updateChangeSubscription()
    })
  }

  ngOnDestroy(): void {
    this.subscription1$.unsubscribe()
    if(this.subscription2$){
      this.subscription2$.unsubscribe()
    }
  }
}