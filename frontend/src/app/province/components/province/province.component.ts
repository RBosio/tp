import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { ProvinceService } from '../../services/province.service';
import { ProvinceIResponse } from 'src/app/models/province.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styleUrls: ['./province.component.scss']
})
export class ProvinceComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'country', 'operations'];
  dataSource: MatTableDataSource<ProvinceIResponse, MatTableDataSourcePaginator>;

  subscription1$: Subscription
  subscription2$: Subscription

  constructor(
    private provinceService: ProvinceService,
  ) {

  }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.subscription1$ = this.provinceService.getAll().subscribe(res => {
      this.dataSource = new MatTableDataSource<ProvinceIResponse>(res);

      this.paginator._intl.itemsPerPageLabel = 'Items por página';
      this.paginator._intl.firstPageLabel = 'Primera página';
      this.paginator._intl.lastPageLabel = 'Ultima página';
      this.paginator._intl.nextPageLabel = 'Siguiente página';
      this.paginator._intl.previousPageLabel = 'Anterior página';
      this.dataSource.paginator = this.paginator;
    })
  }
  
  delete(id: number) {
        this.subscription2$ = this.provinceService.delete(id).subscribe(() => {
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